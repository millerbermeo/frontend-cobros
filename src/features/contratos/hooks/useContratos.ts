import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contratosService } from '../services/contratos.service'

const QUERY_KEY = 'contratos'

export function useContratos() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => contratosService.getAll().then((r) => r.data),
  })
}

export function useContrato(id: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => contratosService.getById(id).then((r) => r.data),
    enabled: !!id,
  })
}

export function useCreateContrato() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: contratosService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateContrato() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof contratosService.update>[1] }) =>
      contratosService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
