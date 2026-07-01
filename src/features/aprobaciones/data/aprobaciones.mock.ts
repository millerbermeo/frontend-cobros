import type { Aprobacion } from '../types/aprobaciones.types'

export const APPROVAL_STEPS = [
  'Validación de documentos',
  'Definición de tasa',
  'Envío al abogado',
  'Aprobación final',
  'Firma de documentos',
] as const

export const MOCK_APROBACIONES: Aprobacion[] = [
  { id: 'a1', cliente: 'María González Pérez', monto: 5_000_000,  plazo: 12, tasa: 3.5, completados: 1, estado: 'pendiente' },
  { id: 'a2', cliente: 'Carlos Ramírez López', monto: 3_000_000,  plazo: 6,  tasa: 3,   completados: 2, estado: 'validacion' },
  { id: 'a3', cliente: 'Ana Martínez Silva',   monto: 10_000_000, plazo: 24, tasa: 2.5, completados: 4, estado: 'validacion' },
]
