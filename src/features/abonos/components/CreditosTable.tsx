import { useMemo, useState } from 'react'
import { Button } from '@heroui/react'
import { MdAttachMoney, MdAdd, MdChevronRight } from 'react-icons/md'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { cn } from '@/shared/utils/cn'
import type { CreditoAbono } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface CreditosTableProps {
  creditos: CreditoAbono[]
  onAbonar: (c: CreditoAbono) => void
  onVerDetalles: (c: CreditoAbono) => void
}

export function CreditosTable({ creditos, onAbonar, onVerDetalles }: CreditosTableProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return creditos
    return creditos.filter(
      (c) =>
        c.cliente.toLowerCase().includes(q) ||
        String(c.numero).includes(q) ||
        c.estado.includes(q),
    )
  }, [creditos, search])

  const columns: Column<Record<string, unknown>>[] = [
    { key: 'numero', label: 'Crédito',
      render: (val) => (
        <span className="flex items-center gap-1.5 font-medium text-primary">
          <MdAttachMoney className="h-4 w-4" /> #{String(val)}
        </span>
      ) },
    { key: 'cliente', label: 'Cliente', sortable: true,
      render: (val) => <span className="font-medium text-foreground">{String(val)}</span> },
    { key: 'montoOriginal', label: 'Monto Original', render: (val) => currency.format(Number(val)) },
    { key: 'saldoCapital', label: 'Saldo Capital',
      render: (val) => <span className="font-medium text-sky-600 dark:text-sky-400">{currency.format(Number(val))}</span> },
    { key: 'interesesPendientes', label: 'Intereses Pend.',
      render: (val) => <span className="font-medium text-orange-600 dark:text-orange-400">{currency.format(Number(val))}</span> },
    { key: 'tasa', label: 'Tasa',
      render: (val) => <span className="text-emerald-600 dark:text-emerald-400">{String(val)}%</span> },
    { key: 'fechaCorte', label: 'Fecha Corte',
      render: (val) => <span className="text-foreground/60">{String(val)}</span> },
    { key: 'estado', label: 'Estado',
      render: (val) => {
        const estado = String(val)
        const cls = estado === 'mora'
          ? 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-500/15'
          : 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15'
        return <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md capitalize', cls)}>{estado}</span>
      } },
    { key: 'acciones', label: 'Acciones',
      render: (_, row) => {
        const c = row as unknown as CreditoAbono
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

  return (
    <DataTable
      columns={columns}
      data={filtered as unknown as Record<string, unknown>[]}
      rowKey="id"
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Buscar por cliente, ID o estado..."
      emptyMessage="No se encontraron créditos"
    />
  )
}
