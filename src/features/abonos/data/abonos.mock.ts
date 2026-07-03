import type { AbonoRegistro } from '../types/abonos.types'

export const MOCK_ABONOS: AbonoRegistro[] = [
  { id: 'ab1',  fecha: '2026-02-10', cliente: 'An1a Martínez Silva',   creditoNumero: 1, monto: 125_000, tipo: 'interes', notas: 'Pago parcial de intereses mes 1 (1/2)' },
  { id: 'ab2',  fecha: '2026-02-24', cliente: 'Ana Martínez Silva',   creditoNumero: 1, monto: 125_000, tipo: 'interes', notas: 'Pago parcial de intereses mes 1 (2/2)' },
  { id: 'ab3',  fecha: '2026-03-24', cliente: 'Ana Martínez Silva',   creditoNumero: 1, monto: 250_000, tipo: 'interes', notas: 'Pago completo de intereses mes 2' },
  { id: 'ab4',  fecha: '2026-03-25', cliente: 'Ana Martínez Silva',   creditoNumero: 1, monto: 300_000, tipo: 'capital', notas: 'Abono parcial a capital (1/2)' },
  { id: 'ab5',  fecha: '2026-03-28', cliente: 'Ana Martínez Silva',   creditoNumero: 1, monto: 200_000, tipo: 'capital', notas: 'Abono parcial a capital (2/2)' },
  { id: 'ab6',  fecha: '2026-03-15', cliente: 'María González Pérez', creditoNumero: 2, monto: 150_000, tipo: 'interes', notas: 'Pago completo de intereses mes 1' },
  { id: 'ab7',  fecha: '2026-03-20', cliente: 'María González Pérez', creditoNumero: 2, monto: 400_000, tipo: 'capital', notas: 'Abono a capital' },
  { id: 'ab8',  fecha: '2026-04-10', cliente: 'María González Pérez', creditoNumero: 2, monto: 400_000, tipo: 'capital', notas: 'Segundo abono a capital' },
  { id: 'ab9',  fecha: '2026-02-20', cliente: 'Carlos Ramírez López', creditoNumero: 3, monto: 70_000,  tipo: 'interes', notas: 'Pago parcial de intereses (1/2)' },
  { id: 'ab10', fecha: '2026-03-05', cliente: 'Carlos Ramírez López', creditoNumero: 3, monto: 70_000,  tipo: 'interes', notas: 'Pago parcial de intereses (2/2)' },
  { id: 'ab11', fecha: '2026-03-18', cliente: 'Carlos Ramírez López', creditoNumero: 3, monto: 500_000, tipo: 'capital', notas: 'Abono a capital' },
  { id: 'ab12', fecha: '2026-03-10', cliente: 'Roberto Díaz Moreno',  creditoNumero: 4, monto: 330_000, tipo: 'interes', notas: 'Pago completo de intereses mes 1' },
  { id: 'ab13', fecha: '2026-03-22', cliente: 'Roberto Díaz Moreno',  creditoNumero: 4, monto: 700_000, tipo: 'capital', notas: 'Abono a capital' },
  { id: 'ab14', fecha: '2026-03-12', cliente: 'Laura Fernández Castro', creditoNumero: 5, monto: 200_000, tipo: 'interes', notas: 'Pago parcial de intereses' },
  { id: 'ab15', fecha: '2026-02-25', cliente: 'Pedro Sánchez Ortiz',  creditoNumero: 6, monto: 132_000, tipo: 'interes', notas: 'Pago parcial de intereses' },
  { id: 'ab16', fecha: '2026-03-08', cliente: 'Pedro Sánchez Ortiz',  creditoNumero: 6, monto: 200_000, tipo: 'interes', notas: 'Segundo pago de intereses' },
]
