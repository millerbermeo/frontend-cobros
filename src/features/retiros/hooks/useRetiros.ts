import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { retirosService } from '../services/retiros.service'

const QUERY_KEY = 'retiros'

export function useRetiros() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => retirosService.getAll().then((r) => r.data),
  })
}

export function useCreateRetiro() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: retirosService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useProcesarRetiro() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: retirosService.procesar,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
