import { useInfiniteQuery } from '@tanstack/react-query'
import { isNotFoundError } from '@/shared/utils/apiError'
import { contratosService } from '../services/contratos.service'
import type {
  CreditApplication,
  CreditApplicationsParams,
  CreditApplicationsResponse,
} from '../types/contratos.types'

const QUERY_KEY = 'contratos'
export const PER_PAGE = 10

const EMPTY_PAGE: CreditApplicationsResponse = { success: true, data: [] }

type Filters = Pick<CreditApplicationsParams, 'document' | 'name'>

function pageItems(page: CreditApplicationsResponse): CreditApplication[] {
  const raw = page.data
  return Array.isArray(raw) ? raw : raw ? [raw] : []
}

/** Listado paginado de contratos (endpoint /list/credits.php, solo aprobados). */
export function useContratosInfinite(filters: Filters = {}) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: ({ pageParam }) =>
      contratosService
        .list({ page: pageParam, per_page: PER_PAGE, ...filters })
        .then((r) => r.data)
        .catch((err) => {
          if (isNotFoundError(err)) return EMPTY_PAGE
          throw err
        }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const pag = lastPage.pagination
      if (pag) return pag.current_page < pag.last_page ? pag.current_page + 1 : undefined
      return pageItems(lastPage).length < PER_PAGE ? undefined : allPages.length + 1
    },
  })
}

export function flattenContratos(pages?: CreditApplicationsResponse[]): CreditApplication[] {
  return pages?.flatMap(pageItems) ?? []
}
