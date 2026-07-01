import type { SelectOption } from '@/shared/components/forms'
import type { Solicitud } from '../types/solicitudes.types'

export const CLIENTE_OPTIONS: SelectOption[] = [
  { label: 'María González Pérez', value: 'María González Pérez' },
  { label: 'Carlos Ramírez López',  value: 'Carlos Ramírez López' },
  { label: 'Ana Martínez Silva',    value: 'Ana Martínez Silva' },
  { label: 'Jorge Herrera Díaz',    value: 'Jorge Herrera Díaz' },
  { label: 'Lucía Torres Vargas',   value: 'Lucía Torres Vargas' },
]

export const MOCK_SOLICITUDES: Solicitud[] = [
  { id: 's1', cliente: 'María González Pérez', tipo: 'tarjeta',     monto: 5_000_000,  tasa: 3.5, plazo: 12, fecha: '2026-03-20', estado: 'pendiente' },
  { id: 's2', cliente: 'Carlos Ramírez López', tipo: 'efectivo',    monto: 3_000_000,  tasa: 3,   plazo: 6,  fecha: '2026-03-22', estado: 'validacion' },
  { id: 's3', cliente: 'Ana Martínez Silva',   tipo: 'pignoracion', monto: 10_000_000, tasa: 2.5, plazo: 24, fecha: '2026-03-18', estado: 'aprobado' },
]
