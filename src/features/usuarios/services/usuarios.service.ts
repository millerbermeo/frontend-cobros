import api from '@/lib/axios'
import type { ApiResponse } from '@/shared/types/api.types'
import type { ListUsersResponse, Usuario } from '../types/usuarios.types'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

function assertSuccess(response: ApiResponse<unknown>) {
  if (!response.success) {
    throw new Error(response.message ?? 'Error en la operación')
  }
}

export const usuariosService = {
  getAll: (page = 1, perPage = 10) =>
    api.get<ListUsersResponse>('/list/users', { params: { page, per_page: perPage } }),

  create: async (data: CreateUsuarioValues) => {
    const res = await api.post<ApiResponse<Usuario>>('/create/c_users', data)
    assertSuccess(res.data)
    return res.data
  },

  update: async (id: number, data: EditUsuarioValues) => {
    const body = data.pass
      ? { id, ...data }
      : { id, name: data.name, username: data.username, rol: data.rol, state: data.state }
    const res = await api.put<ApiResponse<Usuario>>('/create/c_users', body)
    assertSuccess(res.data)
    return res.data
  },
}
