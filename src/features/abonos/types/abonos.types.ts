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

export type TipoAbono = 'interes' | 'capital' | 'ambos'

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

/** Retiro disponible tal cual lo devuelve el backend (GET /list/credit_withdrawals.php) */
export interface RetiroDisponible {
  id: number
  name: string
  document: string
  withdrawal_date: string
  withdrawal_hour: string
  amount: number
  concept: string
  authorized_by: string
  withdrawn_by: string
  registration_date: string
  state: string
}

export interface CreditoConRetirosResponse {
  success: boolean
  credito: CreditoActivo
  retiros_disponibles: RetiroDisponible[]
  cantidad_retiros: number
  total_disponible: number
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
