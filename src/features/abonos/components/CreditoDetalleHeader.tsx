import type { CreditoActivo } from '../types/abonos.types'
import { cn } from '@/shared/utils/cn'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface CreditoDetalleHeaderProps {
  credito: CreditoActivo
}

interface Stat {
  label: string
  value: string
  className?: string
}

export function CreditoDetalleHeader({ credito }: CreditoDetalleHeaderProps) {
  const stats: Stat[] = [
    { label: 'Cliente', value: credito.nombre, className: 'text-foreground font-semibold' },
    { label: 'Documento', value: credito.document, className: 'text-foreground/80' },
    { label: 'Monto Original', value: currency.format(credito.original_amount), className: 'text-foreground font-semibold' },
    { label: 'Saldo Capital', value: currency.format(credito.outstanding_principal), className: 'text-sky-600 dark:text-sky-400 font-semibold' },
    { label: 'Intereses Pendientes', value: currency.format(credito.outstanding_interest), className: 'text-orange-600 dark:text-orange-400 font-semibold' },
    { label: 'Tasa Actual', value: `${credito.rate}% mensual`, className: 'text-emerald-600 dark:text-emerald-400 font-semibold' },
    { label: 'Plazo', value: `${credito.term} meses`, className: 'text-foreground/80' },
    { label: 'Fecha Corte', value: credito.cutoff_date, className: 'text-foreground/80' },
  ]

  return (
    <div className="rounded-xl border border-border bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-500/10 dark:to-emerald-500/10 px-5 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 text-sm">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-foreground/50 text-xs">{s.label}</p>
            <p className={cn('mt-0.5', s.className)}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2">
        <span className="text-foreground/50 text-xs">Estado:</span>
        <span
          className={cn(
            'text-xs font-semibold px-2.5 py-1 rounded-md',
            credito.state === 'Activo'
              ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15'
              : 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-500/15',
          )}
        >
          {credito.state}
        </span>
      </div>
    </div>
  )
}
