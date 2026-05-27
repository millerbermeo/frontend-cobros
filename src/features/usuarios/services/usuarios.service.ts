import api from '@/lib/axios'
import type { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '../types/usuarios.types'

export const usuariosService = {
  getAll: () => api.get<Usuario[]>('/usuarios'),
  getById: (id: string) => api.get<Usuario>(`/usuarios/${id}`),
  create: (data: CreateUsuarioDto) => api.post<Usuario>('/usuarios', data),
  update: (id: string, data: UpdateUsuarioDto) => api.put<Usuario>(`/usuarios/${id}`, data),
  delete: (id: string) => api.delete(`/usuarios/${id}`),
}
