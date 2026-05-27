export type EstadoAprobacion = 'pendiente' | 'aprobada' | 'rechazada'

export interface Aprobacion {
  id: string
  solicitudId: string
  revisadoPor: string
  estado: EstadoAprobacion
  comentario?: string
  fechaRevision: string
  createdAt: string
}
