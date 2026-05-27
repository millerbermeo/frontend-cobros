import api from '@/lib/axios'
import type { Aprobacion } from '../types/aprobaciones.types'

export const aprobacionesService = {
  getAll: () => api.get<Aprobacion[]>('/aprobaciones'),
  getById: (id: string) => api.get<Aprobacion>(`/aprobaciones/${id}`),
  aprobar: (id: string, comentario?: string) =>
    api.post<Aprobacion>(`/aprobaciones/${id}/aprobar`, { comentario }),
  rechazar: (id: string, comentario?: string) =>
    api.post<Aprobacion>(`/aprobaciones/${id}/rechazar`, { comentario }),
}
