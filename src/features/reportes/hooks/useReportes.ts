import { useQuery } from '@tanstack/react-query'
import { reportesService } from '../services/reportes.service'
import type { ReporteParams } from '../types/reportes.types'

export function useReporteCobranza(params: ReporteParams) {
  return useQuery({
    queryKey: ['reportes', 'cobranza', params],
    queryFn: () => reportesService.getCobranza(params).then((r) => r.data),
    enabled: !!params.fechaInicio && !!params.fechaFin,
  })
}

export function useReporteCreditos(params: ReporteParams) {
  return useQuery({
    queryKey: ['reportes', 'creditos', params],
    queryFn: () => reportesService.getCreditos(params).then((r) => r.data),
    enabled: !!params.fechaInicio && !!params.fechaFin,
  })
}
