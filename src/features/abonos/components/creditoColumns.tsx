import { Button } from '@heroui/react'
import { MdPerson, MdBadge, MdAttachMoney, MdAdd, MdChevronRight } from 'react-icons/md'
import type { Column } from '@/shared/components/tables/DataTable'
import { cn } from '@/shared/utils/cn'
import type { CreditoActivo } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface CreditoColumnsArgs {
  onAbonar: (c: CreditoActivo) => void
  onVerDetalles: (c: CreditoActivo) => void
}

export function buildCreditoColumns({ onAbonar, onVerDetalles }: CreditoColumnsArgs): Column<Record<string, unknown>>[] {
  return [
    { key: 'id_sol_credi', label: 'Crédito',
      render: (val) => (
        <span className="flex items-center gap-1.5 font-medium text-primary">
          <MdAttachMoney className="h-4 w-4" /> #{String(val)}
        </span>
      ) },
    { key: 'nombre', label: 'Cliente', sortable: true,
      render: (val) => (
        <span className="flex items-center gap-2 font-medium text-foreground">
          <MdPerson className="h-4 w-4 text-primary" /> {String(val)}
        </span>
      ) },
    { key: 'document', label: 'Documento',
      render: (val) => (
        <span className="flex items-center gap-1.5 text-foreground/70">
          <MdBadge className="h-3.5 w-3.5 text-foreground/40" /> {String(val)}
        </span>
      ) },
    { key: 'original_amount', label: 'Monto Original', render: (val) => currency.format(Number(val)) },
    { key: 'outstanding_principal', label: 'Saldo Capital',
      render: (val) => <span className="font-medium text-sky-600 dark:text-sky-400">{currency.format(Number(val))}</span> },
    { key: 'outstanding_interest', label: 'Intereses Pend.',
      render: (val) => <span className="font-medium text-orange-600 dark:text-orange-400">{currency.format(Number(val))}</span> },
    { key: 'rate', label: 'Tasa',
      render: (val) => <span className="text-emerald-600 dark:text-emerald-400">{String(val)}%</span> },
    { key: 'cutoff_date', label: 'Fecha Corte',
      render: (val) => <span className="text-foreground/60">{String(val)}</span> },
    { key: 'state', label: 'Estado',
      render: (val) => {
        const state = String(val)
        const cls = state === 'Activo'
          ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15'
          : 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-500/15'
        return <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md', cls)}>{state}</span>
      } },
    { key: 'acciones', label: 'Acciones',
      render: (_, row) => {
        const c = row as unknown as CreditoActivo
        return (
          <div className="flex items-center gap-3">
            <Button variant="primary" size="sm" className="gap-1 bg-emerald-600! hover:bg-emerald-700!" onPress={() => onAbonar(c)}>
              <MdAdd className="h-3.5 w-3.5" /> Abonar
            </Button>
            <button
              onClick={() => onVerDetalles(c)}
              className="flex items-center gap-0.5 text-sm text-primary hover:underline"
            >
              Ver detalles <MdChevronRight className="h-4 w-4" />
            </button>
          </div>
        )
      } },
  ]
}
