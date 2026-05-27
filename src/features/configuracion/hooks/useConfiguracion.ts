import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { configuracionService } from '../services/configuracion.service'

export function useConfiguracionGeneral() {
  return useQuery({
    queryKey: ['configuracion', 'general'],
    queryFn: () => configuracionService.getGeneral().then((r) => r.data),
  })
}

export function useUpdateConfiguracionGeneral() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: configuracionService.updateGeneral,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['configuracion', 'general'] }),
  })
}

export function useUsuarios() {
  return useQuery({
    queryKey: ['configuracion', 'usuarios'],
    queryFn: () => configuracionService.getUsuarios().then((r) => r.data),
  })
}

export function useCreateUsuario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: configuracionService.createUsuario,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['configuracion', 'usuarios'] }),
  })
}
