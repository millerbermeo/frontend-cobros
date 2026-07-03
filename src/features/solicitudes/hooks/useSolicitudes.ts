import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { isNotFoundError } from '@/shared/utils/apiError'
import { solicitudesService } from '../services/solicitudes.service'
import type { CreditApplicationsParams, CreditApplicationsResponse } from '../types/solicitudes.types'

const QUERY_KEY = 'solicitudes'

const EMPTY_RESPONSE: CreditApplicationsResponse = { success: true, data: [] }

export function useCreditApplications(params: CreditApplicationsParams) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () =>
      solicitudesService
        .list(params)
        .then((r) => r.data)
        .catch((err) => {
          if (isNotFoundError(err)) return EMPTY_RESPONSE
          throw err
        }),
    placeholderData: keepPreviousData,
  })
}

export function useCreateSolicitud() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: solicitudesService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateSolicitud() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Parameters<typeof solicitudesService.update>[1] }) =>
      solicitudesService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
