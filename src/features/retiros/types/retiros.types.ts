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

export interface RetiroRegistro {
  id: string
  cliente: string
  fecha: string
  hora: string
  monto: number
  concepto: string
  realizadoPor: string
  autorizadoPor: string
}
