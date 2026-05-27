export type EstadoRetiro = 'pendiente' | 'procesado' | 'cancelado'

export interface Retiro {
  id: string
  clienteId: string
  monto: number
  estado: EstadoRetiro
  metodoPago: string
  referencia?: string
  observacion?: string
  fechaSolicitud: string
  fechaProcesado?: string
  createdAt: string
}
