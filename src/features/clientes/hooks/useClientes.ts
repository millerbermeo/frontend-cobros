import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { clientesService } from '../services/clientes.service'
import type { CustomersParams } from '../types/clientes.types'

const QUERY_KEY = 'clientes'

export function useCustomers(params: CustomersParams) {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => clientesService.list(params).then((r) => r.data),
    placeholderData: keepPreviousData,
  })
}

export function useClientes() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => clientesService.getAll().then((r) => r.data),
  })
}

export function useCliente(id: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => clientesService.getById(id).then((r) => r.data),
    enabled: !!id,
  })
}

export function useCreateCliente() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: clientesService.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateCliente() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: Parameters<typeof clientesService.update>[1] }) =>
      clientesService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useDeleteCliente() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: clientesService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
