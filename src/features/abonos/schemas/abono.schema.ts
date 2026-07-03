import { z } from 'zod'

export const TIPO_ABONO_OPTIONS = [
  { label: 'Solo Interés', value: 'interes' },
  { label: 'Solo Capital', value: 'capital' },
  { label: 'Interés y Capital', value: 'ambos' },
] as const

export const abonoSchema = z.object({
  tipo: z.enum(['interes', 'capital', 'ambos'], { message: 'Selecciona el tipo' }),
  monto: z.string().min(1, 'El monto es requerido').refine((v) => Number(v) > 0, 'El monto debe ser mayor a 0'),
  notas: z.string().optional(),
})

export type AbonoFormValues = z.infer<typeof abonoSchema>
