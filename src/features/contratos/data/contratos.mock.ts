import type { Contrato } from '../types/contratos.types'

export const MOCK_CONTRATOS: Contrato[] = [
  { id: 'c1', numero: 1, cliente: 'Ana Martínez Silva',   monto: 10_000_000, tasa: 2.5, plazo: 24, fechaFirma: '2026-03-24', estado: 'firmado' },
  { id: 'c2', numero: 2, cliente: 'María González Pérez', monto: 5_000_000,  tasa: 3.5, plazo: 12, fechaFirma: '2026-03-20', estado: 'generado' },
  { id: 'c3', numero: 3, cliente: 'Carlos Ramírez López', monto: 3_000_000,  tasa: 3,   plazo: 6,  fechaFirma: '2026-03-22', estado: 'pendiente' },
]

export const DOC_INFO = [
  { term: 'Letra',  text: 'Documento comercial que obliga al deudor a pagar una suma en fecha determinada' },
  { term: 'Pagaré', text: 'Promesa incondicional de pago por parte del deudor' },
] as const

export const DOC_NOTES = [
  'Los documentos se generan automáticamente con los datos del contrato',
  'Se puede firmar de forma digital o física',
] as const
