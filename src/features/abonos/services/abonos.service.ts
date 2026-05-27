import api from '@/lib/axios'
import type { Abono } from '../types/abonos.types'

export const abonosService = {
  getAll: () => api.get<Abono[]>('/abonos'),
  getById: (id: string) => api.get<Abono>(`/abonos/${id}`),
  getByContrato: (contratoId: string) => api.get<Abono[]>(`/abonos/contrato/${contratoId}`),
  create: (data: Omit<Abono, 'id' | 'createdAt'>) => api.post<Abono>('/abonos', data),
  delete: (id: string) => api.delete(`/abonos/${id}`),
}
