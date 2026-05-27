import api from '@/lib/axios'
import type { Usuario } from '../types/usuarios.types'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

export const usuariosService = {
  getAll: () => api.get<Usuario[]>('/usuarios'),
  getById: (id: string) => api.get<Usuario>(`/usuarios/${id}`),
  create: (data: CreateUsuarioValues) => api.post<Usuario>('/usuarios', data),
  update: (id: string, data: Partial<EditUsuarioValues>) => api.put<Usuario>(`/usuarios/${id}`, data),
  delete: (id: string) => api.delete(`/usuarios/${id}`),
}
