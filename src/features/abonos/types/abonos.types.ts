export interface Abono {
  id: string
  contratoId: string
  clienteId: string
  monto: number
  fecha: string
  metodoPago: string
  referencia?: string
  observacion?: string
  createdAt: string
}
