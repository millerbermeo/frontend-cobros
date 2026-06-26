import { MdFileDownload, MdAccountBalanceWallet, MdTrendingUp, MdReportProblem, MdMoneyOff } from 'react-icons/md'
import { Button } from '@heroui/react'
import { StatsCard } from '@/features/dashboard/components/StatsCard'
import type { CardVariant } from '@/features/dashboard/components/StatsCard'
import type { IconType } from 'react-icons'
import { CarteraPorClienteChart } from '../components/CarteraPorClienteChart'
import { CreditosPorTipoChart } from '../components/CreditosPorTipoChart'
import { ReportesDisponibles } from '../components/ReportesDisponibles'
import { ReportesLayout } from '../layouts/ReportesLayout'

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
    label: 'Cartera Total',
    value: '$43.500.000',
    subtitle: '100% de la cartera',
    icon: MdAccountBalanceWallet,
    variant: 'emerald',
  },
  {
    label: 'Intereses Acumulados',
    value: '$2.834.400',
    subtitle: 'vs mes anterior',
    icon: MdTrendingUp,
    variant: 'blue',
    trend: { value: '+8.2%', positive: true },
  },
  {
    label: 'Créditos en Mora',
    value: '4',
    subtitle: '66.7% del total',
    icon: MdReportProblem,
    variant: 'amber',
  },
  {
    label: 'Monto en Mora',
    value: '$20.500.000',
    subtitle: 'Requiere gestión',
    icon: MdMoneyOff,
    variant: 'rose',
  },
]

export function ReportesPage() {
  return (
    <ReportesLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-foreground">Reportes</h1>
          <p className="text-sm text-foreground/50 mt-0.5">Análisis y estadísticas del sistema</p>
        </div>
        <Button variant="primary" className="gap-1.5">
          <MdFileDownload className="w-4 h-4" />
          Exportar Reporte
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CarteraPorClienteChart />
        <CreditosPorTipoChart />
      </div>

      {/* Reportes disponibles */}
      <ReportesDisponibles />
    </ReportesLayout>
  )
}
