import type { SelectOption } from '@/shared/components/forms'
import type { RetiroRegistro } from '../types/retiros.types'

export const CLIENTE_OPTIONS: SelectOption[] = [
  { label: 'Ana Martínez Silva',    value: 'Ana Martínez Silva' },
  { label: 'María González Pérez',  value: 'María González Pérez' },
  { label: 'Carlos Ramírez López',  value: 'Carlos Ramírez López' },
  { label: 'Roberto Díaz Moreno',   value: 'Roberto Díaz Moreno' },
]

export const MOCK_RETIROS: RetiroRegistro[] = [
  { id: 'r1', cliente: 'Ana Martínez Silva',   fecha: '2026-03-24', hora: '10:30', monto: 2_000_000, concepto: 'Desembolso crédito',      realizadoPor: 'Ana Martínez Silva',   autorizadoPor: 'Mauricio' },
  { id: 'r2', cliente: 'María González Pérez', fecha: '2026-03-22', hora: '14:15', monto: 1_500_000, concepto: 'Retiro para gastos personales', realizadoPor: 'María González Pérez', autorizadoPor: 'Mauricio' },
  { id: 'r3', cliente: 'Carlos Ramírez López', fecha: '2026-03-20', hora: '09:00', monto: 800_000,   concepto: 'Desembolso urgente',       realizadoPor: 'Carlos Ramírez López', autorizadoPor: 'Mauricio' },
  { id: 'r4', cliente: 'Roberto Díaz Moreno',  fecha: '2026-03-18', hora: '16:45', monto: 1_200_000, concepto: 'Retiro para pago de servicios', realizadoPor: 'Roberto Díaz Moreno',  autorizadoPor: 'Mauricio' },
]
