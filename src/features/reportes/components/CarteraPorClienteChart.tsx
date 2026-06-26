import { MdBarChart } from 'react-icons/md'

interface BarDatum {
  label: string
  value: number
}

const DATA: BarDatum[] = [
  { label: 'María', value: 5_600_000 },
  { label: 'Carlos', value: 7_000_000 },
  { label: 'Ana', value: 8_400_000 },
  { label: 'Roberto', value: 10_000_000 },
  { label: 'Laura', value: 6_800_000 },
  { label: 'Pedro', value: 5_500_000 },
]

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

export function CarteraPorClienteChart() {
  const max = Math.max(...DATA.map((d) => d.value))

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center">
          <MdBarChart className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground leading-tight">Cartera por Cliente</h2>
          <p className="text-xs text-foreground/45">Saldo vigente por deudor</p>
        </div>
      </div>

      {/* Bars */}
      <div className="flex items-end justify-between gap-3 h-56 px-1">
        {DATA.map((d) => {
          const pct = Math.round((d.value / max) * 100)
          return (
            <div key={d.label} className="group flex-1 flex flex-col items-center justify-end h-full">
              <span className="mb-2 text-[10px] font-semibold text-foreground/55 opacity-0 group-hover:opacity-100 transition-opacity">
                {formatCOP(d.value)}
              </span>
              <div
                className="w-full max-w-[44px] rounded-t-lg bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all duration-300 group-hover:from-emerald-700 group-hover:to-emerald-500"
                style={{ height: `${pct}%` }}
              />
            </div>
          )
        })}
      </div>

      {/* Axis labels */}
      <div className="flex justify-between gap-3 px-1 mt-3 pt-3 border-t border-border">
        {DATA.map((d) => (
          <span key={d.label} className="flex-1 text-center text-xs text-foreground/55">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}
