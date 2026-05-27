export type EstadoContrato = 'activo' | 'finalizado' | 'cancelado' | 'moroso'

export interface Contrato {
  id: string
  solicitudId: string
  clienteId: string
  monto: number
  plazo: number
  tasaInteres: number
  cuotaMensual: number
  estado: EstadoContrato
  fechaInicio: string
  fechaFin: string
  createdAt: string
}
