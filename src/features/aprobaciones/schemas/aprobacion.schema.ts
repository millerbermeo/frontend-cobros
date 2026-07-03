import { z } from 'zod'

const numericPositive = (msg: string) =>
  z.string().min(1, msg).refine((v) => Number(v) > 0, msg)

export const tasaPlazoSchema = z.object({
  rate: numericPositive('La tasa debe ser mayor a 0'),
  term: numericPositive('El plazo debe ser mayor a 0'),
})

export type TasaPlazoValues = z.infer<typeof tasaPlazoSchema>
