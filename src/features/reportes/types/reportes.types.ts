export interface ReporteParams {
  fechaInicio: string
  fechaFin: string
  tipo?: string
}

export interface ReporteCobranza {
  periodo: string
  totalCobrado: number
  totalPendiente: number
  totalVencido: number
  totalClientes: number
}

export interface ReporteCreditos {
  periodo: string
  solicitudesTotal: number
  aprobadas: number
  rechazadas: number
  montoTotal: number
}
