import { useMemo, useState } from 'react'
import { Button } from '@heroui/react'
import { MdAccessTime, MdPhone, MdExpandMore, MdChatBubbleOutline } from 'react-icons/md'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { cn } from '@/shared/utils/cn'
import { NIVEL_OPTIONS } from '../data/clientesMora.mock'
import type { ClienteMoraRow, NivelMora } from '../types/clientesMora.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const NIVEL_CONFIG: Record<NivelMora, { label: string; dot: string; badge: string; text: string }> = {
  leve:     { label: 'Leve',     dot: 'bg-amber-400',  badge: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-500/15',    text: 'text-amber-600 dark:text-amber-400' },
  moderada: { label: 'Moderada', dot: 'bg-orange-500', badge: 'text-orange-700 bg-orange-100 dark:text-orange-300 dark:bg-orange-500/15', text: 'text-orange-600 dark:text-orange-400' },
  grave:    { label: 'Grave',    dot: 'bg-rose-500',   badge: 'text-rose-700 bg-rose-100 dark:text-rose-300 dark:bg-rose-500/15',        text: 'text-rose-600 dark:text-rose-400' },
  critica:  { label: 'Crítica',  dot: 'bg-red-700',    badge: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-500/15',            text: 'text-red-600 dark:text-red-400' },
}

interface MoraTableProps {
  clientes: ClienteMoraRow[]
  onDetalle: (c: ClienteMoraRow) => void
  onContactar: (c: ClienteMoraRow) => void
}

export function MoraTable({ clientes, onDetalle, onContactar }: MoraTableProps) {
  const [search, setSearch] = useState('')
  const [nivel, setNivel] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return clientes.filter((c) => {
      const matchNivel = !nivel || c.nivel === nivel
      const matchSearch = !q || c.nombre.toLowerCase().includes(q) || c.cedula.includes(q) || c.telefono.includes(q)
      return matchNivel && matchSearch
    })
  }, [clientes, search, nivel])

  const columns: Column<Record<string, unknown>>[] = [
    { key: 'nombre', label: 'Cliente',
      render: (_, row) => {
        const c = row as unknown as ClienteMoraRow
        return (
          <div className="flex items-start gap-2">
            <span className={cn('mt-1.5 h-2 w-2 rounded-full shrink-0', NIVEL_CONFIG[c.nivel].dot)} />
            <div>
              <p className="font-medium text-foreground">{c.nombre}</p>
              <p className="text-xs text-foreground/40">{c.cedula}</p>
              <p className="text-xs text-foreground/40 flex items-center gap-1">
                <MdPhone className="h-3 w-3" /> {c.telefono}
              </p>
            </div>
          </div>
        )
      } },
    { key: 'diasMora', label: 'Días Mora', sortable: true,
      render: (_, row) => {
        const c = row as unknown as ClienteMoraRow
        const cfg = NIVEL_CONFIG[c.nivel]
        return (
          <div className="flex flex-col gap-1 items-start">
            <span className={cn('flex items-center gap-1 font-medium', cfg.text)}>
              <MdAccessTime className="h-3.5 w-3.5" /> {c.diasMora} días
            </span>
            <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-md', cfg.badge)}>{cfg.label}</span>
          </div>
        )
      } },
    { key: 'capital', label: 'Capital', render: (val) => currency.format(Number(val)) },
    { key: 'interesesColgados', label: 'Intereses Colgados',
      render: (_, row) => {
        const c = row as unknown as ClienteMoraRow
        return (
          <div>
            <p className="font-medium text-rose-600 dark:text-rose-400">{currency.format(c.interesesColgados)}</p>
            <p className="text-xs text-foreground/40">Generados: {currency.format(c.interesesGenerados)}</p>
          </div>
        )
      } },
    { key: 'deudaTotal', label: 'Deuda Total',
      render: (val) => <span className="font-semibold text-rose-600 dark:text-rose-400">{currency.format(Number(val))}</span> },
    { key: 'acciones', label: 'Acciones',
      render: (_, row) => {
        const c = row as unknown as ClienteMoraRow
        return (
          <div className="flex items-center gap-1.5">
            <Button variant="outline" isIconOnly size="sm" onPress={() => onDetalle(c)}>
              <MdExpandMore className="h-4 w-4" />
            </Button>
            <Button variant="primary" isIconOnly size="sm" className="bg-emerald-600! hover:bg-emerald-700!" onPress={() => onContactar(c)}>
              <MdChatBubbleOutline className="h-4 w-4" />
            </Button>
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
      searchPlaceholder="Buscar por nombre, cédula o teléfono..."
      emptyMessage="No se encontraron clientes en mora"
      filtersComponent={
        <select
          value={nivel}
          onChange={(e) => setNivel(e.target.value)}
          className="text-sm border border-border rounded-lg px-3 py-2 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {NIVEL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      }
    />
  )
}
