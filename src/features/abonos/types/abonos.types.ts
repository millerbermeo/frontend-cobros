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

export type TipoAbono = 'interes' | 'capital'

/** Crédito activo tal cual lo devuelve el backend (GET /list/payments.php) */
export interface CreditoActivo {
  id: number
  nombre: string
  document: string
  id_sol_credi: number
  original_amount: number
  outstanding_principal: number
  rate: string
  term: number
  cutoff_date: string
  outstanding_interest: number
  state: string
}

export interface CreditosActivosParams {
  id?: string
  name?: string
  document?: string
}

export interface CreditosActivosResponse {
  success: boolean
  total: number
  data: CreditoActivo[]
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
