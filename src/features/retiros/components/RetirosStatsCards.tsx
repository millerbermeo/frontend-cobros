import { MdTrendingDown, MdAccountBalanceWallet, MdReceiptLong } from 'react-icons/md'
import type { IconType } from 'react-icons'
import type { WithdrawalsTotals } from '../types/retiros.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

/** "2026-07" -> "Julio 2026" */
function formatMonth(month: string): string {
  if (!month) return ''
  const [y, m] = month.split('-')
  const date = new Date(Number(y), Number(m) - 1, 1)
  const label = date.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })
  return label.charAt(0).toUpperCase() + label.slice(1)
}

interface Card {
  label: string
  value: string
  icon: IconType
  gradient: string
}

interface RetirosStatsCardsProps {
  totals: WithdrawalsTotals
  month: string
}

export function RetirosStatsCards({ totals, month }: RetirosStatsCardsProps) {
  const cards: Card[] = [
    { label: 'Total Retiros del Mes', value: currency.format(Number(totals.total_amount)), icon: MdTrendingDown, gradient: 'from-rose-600 to-red-500' },
    { label: 'Disponible', value: currency.format(Number(totals.available_amount)), icon: MdAccountBalanceWallet, gradient: 'from-emerald-600 to-teal-500' },
    { label: 'Registrado', value: currency.format(Number(totals.recorded_amount)), icon: MdReceiptLong, gradient: 'from-indigo-600 to-violet-500' },
  ]

  return (
    <div className="flex flex-col gap-3">
      {month && (
        <span className="self-start text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
          {formatMonth(month)}
        </span>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(({ label, value, icon: Icon, gradient }) => (
          <div
            key={label}
            className={`rounded-2xl bg-gradient-to-r ${gradient} shadow-sm p-5 flex items-center justify-between text-white`}
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/80">{label}</p>
              <p className="text-2xl font-bold mt-1 truncate">{value}</p>
            </div>
            <Icon className="h-8 w-8 shrink-0 text-white/90" />
          </div>
        ))}
      </div>
    </div>
  )
}
