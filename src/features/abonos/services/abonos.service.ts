import api from '@/lib/axios'
import type {
  Abono,
  CreditoConRetirosResponse,
  CreditosActivosParams,
  CreditosActivosResponse,
} from '../types/abonos.types'

export const abonosService = {
  getAll: () => api.get<Abono[]>('/abonos'),
  getById: (id: string) => api.get<Abono>(`/abonos/${id}`),
  getByContrato: (contratoId: string) => api.get<Abono[]>(`/abonos/contrato/${contratoId}`),
  create: (data: Omit<Abono, 'id' | 'createdAt'>) => api.post<Abono>('/abonos', data),
  delete: (id: string) => api.delete(`/abonos/${id}`),
  listCreditosActivos: (params: CreditosActivosParams = {}) =>
    api.get<CreditosActivosResponse>('/list/payments.php', { params }),
  getCreditoConRetiros: (id: number) =>
    api.get<CreditoConRetirosResponse>('/list/credit_withdrawals.php', { params: { id } }),
}
