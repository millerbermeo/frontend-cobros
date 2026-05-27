import {
  MdAttachMoney,
  MdTrendingUp,
  MdCheckCircle,
  MdWarningAmber,
  MdPeople,
  MdAccountBalance,
} from 'react-icons/md'
import { useCurrentUser } from '@/features/auth/hooks/useAuth'
import { StatsCard } from '../components/StatsCard'
import { ProximasFechasCorte } from '../components/ProximasFechasCorte'
import { SolicitudesRecientes } from '../components/SolicitudesRecientes'
import type { CardVariant } from '../components/StatsCard'
import type { IconType } from 'react-icons'

interface StatConfig {
  label: string
  value: string
  subtitle: string
  icon: IconType
  variant: CardVariant
  trend?: { value: string; positive: boolean }
}

const STATS: StatConfig[] = [
  {
    label: 'Total Cartera Activa',
    value: '$34.200.000',
    subtitle: 'Capital en circulación',
    icon: MdAttachMoney,
    variant: 'emerald',
    trend: { value: '+12.5%', positive: true },
  },
  {
    label: 'Intereses Generados',
    value: '$954.000',
    subtitle: 'Este período',
    icon: MdTrendingUp,
    variant: 'blue',
    trend: { value: '+8.2%', positive: true },
  },
  {
    label: 'Créditos Aprobados',
    value: '1',
    subtitle: '1 pendiente de desembolso',
    icon: MdCheckCircle,
    variant: 'violet',
  },
  {
    label: 'Clientes Activos',
    value: '4',
    subtitle: 'Con contratos vigentes',
    icon: MdPeople,
    variant: 'indigo',
  },
  {
    label: 'Alertas de Mora',
    value: '0',
    subtitle: 'Sin novedades hoy',
    icon: MdWarningAmber,
    variant: 'rose',
  },
  {
    label: 'Cobranza del Mes',
    value: '$8.700.000',
    subtitle: 'Abonos recibidos',
    icon: MdAccountBalance,
    variant: 'amber',
    trend: { value: '+3.1%', positive: true },
  },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 18) return 'Buenas tardes'
  return 'Buenas noches'
}

export function DashboardPage() {
  const user = useCurrentUser()
  const firstName = user?.name?.split(' ')[0] ?? 'usuario'

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            {getGreeting()}, {firstName} 👋
          </h1>
          <p className="text-sm text-foreground/50 mt-0.5">
            Aquí tienes el resumen de tu cartera de hoy.
          </p>
        </div>
        <p className="text-xs text-foreground/35 font-medium">
          {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats grid — 1 col mobile · 2 col sm · 3 col lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Panels — stacked mobile · side-by-side lg (3:2) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3">
          <ProximasFechasCorte />
        </div>
        <div className="lg:col-span-2">
          <SolicitudesRecientes />
        </div>
      </div>
    </div>
  )
}
