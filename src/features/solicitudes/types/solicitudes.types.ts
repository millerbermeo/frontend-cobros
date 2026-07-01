export type EstadoSolicitud = 'pendiente' | 'validacion' | 'aprobado' | 'rechazado'

export type TipoCredito = 'efectivo' | 'tarjeta' | 'pignoracion' | 'libranza'

export interface Solicitud {
  id: string
  cliente: string
  tipo: TipoCredito
  monto: number
  tasa: number
  plazo: number
  garantia?: string
  fecha: string
  estado: EstadoSolicitud
}
