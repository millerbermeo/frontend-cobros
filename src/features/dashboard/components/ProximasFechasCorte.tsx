import { MdCalendarToday, MdCheckCircle, MdWarning, MdSchedule } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'

type EstadoCorte = 'al_dia' | 'mora' | 'proximo'

interface FechaCorte {
  id: number
  clienteId: number
  nombre: string
  saldo: string
  fecha: string
  estado: EstadoCorte
}

const DATA: FechaCorte[] = [
  { id: 1, clienteId: 3, nombre: 'María García',    saldo: '$9.500.000',  fecha: '2026-04-24', estado: 'al_dia'  },
  { id: 2, clienteId: 1, nombre: 'Carlos López',    saldo: '$4.200.000',  fecha: '2026-04-15', estado: 'al_dia'  },
  { id: 3, clienteId: 2, nombre: 'Ana Martínez',    saldo: '$7.000.000',  fecha: '2026-04-20', estado: 'proximo' },
  { id: 4, clienteId: 4, nombre: 'Juan Rodríguez',  saldo: '$13.500.000', fecha: '2026-04-25', estado: 'mora'    },
]

const ESTADO_CONFIG: Record<EstadoCorte, { label: string; icon: typeof MdCheckCircle; className: string }> = {
  al_dia:  { label: 'Al día',  icon: MdCheckCircle, className: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
  proximo: { label: 'Próximo', icon: MdSchedule,    className: 'text-amber-600  bg-amber-50  dark:bg-amber-500/10'    },
  mora:    { label: 'En mora', icon: MdWarning,     className: 'text-red-500    bg-red-50    dark:bg-red-500/10'      },
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function ProximasFechasCorte() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
          <MdCalendarToday className="w-4 h-4 text-indigo-500" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Próximas Fechas de Corte</h2>
          <p className="text-xs text-foreground/40">{DATA.length} contratos activos</p>
        </div>
      </div>

      {/* Rows */}
      <ul className="divide-y divide-border">
        {DATA.map((item) => {
          const estado = ESTADO_CONFIG[item.estado]
          const EstadoIcon = estado.icon
          return (
            <li
              key={item.id}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-foreground/[0.02] transition-colors"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-primary">{getInitials(item.nombre)}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.nombre}</p>
                <p className="text-xs text-foreground/40">{item.saldo}</p>
              </div>

              {/* Date + badge */}
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs text-foreground/50">{formatDate(item.fecha)}</span>
                <span className={cn('flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full', estado.className)}>
                  <EstadoIcon className="w-3 h-3" />
                  {estado.label}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
