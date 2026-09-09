import type { ReactNode } from 'react'
import { MdSearch, MdArrowUpward, MdArrowDownward } from 'react-icons/md'
import { Spinner } from '@/shared/components/loaders/Spinner'
import { TablePagination } from '@/shared/components/tables/TablePagination'
import { PAGE_SIZE_OPTIONS } from '@/shared/constants/api.constants'
import { cn } from '@/shared/utils/cn'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (value: unknown, row: T) => ReactNode
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  rowKey?: keyof T
  isLoading?: boolean
  emptyMessage?: string
  filtersComponent?: ReactNode
  currentPage?: number
  totalPages?: number
  totalItems?: number
  pageSize?: number
  pageSizeOptions?: readonly number[]
  onPageChange?: (page: number) => void
  onPageSizeChange?: (size: number) => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: string, direction: 'asc' | 'desc') => void
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  isLoading = false,
  emptyMessage = 'No hay datos disponibles',
  filtersComponent,
  currentPage = 1,
  totalPages = 1,
  totalItems,
  pageSize = 10,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Buscar...',
  sortKey,
  sortDirection,
  onSort,
}: DataTableProps<T>) {
  const getRowKey = (row: T, idx: number): string => {
    if (rowKey) return String(row[rowKey])
    return String(idx)
  }

  const handleSort = (key: string) => {
    if (!onSort) return
    const newDir = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(key, newDir)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      {(onSearchChange || filtersComponent) && (
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {onSearchChange && (
            <div className="relative w-full sm:max-w-xs">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
              <input
                type="text"
                value={searchValue ?? ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          )}
          {filtersComponent && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">{filtersComponent}</div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={cn(
                    'px-4 py-3 text-left font-medium text-muted whitespace-nowrap',
                    col.sortable && 'cursor-pointer select-none hover:text-foreground transition-colors'
                  )}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDirection === 'asc'
                        ? <MdArrowUpward className="w-3 h-3 text-primary" />
                        : <MdArrowDownward className="w-3 h-3 text-primary" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <Spinner size="md" color="accent" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr
                  key={getRowKey(row, idx)}
                  className="border-b border-border last:border-0 hover:bg-card/50 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-foreground">
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom bar */}
      {(onPageChange || onPageSizeChange) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {totalItems !== undefined && (
            <p className="text-sm text-muted 3xl:text-base">
              Total:{' '}
              <span className="font-semibold text-foreground tabular-nums">{totalItems}</span> registros
            </p>
          )}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {onPageSizeChange && (
              <label className="flex items-center gap-2 text-xs text-muted whitespace-nowrap 3xl:text-sm">
                Filas:
                <select
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  className="h-10 rounded-xl border border-border bg-card px-2.5 text-sm font-medium text-foreground shadow-sm cursor-pointer transition-colors hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary 3xl:h-12 3xl:text-base"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </label>
            )}
            {onPageChange && totalPages > 1 && (
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}
