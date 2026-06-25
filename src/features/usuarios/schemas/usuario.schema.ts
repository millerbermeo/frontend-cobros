import { z } from 'zod'

const ROL_VALUES = ['Administrador', 'Supervisor', 'Cobrador', 'Auditor'] as const

export const createUsuarioSchema = z.object({
  name:     z.string().min(2, 'Mínimo 2 caracteres'),
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  pass:     z.string().min(6, 'Mínimo 6 caracteres'),
  rol:      z.enum(ROL_VALUES, { message: 'Selecciona un rol' }),
  state:    z.number().int(),
})

export const editUsuarioSchema = z.object({
  name:     z.string().min(2, 'Mínimo 2 caracteres'),
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  pass:     z.string().min(6, 'Mínimo 6 caracteres').or(z.literal('')).optional(),
  rol:      z.enum(ROL_VALUES, { message: 'Selecciona un rol' }),
  state:    z.number().int(),
})

export type CreateUsuarioValues = z.infer<typeof createUsuarioSchema>
export type EditUsuarioValues   = z.infer<typeof editUsuarioSchema>
