import { MdTrendingDown } from 'react-icons/md'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface TotalRetirosCardProps {
  total: number
}

export function TotalRetirosCard({ total }: TotalRetirosCardProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-rose-600 to-red-500 shadow-sm p-6 flex items-center justify-between text-white">
      <div>
        <p className="text-sm font-medium text-white/80">Total Retiros del Mes</p>
        <p className="text-3xl font-bold mt-1">{currency.format(total)}</p>
      </div>
      <MdTrendingDown className="h-8 w-8 text-white/90" />
    </div>
  )
}
