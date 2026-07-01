import type { CreditoCobranza } from '../types/cobranza.types'

export const MOCK_COBRANZA: CreditoCobranza[] = [
  { id: 'k1', numero: 1, cliente: 'Ana Martínez Silva',    saldoCapital: 9_500_000,  montoOriginal: 10_000_000, intereses: 460_000, fechaCorte: '2026-04-24', estado: 'activo' },
  { id: 'k2', numero: 2, cliente: 'María González Pérez',  saldoCapital: 4_200_000,  montoOriginal: 5_000_000,  intereses: 500_000, fechaCorte: '2026-04-15', estado: 'mora', moraDias: 52 },
  { id: 'k3', numero: 3, cliente: 'Carlos Ramírez López',  saldoCapital: 7_000_000,  montoOriginal: 8_000_000,  intereses: 730_000, fechaCorte: '2026-04-20', estado: 'mora', moraDias: 47 },
  { id: 'k4', numero: 4, cliente: 'Roberto Díaz Moreno',   saldoCapital: 13_500_000, montoOriginal: 15_000_000, intereses: 710_000, fechaCorte: '2026-04-25', estado: 'activo' },
  { id: 'k5', numero: 5, cliente: 'Laura Fernández Castro', saldoCapital: 5_800_000, montoOriginal: 6_000_000,  intereses: 832_400, fechaCorte: '2026-03-12', estado: 'mora', moraDias: 86 },
  { id: 'k6', numero: 6, cliente: 'Pedro Sánchez Ortiz',   saldoCapital: 3_500_000,  montoOriginal: 3_500_000,  intereses: 532_000, fechaCorte: '2026-02-20', estado: 'mora', moraDias: 107 },
]
