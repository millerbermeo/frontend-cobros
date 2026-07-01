import { z } from 'zod'

export const TIPO_CREDITO_OPTIONS = [
  { label: 'Efectivo',    value: 'efectivo' },
  { label: 'Tarjeta',     value: 'tarjeta' },
  { label: 'Pignoración', value: 'pignoracion' },
  { label: 'Libranza',    value: 'libranza' },
] as const

const numericPositive = (msg: string) =>
  z.string().min(1, msg).refine((v) => Number(v) > 0, msg)

export const solicitudSchema = z.object({
  cliente: z.string().min(1, 'Selecciona un cliente'),
  tipo: z.enum(['efectivo', 'tarjeta', 'pignoracion', 'libranza'], {
    message: 'Selecciona el tipo de crédito',
  }),
  monto: numericPositive('El monto debe ser mayor a 0'),
  tasa: numericPositive('La tasa debe ser mayor a 0'),
  plazo: numericPositive('El plazo debe ser mayor a 0'),
  garantia: z.string().optional(),
})

export type SolicitudFormValues = z.infer<typeof solicitudSchema>
