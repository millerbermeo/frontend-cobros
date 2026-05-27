import api from '@/lib/axios'
import type { Cliente } from '../types/clientes.types'

export const clientesService = {
  getAll: () => api.get<Cliente[]>('/clientes'),
  getById: (id: string) => api.get<Cliente>(`/clientes/${id}`),
  create: (data: Omit<Cliente, 'id' | 'createdAt'>) => api.post<Cliente>('/clientes', data),
  update: (id: string, data: Partial<Cliente>) => api.put<Cliente>(`/clientes/${id}`, data),
  delete: (id: string) => api.delete(`/clientes/${id}`),
}
