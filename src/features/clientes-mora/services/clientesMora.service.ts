import api from '@/lib/axios'
import type { ClienteMora } from '../types/clientesMora.types'

export const clientesMoraService = {
  getAll: () => api.get<ClienteMora[]>('/clientes-mora'),
  getById: (id: string) => api.get<ClienteMora>(`/clientes-mora/${id}`),
  registrarGestion: (id: string, data: { observacion: string }) =>
    api.post<ClienteMora>(`/clientes-mora/${id}/gestion`, data),
}
