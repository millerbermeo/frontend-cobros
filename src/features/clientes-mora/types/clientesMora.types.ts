export type NivelMora = 'leve' | 'moderada' | 'critica'

export interface ClienteMora {
  id: string
  clienteId: string
  nombre: string
  documento: string
  telefono?: string
  creditoId: string
  montoVencido: number
  diasMora: number
  nivel: NivelMora
  ultimoPago?: string
  fechaVencimiento: string
  createdAt: string
}
