import api from '@/lib/axios'
import type { Usuario } from '../types/usuarios.types'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

export type SaveUsuarioPayload =
  | ({ id?: never } & CreateUsuarioValues)
  | ({ id: number } & EditUsuarioValues)

export const usuariosService = {
  getAll: (page = 1) =>
    api.get<Usuario[]>('/list/users', { params: { page } }),

  save: (payload: SaveUsuarioPayload) => {
    const body =
      'pass' in payload && !payload.pass
        ? (({ pass: _omit, ...rest }) => rest)(payload as Required<SaveUsuarioPayload>)
        : payload
    return api.put<Usuario>('/create/c_users', body)
  },
}
