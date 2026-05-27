import { z } from 'zod'

export const createUsuarioSchema = z
  .object({
    nombre:          z.string().min(2, 'Mínimo 2 caracteres'),
    username:        z.string().min(3, 'Mínimo 3 caracteres').optional().or(z.literal('')),
    email:           z.email('Correo inválido'),
    rol:             z.enum(['admin', 'cobrador', 'supervisor', 'auditor'], { message: 'Selecciona un rol' }),
    password:        z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export const editUsuarioSchema = z.object({
  nombre:   z.string().min(2, 'Mínimo 2 caracteres'),
  username: z.string().min(3, 'Mínimo 3 caracteres').optional().or(z.literal('')),
  email:    z.email('Correo inválido'),
  rol:      z.enum(['admin', 'cobrador', 'supervisor', 'auditor']),
  estado:   z.enum(['activo', 'inactivo']),
})

export type CreateUsuarioValues = z.infer<typeof createUsuarioSchema>
export type EditUsuarioValues   = z.infer<typeof editUsuarioSchema>
