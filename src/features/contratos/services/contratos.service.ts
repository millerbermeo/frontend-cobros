import api from '@/lib/axios'
import type { Contrato } from '../types/contratos.types'

export const contratosService = {
  getAll: () => api.get<Contrato[]>('/contratos'),
  getById: (id: string) => api.get<Contrato>(`/contratos/${id}`),
  create: (data: Omit<Contrato, 'id' | 'createdAt'>) => api.post<Contrato>('/contratos', data),
  update: (id: string, data: Partial<Contrato>) => api.put<Contrato>(`/contratos/${id}`, data),
  delete: (id: string) => api.delete(`/contratos/${id}`),
}
