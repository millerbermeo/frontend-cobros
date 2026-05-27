import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { abonosService } from '../services/abonos.service'

const QUERY_KEY = 'abonos'

export function useAbonos() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => abonosService.getAll().then((r) => r.data),
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
