import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { aprobacionesService } from '../services/aprobaciones.service'
import type {
  CreditApplication,
  CreditApplicationsParams,
  CreditApplicationsResponse,
} from '../types/aprobaciones.types'

const QUERY_KEY = 'aprobaciones'
export const PER_PAGE = 10

type Filters = Pick<CreditApplicationsParams, 'document' | 'name'>

function pageItems(page: CreditApplicationsResponse): CreditApplication[] {
  const raw = page.data
  return Array.isArray(raw) ? raw : raw ? [raw] : []
}

/** Listado paginado incremental ("cargar más"). */
export function useAprobacionesInfinite(filters: Filters = {}) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY, filters],
    queryFn: ({ pageParam }) =>
      aprobacionesService.list({ page: pageParam, per_page: PER_PAGE, ...filters }).then((r) => r.data),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const pag = lastPage.pagination
      if (pag) return pag.current_page < pag.last_page ? pag.current_page + 1 : undefined
      // Sin metadata de paginación: si la última página vino incompleta, no hay más.
      return pageItems(lastPage).length < PER_PAGE ? undefined : allPages.length + 1
    },
  })
}

export function flattenAprobaciones(pages?: CreditApplicationsResponse[]): CreditApplication[] {
  return pages?.flatMap(pageItems) ?? []
}

export function useUpdateCredit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: aprobacionesService.update,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
