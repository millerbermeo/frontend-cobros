import { MdDescription } from 'react-icons/md'
import type { CreditoActivo } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface AbonoCreditoInfoCardProps {
  credito: CreditoActivo
}

export function AbonoCreditoInfoCard({ credito }: AbonoCreditoInfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-500/10 dark:to-emerald-500/10 px-5 py-4">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-3">
        <MdDescription className="h-4 w-4" /> Información del Crédito
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-foreground/50 text-xs">Cliente</p>
          <p className="font-medium text-foreground">{credito.nombre}</p>
        </div>
        <div>
          <p className="text-foreground/50 text-xs">Crédito ID</p>
          <p className="font-semibold text-foreground">#{credito.id_sol_credi}</p>
        </div>
        <div>
          <p className="text-foreground/50 text-xs">Saldo Capital</p>
          <p className="font-semibold text-sky-600 dark:text-sky-400">{currency.format(credito.outstanding_principal)}</p>
        </div>
        <div>
          <p className="text-foreground/50 text-xs">Intereses Pendientes</p>
          <p className="font-semibold text-orange-600 dark:text-orange-400">{currency.format(credito.outstanding_interest)}</p>
        </div>
      </div>
    </div>
  )
}
