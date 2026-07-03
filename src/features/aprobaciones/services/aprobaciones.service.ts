import api from '@/lib/axios'
import type {
  CreditApplicationsParams,
  CreditApplicationsResponse,
  UpdateCreditPayload,
  UpdateCreditResponse,
} from '../types/aprobaciones.types'

export const aprobacionesService = {
  list: (params: CreditApplicationsParams = {}) =>
    api.get<CreditApplicationsResponse>('/list/credit_application.php', { params }),
  // PUT con body JSON: id + campos a actualizar (tasa, plazo, estado).
  update: (payload: UpdateCreditPayload) =>
    api.put<UpdateCreditResponse>('/create/update_credit_application.php', payload),
}
