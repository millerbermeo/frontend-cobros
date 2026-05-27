import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usuariosService } from '../services/usuarios.service'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

const QUERY_KEY = 'usuarios'

export function useUsuarios() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => usuariosService.getAll().then((r) => r.data),
  })
}

export function useCreateUsuario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateUsuarioValues) => usuariosService.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useUpdateUsuario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EditUsuarioValues> }) =>
      usuariosService.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}

export function useDeleteUsuario() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: usuariosService.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }),
  })
}
