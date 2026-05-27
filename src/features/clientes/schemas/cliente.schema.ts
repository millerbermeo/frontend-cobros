import { z } from 'zod'

const telefonoSchema = z
  .string()
  .regex(/^\d{7,15}$/, 'Debe tener entre 7 y 15 dígitos')

export const clienteSchema = z.object({
  nombre: z.string().min(2, 'Mínimo 2 caracteres'),
  apellidos: z.string().min(2, 'Mínimo 2 caracteres'),
  tipoIdentificacion: z.enum(['cedula', 'cedula_extranjeria', 'pasaporte', 'nit', 'tarjeta_identidad'], {
    message: 'Selecciona un tipo de identificación',
  }),
  numeroIdentificacion: z
    .string()
    .min(1, 'Requerido')
    .regex(/^\d+$/, 'Solo se permiten números'),
  direccion: z.string().min(3, 'Mínimo 3 caracteres'),
  telefono: telefonoSchema,
  correo: z.string().email('Correo inválido').optional().or(z.literal('')),
  recomendadoPor: z.string().optional(),
  telefonoAdicional: telefonoSchema.optional().or(z.literal('')),
  tipoTrabajo: z.string().min(2, 'Mínimo 2 caracteres'),
  entidadTrabajo: z.string().min(2, 'Mínimo 2 caracteres'),
  fuenteIngresos: z.string().optional(),
})

export type ClienteFormValues = z.infer<typeof clienteSchema>
