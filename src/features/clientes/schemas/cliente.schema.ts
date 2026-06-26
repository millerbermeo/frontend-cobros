import { z } from 'zod'

const MAX_FILE_MB = 5

const telefonoSchema = z
  .string()
  .regex(/^[+]?\d{7,15}$/, 'Debe tener entre 7 y 15 dígitos')

export const clienteSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  document: z
    .string()
    .min(1, 'Requerido')
    .regex(/^\d+$/, 'Solo se permiten números'),
  address: z.string().min(3, 'Mínimo 3 caracteres'),
  phone: telefonoSchema,
  email: z.email('Correo inválido').optional().or(z.literal('')),
  recommended: z.string().optional().or(z.literal('')),
  additional_phone: telefonoSchema.optional().or(z.literal('')),
  type_work: z.string().min(2, 'Mínimo 2 caracteres'),
  employing_entity: z.string().min(2, 'Mínimo 2 caracteres'),
  source_of_income: z.string().optional().or(z.literal('')),
  url_source_of_income: z
    .any()
    .refine((v) => v instanceof FileList && v.length > 0, 'Adjunta el soporte de ingresos')
    .refine(
      (v) => !(v instanceof FileList) || v.length === 0 || v[0].size <= MAX_FILE_MB * 1024 * 1024,
      `El archivo supera ${MAX_FILE_MB}MB`,
    ),
})

export type ClienteFormValues = z.infer<typeof clienteSchema>
