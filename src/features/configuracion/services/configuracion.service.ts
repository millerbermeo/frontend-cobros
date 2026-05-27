import api from '@/lib/axios'
import type { ConfiguracionGeneral, ConfiguracionCredito, Usuario } from '../types/configuracion.types'

export const configuracionService = {
  getGeneral: () => api.get<ConfiguracionGeneral>('/configuracion/general'),
  updateGeneral: (data: Partial<ConfiguracionGeneral>) =>
    api.put<ConfiguracionGeneral>('/configuracion/general', data),
  getCredito: () => api.get<ConfiguracionCredito>('/configuracion/credito'),
  updateCredito: (data: Partial<ConfiguracionCredito>) =>
    api.put<ConfiguracionCredito>('/configuracion/credito', data),
  getUsuarios: () => api.get<Usuario[]>('/configuracion/usuarios'),
  createUsuario: (data: Omit<Usuario, 'id' | 'createdAt'>) =>
    api.post<Usuario>('/configuracion/usuarios', data),
  updateUsuario: (id: string, data: Partial<Usuario>) =>
    api.put<Usuario>(`/configuracion/usuarios/${id}`, data),
}
