import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { aprobacionesService } from '../services/aprobaciones.service'

const QUERY_KEY = 'aprobaciones'

export function useAprobaciones() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => aprobacionesService.getAll().then((r) => r.data),
  })
}

export function useAprobar() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, comentario }: { id: string; comentario?: string }) =>
      aprobacionesService.aprobar(id, comentario),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useRechazar() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, comentario }: { id: string; comentario?: string }) =>
      aprobacionesService.rechazar(id, comentario),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
