import { MdAssignment, MdAccessTime, MdVerified, MdCheckCircle, MdCancel } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'

type EstadoSolicitud = 'pendiente' | 'validacion' | 'aprobado' | 'rechazado'

interface Solicitud {
  id: number
  clienteId: number
  nombre: string
  monto: string
  fecha: string
  estado: EstadoSolicitud
}

const DATA: Solicitud[] = [
  { id: 1, clienteId: 1, nombre: 'Carlos López',   monto: '$5.000.000',  fecha: '2026-04-10', estado: 'pendiente'  },
  { id: 2, clienteId: 2, nombre: 'Ana Martínez',   monto: '$3.000.000',  fecha: '2026-04-09', estado: 'validacion' },
  { id: 3, clienteId: 3, nombre: 'María García',   monto: '$10.000.000', fecha: '2026-04-08', estado: 'aprobado'   },
  { id: 4, clienteId: 5, nombre: 'Luis Herrera',   monto: '$1.800.000',  fecha: '2026-04-07', estado: 'rechazado'  },
]

const ESTADO_CONFIG: Record<EstadoSolicitud, { label: string; icon: typeof MdCheckCircle; className: string; dot: string }> = {
  pendiente:  { label: 'Pendiente',   icon: MdAccessTime,  className: 'text-amber-600  bg-amber-50  dark:bg-amber-500/10',  dot: 'bg-amber-400'  },
  validacion: { label: 'Validación',  icon: MdVerified,    className: 'text-blue-600   bg-blue-50   dark:bg-blue-500/10',   dot: 'bg-blue-400'   },
  aprobado:   { label: 'Aprobado',    icon: MdCheckCircle, className: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10', dot: 'bg-emerald-400' },
  rechazado:  { label: 'Rechazado',   icon: MdCancel,      className: 'text-red-500    bg-red-50    dark:bg-red-500/10',    dot: 'bg-red-400'    },
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

export function SolicitudesRecientes() {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
          <MdAssignment className="w-4 h-4 text-violet-500" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Solicitudes Recientes</h2>
          <p className="text-xs text-foreground/40">{DATA.length} solicitudes esta semana</p>
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
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-foreground/2 transition-colors"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-violet-500">{getInitials(item.nombre)}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.nombre}</p>
                <p className="text-xs font-semibold text-foreground/60">{item.monto}</p>
              </div>

              {/* Badge */}
              <span className={cn('flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0', estado.className)}>
                <EstadoIcon className="w-3 h-3" />
                {estado.label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
