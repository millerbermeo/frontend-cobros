import api from '@/lib/axios'
import type { CreditApplicationsParams, CreditApplicationsResponse } from '../types/contratos.types'

export const contratosService = {
  // Endpoint oficial de créditos (solo aprobados, paginado).
  list: (params: CreditApplicationsParams = {}) =>
    api.get<CreditApplicationsResponse>('/list/credits.php', { params }),
}
