import { MdPerson, MdBadge, MdCalendarToday, MdAccessTime } from 'react-icons/md'
import type { Column } from '@/shared/components/tables/DataTable'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

export const retiroColumns: Column<Record<string, unknown>>[] = [
  { key: 'name', label: 'Cliente', sortable: true,
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
  { key: 'withdrawal_date', label: 'Fecha',
    render: (val) => (
      <span className="flex items-center gap-1.5 text-foreground/70">
        <MdCalendarToday className="h-3.5 w-3.5 text-foreground/40" /> {String(val)}
      </span>
    ) },
  { key: 'withdrawal_hour', label: 'Hora',
    render: (val) => (
      <span className="flex items-center gap-1.5 text-foreground/70">
        <MdAccessTime className="h-3.5 w-3.5 text-foreground/40" /> {String(val)}
      </span>
    ) },
  { key: 'amount', label: 'Monto',
    render: (val) => <span className="font-semibold text-rose-600 dark:text-rose-400">-{currency.format(Number(val))}</span> },
  { key: 'concept', label: 'Concepto',
    render: (val) => <span className="text-foreground/70">{String(val)}</span> },
  { key: 'withdrawn_by', label: 'Realizado Por',
    render: (val) => (
      <span className="flex items-center gap-2 text-foreground/80">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
          <MdPerson className="h-3.5 w-3.5" />
        </span>
        {String(val)}
      </span>
    ) },
  { key: 'authorized_by', label: 'Autorizado Por',
    render: (val) => (
      <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/15">
        {String(val)}
      </span>
    ) },
]
