export type EstadoCuota = 'pendiente' | 'pagada' | 'vencida' | 'parcial'

export interface Cuota {
  id: string
  contratoId: string
  numeroCuota: number
  monto: number
  montoPagado: number
  fechaVencimiento: string
  fechaPago?: string
  estado: EstadoCuota
}

export interface CobranzaResumen {
  totalPendiente: number
  totalVencido: number
  totalCobrado: number
  cuotasVencidas: number
}
