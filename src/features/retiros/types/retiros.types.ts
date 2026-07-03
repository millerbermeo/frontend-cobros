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

/** Respuesta de POST /create/c_withdrawal.php */
export interface WithdrawalCreateResponse {
  success: boolean
  message: string
  id: number
}

/** Retiro tal cual lo devuelve el backend (GET /list/withdrawal.php) */
export interface Withdrawal {
  id: string
  name: string
  document: string
  withdrawal_date: string
  withdrawal_hour: string
  amount: string
  concept: string
  authorized_by: string
  withdrawn_by: string
  registration_date: string
}

export interface WithdrawalsResponse {
  success: boolean
  data: Withdrawal[] | Withdrawal
}

export interface WithdrawalsParams {
  name?: string
  document?: string
}
