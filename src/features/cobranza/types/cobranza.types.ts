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

export type EstadoCobranza = 'activo' | 'mora'

export interface CreditoCobranza {
  id: string
  numero: number
  cliente: string
  saldoCapital: number
  montoOriginal: number
  intereses: number
  fechaCorte: string
  estado: EstadoCobranza
  /** Días en mora, solo cuando estado === 'mora'. */
  moraDias?: number
}
