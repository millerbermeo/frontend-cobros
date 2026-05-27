import api from '@/lib/axios'
import type { ReporteCobranza, ReporteCreditos, ReporteParams } from '../types/reportes.types'

export const reportesService = {
  getCobranza: (params: ReporteParams) =>
    api.get<ReporteCobranza[]>('/reportes/cobranza', { params }),
  getCreditos: (params: ReporteParams) =>
    api.get<ReporteCreditos[]>('/reportes/creditos', { params }),
  exportarPDF: (tipo: string, params: ReporteParams) =>
    api.get<Blob>(`/reportes/${tipo}/pdf`, { params, responseType: 'blob' }),
  exportarExcel: (tipo: string, params: ReporteParams) =>
    api.get<Blob>(`/reportes/${tipo}/excel`, { params, responseType: 'blob' }),
}
