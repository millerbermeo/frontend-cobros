import { z } from 'zod'

const tasaField = z.coerce
  .number()
  .min(0.01, 'La tasa debe ser mayor a 0%')
  .max(100, 'Máximo 100%')

export const tasasInteresSchema = z.object({
  tasaTarjeta: tasaField,
  tasaPignoracion: tasaField,
  tasaHipotecario: tasaField,
  tasaEfectivo: tasaField,
})

export type TasasInteresValues = z.infer<typeof tasasInteresSchema>

export const integracionEducacionSchema = z.object({
  urlIntegracion: z
    .string()
    .min(1, 'La URL es requerida')
    .url('Ingresa una URL válida'),
  tokenAcceso: z.string().min(1, 'El token de acceso es requerido'),
})

export type IntegracionEducacionValues = z.infer<typeof integracionEducacionSchema>
