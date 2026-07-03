import { Button } from '@heroui/react'
import { MdArrowForward, MdInsertDriveFile } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import { creditFileUrl } from '@/shared/utils/creditFile'
import { formatCOP } from '@/shared/utils/currency'
import { formatFecha } from '@/shared/utils/date'
import type { CreditApplication } from '../types/aprobaciones.types'

function DocLink({ label, raw }: { label: string; raw: string | null | undefined }) {
  const url = creditFileUrl(raw)
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
    >
      <MdInsertDriveFile className="h-3.5 w-3.5" />
      {label}
    </a>
  )
}

const ESTADO_CONFIG: Record<string, string> = {
  Pendiente:  'text-amber-700   bg-amber-100   dark:text-amber-300   dark:bg-amber-500/15',
  Validación: 'text-sky-700     bg-sky-100     dark:text-sky-300     dark:bg-sky-500/15',
  Aprobado:   'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15',
  Rechazado:  'text-rose-700    bg-rose-100    dark:text-rose-300    dark:bg-rose-500/15',
}

interface AprobacionCardProps {
  solicitud: CreditApplication
  onProcess: (solicitud: CreditApplication) => void
}

export function AprobacionCard({ solicitud, onProcess }: AprobacionCardProps) {
  const { name, document, type_credit, requested_amount, term, rate, state } = solicitud
  const { archive_document, archive_payment_stub, archive_other } = solicitud
  const { archive_1, archive_2, archive_3 } = solicitud
  const aprobado = state === 'Aprobado'
  const rechazado = state === 'Rechazado'
  const hasApprovalDocs = !!(archive_1 || archive_2 || archive_3)

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{name}</h3>
          <p className="text-xs text-foreground/40 mt-0.5">Doc: {document} · {type_credit}</p>
          <p className="text-sm text-foreground/50 mt-1">
            Monto: {formatCOP(Number(requested_amount))} · Plazo: {term} meses · Tasa: {rate}%
          </p>
          <p className="text-xs text-foreground/40 mt-1">
            Creación: {formatFecha(solicitud.creation_date)} · Corte: {formatFecha(solicitud.cutoff_date)}
          </p>
        </div>
        <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md', ESTADO_CONFIG[state] ?? 'text-foreground/60 bg-foreground/10')}>
          {state}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3">
        <span className="text-xs text-foreground/40">Documentos:</span>
        <DocLink label="Identidad" raw={archive_document} />
        <DocLink label="Desprendible" raw={archive_payment_stub} />
        <DocLink label="Otros" raw={archive_other} />
      </div>

      {hasApprovalDocs && (
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <span className="text-xs text-foreground/40">Aprobación:</span>
          <DocLink label="Doc 1" raw={archive_1} />
          <DocLink label="Doc 2" raw={archive_2} />
          <DocLink label="Doc 3" raw={archive_3} />
        </div>
      )}

      {!rechazado && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="primary"
            className={cn('gap-1.5', aprobado && 'bg-emerald-600 hover:bg-emerald-700')}
            onPress={() => onProcess(solicitud)}
          >
            {aprobado ? 'Ver solicitud' : 'Procesar solicitud'}
            {!aprobado && <MdArrowForward className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}
