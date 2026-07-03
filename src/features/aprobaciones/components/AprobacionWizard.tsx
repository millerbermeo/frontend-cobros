import { useState } from 'react'
import { isAxiosError } from 'axios'
import { Button } from '@heroui/react'
import { MdCancel } from 'react-icons/md'
import { alert } from '@/shared/utils/alert'
import { ApprovalStepper } from './ApprovalStepper'
import { StepDocumentos } from './steps/StepDocumentos'
import { StepTasaPlazo } from './steps/StepTasaPlazo'
import { StepAprobar } from './steps/StepAprobar'
import { useUpdateCredit, useUploadDocuments, useApproveCredit } from '../hooks/useAprobaciones'
import { TOTAL_STEPS } from '../constants'
import type { CreditApplication } from '../types/aprobaciones.types'
import type { TasaPlazoValues, DocsAprobacionValues } from '../schemas/aprobacion.schema'

interface AprobacionWizardProps {
  solicitud: CreditApplication
  onDone: () => void
}

function apiError(err: unknown, fallback: string): string {
  const data = isAxiosError(err) ? (err.response?.data as { error?: string; message?: string }) : undefined
  return data?.error || data?.message || fallback
}

/** Estado actual → paso inicial del wizard. */
function stateToStep(state: string): number {
  if (state === 'Validación') return 1
  if (state === 'Aprobado') return 2
  return 0
}

export function AprobacionWizard({ solicitud, onDone }: AprobacionWizardProps) {
  const [step, setStep] = useState(() => stateToStep(solicitud.state))
  const [terms, setTerms] = useState({ rate: solicitud.rate, term: solicitud.term })
  const [docsUploaded, setDocsUploaded] = useState(
    () => !!(solicitud.archive_1 || solicitud.archive_2 || solicitud.archive_3),
  )
  const updateCredit = useUpdateCredit()
  const uploadDocuments = useUploadDocuments()
  const approveCredit = useApproveCredit()

  const runUpdate = async (rate: number, term: number, state: string, loading: string, ok: string) => {
    alert.loading(loading)
    try {
      const res = await updateCredit.mutateAsync({ id: solicitud.id, rate, term, state })
      alert.closeLoading()
      alert.toast(res.data.message || ok)
      return true
    } catch (err) {
      alert.closeLoading()
      alert.error('Error', apiError(err, 'No se pudo actualizar la solicitud'))
      return false
    }
  }

  const handleValidarDocs = async () => {
    const ok = await runUpdate(
      Number(terms.rate), Number(terms.term), 'Validación',
      'Validando documentos...', 'Documentos validados',
    )
    if (ok) setStep(1)
  }

  const handleReject = async () => {
    const ok = await runUpdate(
      Number(terms.rate), Number(terms.term), 'Rechazado',
      'Rechazando solicitud...', 'Solicitud rechazada',
    )
    if (ok) onDone()
  }

  const handleTasaPlazo = async (values: TasaPlazoValues) => {
    const rate = Number(values.rate)
    const term = Number(values.term)
    const ok = await runUpdate(rate, term, 'Validación', 'Guardando tasa y plazo...', 'Tasa y plazo actualizados')
    if (!ok) return
    setTerms({ rate: values.rate, term })
    setStep(2)
  }

  const handleUpload = async (values: DocsAprobacionValues) => {
    alert.loading('Subiendo documentos...')
    try {
      const res = await uploadDocuments.mutateAsync({ id: solicitud.id, values })
      alert.closeLoading()
      alert.toast(res.data.message || 'Documentos subidos')
      setDocsUploaded(true)
    } catch (err) {
      alert.closeLoading()
      alert.error('Error', apiError(err, 'No se pudieron subir los documentos'))
    }
  }

  const handleApprove = async () => {
    alert.loading('Aprobando crédito...')
    try {
      const res = await approveCredit.mutateAsync(solicitud.id)
      alert.closeLoading()
      alert.toast(res.data.message || 'Crédito aprobado')
      onDone()
    } catch (err) {
      alert.closeLoading()
      alert.error('Error', apiError(err, 'No se pudo aprobar el crédito'))
    }
  }

  const busy = updateCredit.isPending || uploadDocuments.isPending || approveCredit.isPending
  const finalizado = solicitud.state === 'Aprobado' || solicitud.state === 'Rechazado'
  // Aprobado/Rechazado: solo lectura, no se puede modificar nada.
  const readOnly = finalizado
  const showReject = step < TOTAL_STEPS - 1 && !finalizado
  // Paso 1 siempre; pasos 2 y 3 solo si ya está validado o ya se alcanzaron.
  const validado = solicitud.state === 'Validación' || solicitud.state === 'Aprobado'
  const isStepEnabled = (i: number) => i === 0 || i <= step || validado

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <ApprovalStepper completados={step} onSelect={setStep} isStepEnabled={isStepEnabled} />
        </div>
        {showReject && (
          <Button variant="danger" size="sm" className="gap-1.5 shrink-0" onPress={handleReject} isDisabled={busy}>
            <MdCancel className="h-4 w-4" />
            Rechazar
          </Button>
        )}
      </div>

      {step === 0 && (
        <>
          <StepDocumentos solicitud={solicitud} />
          {!readOnly && (
            <div className="flex justify-end pt-2 border-t border-border">
              <Button variant="primary" onPress={handleValidarDocs} isPending={updateCredit.isPending}>
                Documentos validados, continuar
              </Button>
            </div>
          )}
        </>
      )}

      {step === 1 && (
        <StepTasaPlazo
          solicitud={solicitud}
          onSubmit={handleTasaPlazo}
          onBack={() => setStep(0)}
          isSubmitting={updateCredit.isPending}
          readOnly={readOnly}
        />
      )}

      {step === 2 && (
        <StepAprobar
          solicitud={solicitud}
          onUpload={handleUpload}
          onApprove={handleApprove}
          onBack={() => setStep(1)}
          docsUploaded={docsUploaded}
          isUploading={uploadDocuments.isPending}
          isApproving={approveCredit.isPending}
          readOnly={readOnly}
        />
      )}
    </div>
  )
}
