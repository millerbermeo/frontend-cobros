import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { DataTable } from '@/shared/components/tables/DataTable'
import { buildCreditoColumns } from './creditoColumns'
import type { CreditoActivo } from '../types/abonos.types'

interface CreditosTableProps {
  creditos: CreditoActivo[]
  isLoading?: boolean
  filters?: ReactNode
  onAbonar: (c: CreditoActivo) => void
  onVerDetalles: (c: CreditoActivo) => void
}

export function CreditosTable({ creditos, isLoading, filters, onAbonar, onVerDetalles }: CreditosTableProps) {
  const columns = useMemo(() => buildCreditoColumns({ onAbonar, onVerDetalles }), [onAbonar, onVerDetalles])

  return (
    <DataTable
      columns={columns}
      data={creditos as unknown as Record<string, unknown>[]}
      rowKey="id"
      isLoading={isLoading}
      filtersComponent={filters}
      emptyMessage="No se encontraron créditos"
    />
  )
}
