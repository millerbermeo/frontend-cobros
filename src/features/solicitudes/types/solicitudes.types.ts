export type EstadoSolicitud = 'pendiente' | 'aprobada' | 'rechazada' | 'revision'

export interface Solicitud {
  id: string
  clienteId: string
  monto: number
  plazo: number
  tasaInteres: number
  estado: EstadoSolicitud
  proposito: string
  createdAt: string
}
