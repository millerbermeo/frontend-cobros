import type { IconType } from 'react-icons'
import { MdGroup, MdAttachMoney, MdTrendingDown, MdDescription } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export interface MoraStatsData {
  clientes: number
  deudaTotal: number
  interesesColgados: number
  capitalRiesgo: number
}

interface StatCard {
  label: string
  icon: IconType
  iconClass: string
  value: string
}

function StatItem({ label, icon: Icon, iconClass, value }: StatCard) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card shadow-sm p-4">
      <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl shrink-0', iconClass)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-foreground/50">{label}</p>
        <p className="text-lg font-bold text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  )
}

export function MoraStats({ data }: { data: MoraStatsData }) {
  const cards: StatCard[] = [
    { label: 'Clientes',          icon: MdGroup,        iconClass: 'bg-rose-500/10 text-rose-500',     value: String(data.clientes) },
    { label: 'Deuda Total',       icon: MdAttachMoney,  iconClass: 'bg-orange-500/10 text-orange-500', value: currency.format(data.deudaTotal) },
    { label: 'Intereses Colgados', icon: MdTrendingDown, iconClass: 'bg-amber-500/10 text-amber-500',  value: currency.format(data.interesesColgados) },
    { label: 'Capital en Riesgo', icon: MdDescription,  iconClass: 'bg-sky-500/10 text-sky-500',       value: currency.format(data.capitalRiesgo) },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => <StatItem key={c.label} {...c} />)}
    </div>
  )
}
