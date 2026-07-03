import { MdReceiptLong, MdCalendarToday, MdPerson, MdVerifiedUser } from 'react-icons/md'
import type { RetiroDisponible } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface RetirosHistorialTableProps {
  retiros: RetiroDisponible[]
  cantidad: number
  total: number
}

export function RetirosHistorialTable({ retiros, cantidad, total }: RetirosHistorialTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3.5 bg-slate-700 dark:bg-slate-800 text-white">
        <MdReceiptLong className="h-5 w-5" />
        <h3 className="font-semibold">Historial de Retiros</h3>
        <span className="ml-auto text-xs font-medium bg-white/15 px-2.5 py-1 rounded-md">{cantidad} retiros</span>
      </div>

      {retiros.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-foreground/50">Sin retiros registrados</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-foreground/60 border-b border-border">
                <th className="px-5 py-3 font-medium">Fecha</th>
                <th className="px-5 py-3 font-medium">Concepto</th>
                <th className="px-5 py-3 font-medium">Monto</th>
                <th className="px-5 py-3 font-medium">Autorizado Por</th>
                <th className="px-5 py-3 font-medium">Retirado Por</th>
                <th className="px-5 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {retiros.map((r) => (
                <tr key={r.id} className="border-b border-border/60 last:border-0">
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-foreground/80">
                      <MdCalendarToday className="h-3.5 w-3.5 text-foreground/40" /> {r.withdrawal_date}
                    </span>
                    <span className="text-xs text-foreground/40">{r.withdrawal_hour}</span>
                  </td>
                  <td className="px-5 py-3.5 text-foreground">{r.concept}</td>
                  <td className="px-5 py-3.5 font-semibold text-rose-600 dark:text-rose-400">-{currency.format(r.amount)}</td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-foreground/70">
                      <MdVerifiedUser className="h-3.5 w-3.5 text-foreground/40" /> {r.authorized_by}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="flex items-center gap-1.5 text-foreground/70">
                      <MdPerson className="h-3.5 w-3.5 text-foreground/40" /> {r.withdrawn_by}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15">
                      {r.state}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between px-5 py-3.5 border-t border-border bg-slate-50 dark:bg-slate-800/40">
        <span className="text-sm font-medium text-foreground/70">Total Disponible</span>
        <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{currency.format(total)}</span>
      </div>
    </div>
  )
}
