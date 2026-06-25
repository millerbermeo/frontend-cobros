import api from '@/lib/axios'
import type { ListUsersResponse, Usuario } from '../types/usuarios.types'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

export const usuariosService = {
  getAll: (page = 1) =>
    api.get<ListUsersResponse>('/list/users', { params: { page } }),

  create: (data: CreateUsuarioValues) =>
    api.post<Usuario>('/create/c_users', data),

  update: (id: number, data: EditUsuarioValues) => {
    const body = data.pass
      ? { id, ...data }
      : { id, name: data.name, username: data.username, rol: data.rol, state: data.state }
    return api.put<Usuario>('/create/c_users', body)
  },
}
