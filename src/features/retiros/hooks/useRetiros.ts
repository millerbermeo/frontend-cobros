import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { isNotFoundError } from '@/shared/utils/apiError'
import { retirosService } from '../services/retiros.service'
import type { WithdrawalsParams, WithdrawalsResponse } from '../types/retiros.types'

const QUERY_KEY = 'retiros'

const EMPTY_RESPONSE: WithdrawalsResponse = { success: true, data: [] }

export function useWithdrawals(params: WithdrawalsParams) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () =>
      retirosService
        .list(params)
        .then((r) => r.data)
        .catch((err) => {
          if (isNotFoundError(err)) return EMPTY_RESPONSE
          throw err
        }),
    placeholderData: keepPreviousData,
  })
}

export function useCreateRetiro() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: retirosService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
