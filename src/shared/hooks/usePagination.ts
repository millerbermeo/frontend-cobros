import { useState } from 'react'
import { DEFAULT_PAGE_SIZE } from '@/shared/constants/api.constants'
import type { PaginationParams } from '@/shared/types/pagination.types'

interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
}

export function usePagination(options: UsePaginationOptions = {}) {
  const [params, setParams] = useState<PaginationParams>({
    page: options.initialPage ?? 1,
    pageSize: options.initialPageSize ?? DEFAULT_PAGE_SIZE,
  })

  return {
    params,
    setPage: (page: number) => setParams((prev) => ({ ...prev, page })),
    setPageSize: (pageSize: number) => setParams((prev) => ({ ...prev, pageSize, page: 1 })),
    setSearch: (search: string) => setParams((prev) => ({ ...prev, search, page: 1 })),
    setSortBy: (sortBy: string, sortOrder: 'asc' | 'desc') =>
      setParams((prev) => ({ ...prev, sortBy, sortOrder })),
    reset: () =>
      setParams({ page: 1, pageSize: options.initialPageSize ?? DEFAULT_PAGE_SIZE }),
  }
}
