import { z } from 'zod'

export const retiroSchema = z.object({
  cliente: z.string().min(1, 'Selecciona un cliente'),
  documento: z.string().min(1, 'El documento es requerido').regex(/^\d+$/, 'Solo números'),
  fecha: z.string().min(1, 'La fecha es requerida'),
  hora: z.string().min(1, 'La hora es requerida'),
  monto: z.string().min(1, 'El monto es requerido').refine((v) => Number(v) > 0, 'El monto debe ser mayor a 0'),
  concepto: z.string().min(1, 'El concepto es requerido'),
  realizadoPor: z.string().min(1, 'Indica quién realiza el retiro'),
  autorizadoPor: z.string().min(1, 'Indica quién autoriza'),
})

export type RetiroFormValues = z.infer<typeof retiroSchema>
