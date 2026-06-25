import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usuariosService, type SaveUsuarioPayload } from '../services/usuarios.service'

export const USUARIOS_KEY = 'usuarios'

export function useUsuarios(page = 1) {
  return useQuery({
    queryKey: [USUARIOS_KEY, page],
    queryFn: () => usuariosService.getAll(page).then((r) => r.data),
  })
}

export function useSaveUsuario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: SaveUsuarioPayload) => usuariosService.save(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [USUARIOS_KEY] }),
  })
}
