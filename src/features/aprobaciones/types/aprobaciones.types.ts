export type EstadoAprobacion = 'pendiente' | 'validacion' | 'aprobado' | 'rechazado'

export interface Aprobacion {
  id: string
  cliente: string
  monto: number
  plazo: number
  tasa: number
  /** Cantidad de pasos completados (0..STEPS.length). */
  completados: number
  estado: EstadoAprobacion
}
