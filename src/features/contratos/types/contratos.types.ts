export type EstadoContrato = 'firmado' | 'pendiente' | 'generado'

export interface Contrato {
  id: string
  numero: number
  cliente: string
  monto: number
  tasa: number
  plazo: number
  fechaFirma: string
  estado: EstadoContrato
}
