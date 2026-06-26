import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { usuariosService } from '../services/usuarios.service'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

export const USUARIOS_KEY = 'usuarios'

export function useUsuarios(page = 1, perPage = 10) {
  return useQuery({
    queryKey: [USUARIOS_KEY, page, perPage],
    queryFn: () => usuariosService.getAll(page, perPage).then((r) => r.data),
    placeholderData: keepPreviousData,
  })
}

export function useCreateUsuario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUsuarioValues) => usuariosService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [USUARIOS_KEY] }),
  })
}

export function useUpdateUsuario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: EditUsuarioValues }) =>
      usuariosService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [USUARIOS_KEY] }),
  })
}
