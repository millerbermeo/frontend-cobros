import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { clientesMoraService } from '../services/clientesMora.service'

const QUERY_KEY = 'clientes-mora'

export function useClientesMora() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => clientesMoraService.getAll().then((r) => r.data),
  })
}

export function useRegistrarGestion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, observacion }: { id: string; observacion: string }) =>
      clientesMoraService.registrarGestion(id, { observacion }),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
