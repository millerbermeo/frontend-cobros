import { Button } from '@heroui/react'
import { MdCancel, MdCheckCircle } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import { ApprovalStepper } from './ApprovalStepper'
import type { Aprobacion, EstadoAprobacion } from '../types/aprobaciones.types'

const ESTADO_CONFIG: Record<EstadoAprobacion, string> = {
  pendiente:  'text-amber-700   bg-amber-100   dark:text-amber-300   dark:bg-amber-500/15',
  validacion: 'text-sky-700     bg-sky-100     dark:text-sky-300     dark:bg-sky-500/15',
  aprobado:   'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15',
  rechazado:  'text-rose-700    bg-rose-100    dark:text-rose-300    dark:bg-rose-500/15',
}

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface AprobacionCardProps {
  aprobacion: Aprobacion
  onApprove: (id: string) => void
  onReject: (id: string) => void
}

export function AprobacionCard({ aprobacion, onApprove, onReject }: AprobacionCardProps) {
  const { id, cliente, monto, plazo, tasa, completados, estado } = aprobacion
  const rechazado = estado === 'rechazado'
  const finalizado = estado === 'aprobado' || rechazado

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{cliente}</h3>
          <p className="text-sm text-foreground/50 mt-0.5">
            Monto: {currency.format(monto)} · Plazo: {plazo} meses · Tasa: {tasa}%
          </p>
        </div>
        <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md capitalize', ESTADO_CONFIG[estado])}>
          {estado}
        </span>
      </div>

      <div className="mt-6">
        <ApprovalStepper completados={completados} rechazado={rechazado} />
      </div>

      {!finalizado && (
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="danger" className="gap-1.5" onPress={() => onReject(id)}>
            <MdCancel className="h-4 w-4" />
            Rechazar
          </Button>
          <Button variant="primary" className="gap-1.5" onPress={() => onApprove(id)}>
            <MdCheckCircle className="h-4 w-4" />
            Aprobar y Continuar
          </Button>
        </div>
      )}
    </div>
  )
}
