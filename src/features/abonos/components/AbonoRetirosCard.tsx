import { MdWarningAmber } from 'react-icons/md'
import type { RetiroDisponible } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface AbonoRetirosCardProps {
  retiros: RetiroDisponible[]
  total: number
}

export function AbonoRetirosCard({ retiros, total }: AbonoRetirosCardProps) {
  return (
    <div className="rounded-xl border border-rose-200 dark:border-rose-500/30 bg-rose-50 dark:bg-rose-500/10 overflow-hidden">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-rose-700 dark:text-rose-300 px-4 pt-3.5 pb-2">
        <MdWarningAmber className="h-4 w-4" /> Retiros Realizados al Cliente
      </p>
      <div className="flex flex-col gap-2 px-4 pb-3">
        {retiros.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-lg bg-card px-4 py-2.5">
            <div>
              <p className="text-sm font-medium text-foreground">{r.concept}</p>
              <p className="text-xs text-foreground/50">{r.withdrawal_date} - {r.withdrawal_hour}</p>
            </div>
            <span className="font-semibold text-rose-600 dark:text-rose-400">-{currency.format(r.amount)}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-rose-200 dark:border-rose-500/30 bg-rose-100/60 dark:bg-rose-500/15">
        <span className="text-sm font-medium text-rose-700 dark:text-rose-300">Total Retirado:</span>
        <span className="font-bold text-rose-700 dark:text-rose-300">{currency.format(total)}</span>
      </div>
    </div>
  )
}
