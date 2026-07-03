import type { ReactNode } from 'react'
import { DataTable } from '@/shared/components/tables/DataTable'
import { retiroColumns } from './retiroColumns'
import type { Withdrawal } from '../types/retiros.types'

interface RetirosTableProps {
  retiros: Withdrawal[]
  isLoading?: boolean
  filters?: ReactNode
}

export function RetirosTable({ retiros, isLoading, filters }: RetirosTableProps) {
  return (
    <div className="flex flex-col gap-2">
      <DataTable
        columns={retiroColumns}
        data={retiros as unknown as Record<string, unknown>[]}
        rowKey="id"
        isLoading={isLoading}
        filtersComponent={filters}
        emptyMessage="No se encontraron retiros"
      />
      <p className="text-sm text-foreground/50">
        Mostrando {retiros.length > 0 ? 1 : 0} - {retiros.length} de {retiros.length} retiros
      </p>
    </div>
  )
}
