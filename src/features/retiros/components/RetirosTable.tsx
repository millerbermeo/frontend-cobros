import { useMemo, useState } from 'react'
import { MdPerson, MdCalendarToday, MdAccessTime } from 'react-icons/md'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import type { RetiroRegistro } from '../types/retiros.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const columns: Column<Record<string, unknown>>[] = [
  { key: 'cliente', label: 'Cliente', sortable: true,
    render: (val) => (
      <span className="flex items-center gap-2 font-medium text-foreground">
        <MdPerson className="h-4 w-4 text-primary" /> {String(val)}
      </span>
    ) },
  { key: 'fecha', label: 'Fecha',
    render: (val) => (
      <span className="flex items-center gap-1.5 text-foreground/70">
        <MdCalendarToday className="h-3.5 w-3.5 text-foreground/40" /> {String(val)}
      </span>
    ) },
  { key: 'hora', label: 'Hora',
    render: (val) => (
      <span className="flex items-center gap-1.5 text-foreground/70">
        <MdAccessTime className="h-3.5 w-3.5 text-foreground/40" /> {String(val)}
      </span>
    ) },
  { key: 'monto', label: 'Monto',
    render: (val) => <span className="font-semibold text-rose-600 dark:text-rose-400">-{currency.format(Number(val))}</span> },
  { key: 'concepto', label: 'Concepto',
    render: (val) => <span className="text-foreground/70">{String(val)}</span> },
  { key: 'realizadoPor', label: 'Realizado Por',
    render: (val) => {
      const name = String(val)
      return (
        <span className="flex items-center gap-2 text-foreground/80">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
            <MdPerson className="h-3.5 w-3.5" />
          </span>
          {name}
        </span>
      )
    } },
  { key: 'autorizadoPor', label: 'Autorizado Por',
    render: (val) => (
      <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/15">
        {String(val)}
      </span>
    ) },
]

interface RetirosTableProps {
  retiros: RetiroRegistro[]
}

export function RetirosTable({ retiros }: RetirosTableProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return retiros
    return retiros.filter(
      (r) =>
        r.cliente.toLowerCase().includes(q) ||
        r.concepto.toLowerCase().includes(q) ||
        r.realizadoPor.toLowerCase().includes(q),
    )
  }, [retiros, search])

  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={columns}
        data={filtered as unknown as Record<string, unknown>[]}
        rowKey="id"
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Buscar por cliente, concepto o persona que realizó el retiro..."
        emptyMessage="No se encontraron retiros"
      />
      <p className="text-sm text-foreground/50">
        Mostrando {filtered.length > 0 ? 1 : 0} - {filtered.length} de {retiros.length} retiros
      </p>
    </div>
  )
}
