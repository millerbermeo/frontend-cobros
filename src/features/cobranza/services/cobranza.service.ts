import api from '@/lib/axios'
import type { Cuota, CobranzaResumen } from '../types/cobranza.types'

export const cobranzaService = {
  getCuotas: () => api.get<Cuota[]>('/cobranza/cuotas'),
  getCuotasByContrato: (contratoId: string) =>
    api.get<Cuota[]>(`/cobranza/contratos/${contratoId}/cuotas`),
  getResumen: () => api.get<CobranzaResumen>('/cobranza/resumen'),
  registrarPago: (cuotaId: string, monto: number) =>
    api.post<Cuota>(`/cobranza/cuotas/${cuotaId}/pago`, { monto }),
}
