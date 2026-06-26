import { MdPieChart } from 'react-icons/md'

interface Slice {
  label: string
  value: number
  color: string
}

const DATA: Slice[] = [
  { label: 'Efectivo', value: 1, color: '#3b82f6' },
  { label: 'Tarjeta', value: 1, color: '#10b981' },
  { label: 'Pignoración', value: 1, color: '#8b5cf6' },
]

const RADIUS = 70
const STROKE = 28
const CIRC = 2 * Math.PI * RADIUS

export function CreditosPorTipoChart() {
  const total = DATA.reduce((s, d) => s + d.value, 0)

  let offset = 0
  const arcs = DATA.map((d) => {
    const fraction = d.value / total
    const dash = fraction * CIRC
    const arc = { ...d, dash, offset }
    offset += dash
    return arc
  })

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-9 h-9 rounded-xl bg-violet-500/10 dark:bg-violet-500/15 flex items-center justify-center">
          <MdPieChart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground leading-tight">Créditos por Tipo</h2>
          <p className="text-xs text-foreground/45">Distribución de la cartera</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
        {/* Donut */}
        <div className="relative w-44 h-44 shrink-0">
          <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
            <circle cx="90" cy="90" r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-border/40" />
            {arcs.map((a) => (
              <circle
                key={a.label}
                cx="90"
                cy="90"
                r={RADIUS}
                fill="none"
                stroke={a.color}
                strokeWidth={STROKE}
                strokeDasharray={`${a.dash} ${CIRC - a.dash}`}
                strokeDashoffset={-a.offset}
                className="transition-all duration-500"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground leading-none">{total}</span>
            <span className="text-[11px] text-foreground/45 mt-1">créditos</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3 w-full sm:w-auto">
          {DATA.map((d) => (
            <div key={d.label} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-2 text-sm text-foreground/70">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                {d.label}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {d.value} · {Math.round((d.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
