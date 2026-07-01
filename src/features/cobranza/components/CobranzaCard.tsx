import { MdCalendarToday } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import type { CreditoCobranza } from '../types/cobranza.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface CobranzaCardProps {
  credito: CreditoCobranza
}

function EstadoBadge({ credito }: { credito: CreditoCobranza }) {
  if (credito.estado === 'mora') {
    return (
      <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-500/15">
        MORA ({credito.moraDias} días)
      </span>
    )
  }
  return (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-sky-700 bg-sky-100 dark:text-sky-300 dark:bg-sky-500/15">
      Activo
    </span>
  )
}

function Metric({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <p className="text-xs text-foreground/50">{label}</p>
      <p className={cn('text-sm font-semibold text-foreground mt-0.5', className)}>{value}</p>
    </div>
  )
}

export function CobranzaCard({ credito }: CobranzaCardProps) {
  const { cliente, numero, saldoCapital, montoOriginal, intereses, fechaCorte, estado } = credito
  const enMora = estado === 'mora'

  return (
    <div
      className={cn(
        'rounded-2xl border bg-card shadow-sm p-5',
        enMora ? 'border-rose-200 dark:border-rose-500/25' : 'border-border',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{cliente}</h3>
          <p className="text-sm text-foreground/50 mt-0.5">Crédito #{numero}</p>
        </div>
        <EstadoBadge credito={credito} />
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Metric label="Saldo Capital" value={currency.format(saldoCapital)} />
        <Metric label="Monto Original" value={currency.format(montoOriginal)} />
        <Metric label="Intereses" value={currency.format(intereses)} className="text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="text-xs text-foreground/50">Fecha de Corte</p>
          <p className="text-sm font-semibold text-foreground mt-0.5 flex items-center gap-1.5">
            <MdCalendarToday className="h-3.5 w-3.5 text-foreground/40" />
            {fechaCorte}
          </p>
        </div>
      </div>
    </div>
  )
}
