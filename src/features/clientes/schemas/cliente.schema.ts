import { z } from 'zod'

const MAX_FILE_MB = 5

const telefonoSchema = z
  .string()
  .min(1, 'El teléfono es obligatorio')
  .regex(/^[+]?\d{7,15}$/, 'Teléfono inválido: 7 a 15 dígitos (opcional +)')

export const clienteSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  document: z
    .string()
    .min(1, 'El documento es obligatorio')
    .regex(/^\d+$/, 'El documento solo puede contener números')
    .min(5, 'El documento debe tener al menos 5 dígitos'),
  address: z
    .string()
    .min(1, 'La dirección es obligatoria')
    .min(5, 'La dirección debe tener al menos 5 caracteres'),
  phone: telefonoSchema,
  email: z.email('Correo electrónico inválido').optional().or(z.literal('')),
  recommended: z.string().optional().or(z.literal('')),
  additional_phone: z
    .string()
    .regex(/^[+]?\d{7,15}$/, 'Teléfono inválido: 7 a 15 dígitos (opcional +)')
    .optional()
    .or(z.literal('')),
  type_work: z
    .string()
    .min(1, 'El tipo de trabajo es obligatorio')
    .min(3, 'Debe tener al menos 3 caracteres'),
  employing_entity: z
    .string()
    .min(1, 'La entidad es obligatoria')
    .min(3, 'Debe tener al menos 3 caracteres'),
  source_of_income: z.string().optional().or(z.literal('')),
  url_source_of_income: z
    .any()
    .refine((v) => v instanceof FileList && v.length > 0, 'Debes adjuntar el soporte de ingresos')
    .refine(
      (v) => !(v instanceof FileList) || v.length === 0 || v[0].size <= MAX_FILE_MB * 1024 * 1024,
      `El archivo no puede superar ${MAX_FILE_MB}MB`,
    ),
})

export type ClienteFormValues = z.infer<typeof clienteSchema>

/** En edición el archivo es opcional: si no se sube uno nuevo se conserva el anterior. */
export const clienteEditSchema = clienteSchema.extend({
  url_source_of_income: z
    .any()
    .optional()
    .refine(
      (v) => !(v instanceof FileList) || v.length === 0 || v[0].size <= MAX_FILE_MB * 1024 * 1024,
      `El archivo no puede superar ${MAX_FILE_MB}MB`,
    ),
})
