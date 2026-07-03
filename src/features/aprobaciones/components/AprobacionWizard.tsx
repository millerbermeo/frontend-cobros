import { useState } from 'react'
import { isAxiosError } from 'axios'
import { Button } from '@heroui/react'
import { alert } from '@/shared/utils/alert'
import { ApprovalStepper } from './ApprovalStepper'
import { StepDocumentos } from './steps/StepDocumentos'
import { StepTasaPlazo } from './steps/StepTasaPlazo'
import { StepAprobar } from './steps/StepAprobar'
import { useUpdateCredit } from '../hooks/useAprobaciones'
import type { CreditApplication } from '../types/aprobaciones.types'
import type { TasaPlazoValues } from '../schemas/aprobacion.schema'

interface AprobacionWizardProps {
  solicitud: CreditApplication
  onDone: () => void
}

function apiError(err: unknown, fallback: string): string {
  const data = isAxiosError(err) ? (err.response?.data as { error?: string; message?: string }) : undefined
  return data?.error || data?.message || fallback
}

export function AprobacionWizard({ solicitud, onDone }: AprobacionWizardProps) {
  const [step, setStep] = useState(0)
  const [terms, setTerms] = useState({ rate: solicitud.rate, term: solicitud.term })
  const updateCredit = useUpdateCredit()

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

  const handleTasaPlazo = async (values: TasaPlazoValues) => {
    const rate = Number(values.rate)
    const term = Number(values.term)
    const ok = await runUpdate(rate, term, 'Validación', 'Guardando tasa y plazo...', 'Tasa y plazo actualizados')
    if (!ok) return
    setTerms({ rate: values.rate, term })
    setStep(2)
  }

  const handleApprove = async () => {
    const ok = await runUpdate(Number(terms.rate), Number(terms.term), 'Aprobado', 'Aprobando crédito...', 'Crédito aprobado')
    if (ok) onDone()
  }

  return (
    <div className="flex flex-col gap-6">
      <ApprovalStepper completados={step} />

      {step === 0 && (
        <>
          <StepDocumentos solicitud={solicitud} />
          <div className="flex justify-end pt-2 border-t border-border">
            <Button variant="primary" onPress={() => setStep(1)}>
              Documentos validados, continuar
            </Button>
          </div>
        </>
      )}

      {step === 1 && (
        <StepTasaPlazo
          solicitud={solicitud}
          onSubmit={handleTasaPlazo}
          onBack={() => setStep(0)}
          isSubmitting={updateCredit.isPending}
        />
      )}

      {step === 2 && (
        <StepAprobar
          onApprove={handleApprove}
          onBack={() => setStep(1)}
          isSubmitting={updateCredit.isPending}
        />
      )}
    </div>
  )
}
