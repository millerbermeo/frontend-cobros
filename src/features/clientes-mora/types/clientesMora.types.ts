export type NivelMora = 'leve' | 'moderada' | 'grave' | 'critica'

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

export interface ClienteMoraRow {
  id: string
  nombre: string
  cedula: string
  telefono: string
  diasMora: number
  nivel: NivelMora
  capital: number
  interesesColgados: number
  interesesGenerados: number
  deudaTotal: number
}
