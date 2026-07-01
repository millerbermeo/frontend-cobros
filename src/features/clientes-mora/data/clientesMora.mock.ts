import type { ClienteMoraRow, NivelMora } from '../types/clientesMora.types'

export const NIVEL_LEGEND: { nivel: NivelMora; label: string; dot: string }[] = [
  { nivel: 'leve',     label: 'Leve (1-30 días)',    dot: 'bg-amber-400' },
  { nivel: 'moderada', label: 'Moderada (31-60 días)', dot: 'bg-orange-500' },
  { nivel: 'grave',    label: 'Grave (61-90 días)',   dot: 'bg-rose-500' },
  { nivel: 'critica',  label: 'Crítica (+90 días)',   dot: 'bg-red-700' },
]

export const NIVEL_OPTIONS = [
  { label: 'Todos los niveles', value: '' },
  { label: 'Leve',     value: 'leve' },
  { label: 'Moderada', value: 'moderada' },
  { label: 'Grave',    value: 'grave' },
  { label: 'Crítica',  value: 'critica' },
] as const

export const MOCK_MORA: ClienteMoraRow[] = [
  { id: 'm1', nombre: 'Pedro Sánchez Ortiz',   cedula: '1112223334', telefono: '3187776655', diasMora: 107, nivel: 'critica',  capital: 3_500_000, interesesColgados: 532_000, interesesGenerados: 532_000, deudaTotal: 4_032_000 },
  { id: 'm2', nombre: 'Laura Fernández Castro', cedula: '4445556667', telefono: '3165554433', diasMora: 86,  nivel: 'grave',    capital: 5_800_000, interesesColgados: 550_400, interesesGenerados: 742_400, deudaTotal: 6_350_400 },
  { id: 'm3', nombre: 'María González Pérez',  cedula: '1234567890', telefono: '3101234567', diasMora: 52,  nivel: 'moderada', capital: 4_200_000, interesesColgados: 270_000, interesesGenerados: 420_000, deudaTotal: 4_470_000 },
  { id: 'm4', nombre: 'Carlos Ramírez López',  cedula: '9876543210', telefono: '3157654321', diasMora: 47,  nivel: 'moderada', capital: 7_000_000, interesesColgados: 420_000, interesesGenerados: 560_000, deudaTotal: 7_420_000 },
]
