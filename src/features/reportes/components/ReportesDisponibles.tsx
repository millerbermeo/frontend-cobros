import type { IconType } from 'react-icons'
import { MdDescription, MdWarningAmber, MdTrendingUp, MdReceiptLong, MdChevronRight } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'

interface ReporteItem {
  title: string
  description: string
  icon: IconType
  color: string
  bg: string
}

const REPORTES: ReporteItem[] = [
  {
    title: 'Reporte de Cartera Completo',
    description: 'Detalle de todos los créditos activos',
    icon: MdDescription,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
  },
  {
    title: 'Reporte de Mora',
    description: 'Clientes con pagos pendientes',
    icon: MdWarningAmber,
    color: 'text-rose-600 dark:text-rose-400',
    bg: 'bg-rose-500/10 dark:bg-rose-500/15',
  },
  {
    title: 'Reporte de Intereses',
    description: 'Intereses generados por período',
    icon: MdTrendingUp,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10 dark:bg-violet-500/15',
  },
  {
    title: 'Reporte de Abonos',
    description: 'Historial de pagos recibidos',
    icon: MdReceiptLong,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 dark:bg-blue-500/15',
  },
]

export function ReportesDisponibles() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <h2 className="text-base font-semibold text-foreground mb-4">Reportes Disponibles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {REPORTES.map((r) => (
          <button
            key={r.title}
            type="button"
            className={cn(
              'group flex items-center gap-3 text-left rounded-xl border border-border bg-background/50 p-4',
              'hover:border-foreground/20 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200',
            )}
          >
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', r.bg)}>
              <r.icon className={cn('w-5 h-5', r.color)} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground truncate">{r.title}</p>
              <p className="text-xs text-foreground/45 truncate">{r.description}</p>
            </div>
            <MdChevronRight className="w-5 h-5 text-foreground/25 group-hover:text-foreground/50 group-hover:translate-x-0.5 transition-all" />
          </button>
        ))}
      </div>
    </div>
  )
}
