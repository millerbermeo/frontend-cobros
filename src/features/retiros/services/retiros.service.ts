import api from '@/lib/axios'
import type { Retiro } from '../types/retiros.types'

export const retirosService = {
  getAll: () => api.get<Retiro[]>('/retiros'),
  getById: (id: string) => api.get<Retiro>(`/retiros/${id}`),
  create: (data: Omit<Retiro, 'id' | 'createdAt' | 'estado'>) => api.post<Retiro>('/retiros', data),
  procesar: (id: string) => api.post<Retiro>(`/retiros/${id}/procesar`),
  cancelar: (id: string) => api.post<Retiro>(`/retiros/${id}/cancelar`),
}
