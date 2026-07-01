import { useMemo } from 'react'
import { MdWarningAmber } from 'react-icons/md'
import { alert } from '@/shared/utils/alert'
import { cn } from '@/shared/utils/cn'
import { MoraStats } from '../components/MoraStats'
import { MoraTable } from '../components/MoraTable'
import { MOCK_MORA, NIVEL_LEGEND } from '../data/clientesMora.mock'
import type { ClienteMoraRow } from '../types/clientesMora.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export function ClientesMoraPage() {
  const stats = useMemo(() => {
    const capital = MOCK_MORA.reduce((a, c) => a + c.capital, 0)
    const interesesColgados = MOCK_MORA.reduce((a, c) => a + c.interesesColgados, 0)
    const deudaTotal = MOCK_MORA.reduce((a, c) => a + c.deudaTotal, 0)
    return { clientes: MOCK_MORA.length, capital, interesesColgados, deudaTotal }
  }, [])

  const verDetalle = (c: ClienteMoraRow) => alert.toast(`Detalle de ${c.nombre} · ${c.diasMora} días en mora`)
  const contactar = (c: ClienteMoraRow) => alert.toast(`Contactando a ${c.nombre}`)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
            <MdWarningAmber className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Clientes en Mora</h1>
            <p className="text-sm text-foreground/50 mt-0.5">Cartera vencida y clientes con intereses pendientes</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg border border-rose-200 text-rose-600 bg-rose-50 dark:border-rose-500/25 dark:text-rose-300 dark:bg-rose-500/10">
          <MdWarningAmber className="h-4 w-4" />
          {stats.clientes} clientes en mora
        </span>
      </div>

      <MoraStats
        data={{
          clientes: stats.clientes,
          deudaTotal: stats.deudaTotal,
          interesesColgados: stats.interesesColgados,
          capitalRiesgo: stats.capital,
        }}
      />

      <div className="rounded-2xl border border-border bg-card shadow-sm p-5 flex flex-col gap-4">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4">
          {NIVEL_LEGEND.map((l) => (
            <span key={l.nivel} className="flex items-center gap-1.5 text-xs text-foreground/60">
              <span className={cn('h-2.5 w-2.5 rounded-full', l.dot)} />
              {l.label}
            </span>
          ))}
        </div>

        <MoraTable clientes={MOCK_MORA} onDetalle={verDetalle} onContactar={contactar} />

        {/* Total footer */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 border-t border-border pt-3 text-sm">
          <span className="text-foreground/60">Total ({stats.clientes} clientes)</span>
          <span className="hidden md:block" />
          <span className="font-semibold text-foreground">{currency.format(stats.capital)}</span>
          <span className="font-semibold text-rose-600 dark:text-rose-400">{currency.format(stats.interesesColgados)}</span>
          <span className="font-semibold text-rose-600 dark:text-rose-400">{currency.format(stats.deudaTotal)}</span>
        </div>
      </div>
    </div>
  )
}
