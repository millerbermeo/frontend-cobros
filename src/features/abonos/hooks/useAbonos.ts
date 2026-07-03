import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { isNotFoundError } from '@/shared/utils/apiError'
import { abonosService } from '../services/abonos.service'
import type { CreditosActivosParams, CreditosActivosResponse } from '../types/abonos.types'

const QUERY_KEY = 'abonos'

const EMPTY_CREDITOS_RESPONSE: CreditosActivosResponse = { success: true, total: 0, data: [] }

export function useAbonos() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => abonosService.getAll().then((r) => r.data),
  })
}

export function useCreditosActivos(params: CreditosActivosParams) {
  return useQuery({
    queryKey: [QUERY_KEY, 'creditos-activos', params],
    queryFn: () =>
      abonosService
        .listCreditosActivos(params)
        .then((r) => r.data)
        .catch((err) => {
          if (isNotFoundError(err)) return EMPTY_CREDITOS_RESPONSE
          throw err
        }),
    placeholderData: keepPreviousData,
  })
}

export function useCreateAbono() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: abonosService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QUERY_KEY] })
      qc.invalidateQueries({ queryKey: ['cobranza'] })
    },
  })
}

export function useDeleteAbono() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: abonosService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
