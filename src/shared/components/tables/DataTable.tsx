import type { ReactNode } from 'react'
import { Button } from '@heroui/react'
import { MdSearch, MdArrowUpward, MdArrowDownward, MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { Spinner } from '@/shared/components/loaders/Spinner'
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
            <div className="flex items-center gap-2 flex-wrap">{filtersComponent}</div>
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
            <p className="text-sm text-muted">
              Total:{' '}
              <span className="font-medium text-foreground">{totalItems}</span> registros
            </p>
          )}
          <div className="flex items-center gap-3 ml-auto">
            {onPageSizeChange && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted whitespace-nowrap">Filas:</span>
                <select
                  value={pageSize}
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  className="text-sm border border-border rounded-md px-2 py-1 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {pageSizeOptions.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
            {onPageChange && totalPages > 1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  isIconOnly
                  isDisabled={currentPage <= 1}
                  onPress={() => onPageChange(currentPage - 1)}
                  size="sm"
                >
                  <MdChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm px-3 py-1">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="ghost"
                  isIconOnly
                  isDisabled={currentPage >= totalPages}
                  onPress={() => onPageChange(currentPage + 1)}
                  size="sm"
                >
                  <MdChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
