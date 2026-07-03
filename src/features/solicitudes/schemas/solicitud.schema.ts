import { z } from 'zod'

const MAX_FILE_MB = 5

export const ESTADO_OPTIONS = [
  { label: 'Pendiente',  value: 'Pendiente' },
  { label: 'Validación', value: 'Validación' },
  { label: 'Aprobado',   value: 'Aprobado' },
  { label: 'Rechazado',  value: 'Rechazado' },
] as const

export const TIPO_CREDITO_OPTIONS = [
  { label: 'Préstamo con tarjeta',                 value: 'Préstamo con tarjeta' },
  { label: 'Préstamo con pignoración (moto/carro)', value: 'Préstamo con pignoración (moto/carro)' },
  { label: 'Préstamo hipotecario (bien inmueble)',  value: 'Préstamo hipotecario (bien inmueble)' },
  { label: 'Préstamo en efectivo',                 value: 'Préstamo en efectivo' },
] as const

const numericPositive = (msg: string) =>
  z.string().min(1, msg).refine((v) => Number(v) > 0, msg)

const requiredFile = (msg: string) =>
  z
    .any()
    .refine((v) => v instanceof FileList && v.length > 0, msg)
    .refine(
      (v) => !(v instanceof FileList) || v.length === 0 || v[0].size <= MAX_FILE_MB * 1024 * 1024,
      `El archivo no puede superar ${MAX_FILE_MB}MB`,
    )

const optionalFile = () =>
  z
    .any()
    .optional()
    .refine(
      (v) => !(v instanceof FileList) || v.length === 0 || v[0].size <= MAX_FILE_MB * 1024 * 1024,
      `El archivo no puede superar ${MAX_FILE_MB}MB`,
    )

export const solicitudSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  document: z
    .string()
    .min(1, 'El documento es obligatorio')
    .regex(/^\d+$/, 'Solo números')
    .min(5, 'Mínimo 5 dígitos'),
  type_credit: z.string().min(1, 'Selecciona el tipo de crédito'),
  requested_amount: numericPositive('El monto debe ser mayor a 0'),
  rate: numericPositive('La tasa debe ser mayor a 0'),
  term: numericPositive('El plazo debe ser mayor a 0'),
  warranty: z.string().optional().or(z.literal('')),
  cutoff_date: z.string().optional().or(z.literal('')),
  state: z.string().min(1, 'Selecciona el estado'),
  archive_document: requiredFile('Adjunta el documento de identidad'),
  archive_payment_stub: requiredFile('Adjunta el desprendible de pago'),
  archive_other: requiredFile('Adjunta el documento adicional'),
})

export type SolicitudFormValues = z.infer<typeof solicitudSchema>

/** En edición los archivos son opcionales: si no se suben, se conservan los anteriores. */
export const solicitudEditSchema = solicitudSchema.extend({
  archive_document: optionalFile(),
  archive_payment_stub: optionalFile(),
  archive_other: optionalFile(),
})
