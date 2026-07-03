import api from '@/lib/axios'
import type { RetiroFormValues } from '../schemas/retiro.schema'
import type { WithdrawalCreateResponse, WithdrawalsParams, WithdrawalsResponse } from '../types/retiros.types'

/** Mapea el formulario a los campos que espera c_withdrawal.php */
function toFormData(values: RetiroFormValues): FormData {
  const fd = new FormData()
  fd.append('name', values.cliente)
  fd.append('document', values.documento)
  fd.append('withdrawal_date', values.fecha)
  fd.append('withdrawal_hour', values.hora)
  fd.append('amount', values.monto)
  fd.append('concept', values.concepto)
  fd.append('authorized_by', values.autorizadoPor)
  fd.append('withdrawn_by', values.realizadoPor)
  return fd
}

export const retirosService = {
  list: (params: WithdrawalsParams = {}) =>
    api.get<WithdrawalsResponse>('/list/withdrawal.php', { params }),
  create: (values: RetiroFormValues) =>
    api.post<WithdrawalCreateResponse>('/create/c_withdrawal.php', toFormData(values), {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}
