import api from '@/lib/axios'
import type { Solicitud } from '../types/solicitudes.types'

export const solicitudesService = {
  getAll: () => api.get<Solicitud[]>('/solicitudes'),
  getById: (id: string) => api.get<Solicitud>(`/solicitudes/${id}`),
  create: (data: Omit<Solicitud, 'id' | 'createdAt' | 'estado'>) =>
    api.post<Solicitud>('/solicitudes', data),
  update: (id: string, data: Partial<Solicitud>) =>
    api.put<Solicitud>(`/solicitudes/${id}`, data),
  delete: (id: string) => api.delete(`/solicitudes/${id}`),
}
