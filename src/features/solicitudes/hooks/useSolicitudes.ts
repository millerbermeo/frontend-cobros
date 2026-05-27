import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { solicitudesService } from '../services/solicitudes.service'

const QUERY_KEY = 'solicitudes'

export function useSolicitudes() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => solicitudesService.getAll().then((r) => r.data),
  })
}

export function useSolicitud(id: string) {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => solicitudesService.getById(id).then((r) => r.data),
    enabled: !!id,
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
    mutationFn: ({ id, data }: { id: string; data: Partial<Parameters<typeof solicitudesService.update>[1]> }) =>
      solicitudesService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
