import { useState } from 'react'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { cn } from '@/shared/utils/cn'
import type { AbonoRegistro } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
const PAGE_SIZE = 10

const TIPO_CONFIG: Record<AbonoRegistro['tipo'], string> = {
  interes: 'text-violet-700 bg-violet-100 dark:text-violet-300 dark:bg-violet-500/15',
  capital: 'text-sky-700   bg-sky-100    dark:text-sky-300    dark:bg-sky-500/15',
}

const columns: Column<Record<string, unknown>>[] = [
  { key: 'fecha', label: 'Fecha' },
  { key: 'cliente', label: 'Cliente',
    render: (val) => <span className="font-medium text-foreground">{String(val)}</span> },
  { key: 'creditoNumero', label: 'Crédito ID', render: (val) => `#${val}` },
  { key: 'monto', label: 'Monto',
    render: (val) => <span className="font-medium text-emerald-600 dark:text-emerald-400">{currency.format(Number(val))}</span> },
  { key: 'tipo', label: 'Tipo',
    render: (val) => {
      const tipo = val as AbonoRegistro['tipo']
      return <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md capitalize', TIPO_CONFIG[tipo])}>{tipo}</span>
    } },
  { key: 'notas', label: 'Notas',
    render: (val) => <span className="text-foreground/60">{String(val)}</span> },
]

interface AbonosRegistroTableProps {
  abonos: AbonoRegistro[]
}

export function AbonosRegistroTable({ abonos }: AbonosRegistroTableProps) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(abonos.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const pageData = abonos.slice(start, start + PAGE_SIZE)

  return (
    <DataTable
      columns={columns}
      data={pageData as unknown as Record<string, unknown>[]}
      rowKey="id"
      currentPage={page}
      totalPages={totalPages}
      totalItems={abonos.length}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}
      emptyMessage="No hay abonos registrados"
    />
  )
}
