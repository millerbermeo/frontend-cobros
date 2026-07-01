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

export type EstadoCreditoAbono = 'activo' | 'mora'
export type TipoAbono = 'interes' | 'capital'

export interface CreditoAbono {
  id: string
  numero: number
  cliente: string
  montoOriginal: number
  saldoCapital: number
  interesesPendientes: number
  tasa: number
  fechaCorte: string
  estado: EstadoCreditoAbono
}

export interface AbonoRegistro {
  id: string
  fecha: string
  cliente: string
  creditoNumero: number
  monto: number
  tipo: TipoAbono
  notas: string
}
