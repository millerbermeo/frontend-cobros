import { z } from 'zod'

const numericPositive = (msg: string) =>
  z.string().min(1, msg).refine((v) => Number(v) > 0, msg)

export const tasaPlazoSchema = z.object({
  rate: numericPositive('La tasa debe ser mayor a 0'),
  term: numericPositive('El plazo debe ser mayor a 0'),
})

export type TasaPlazoValues = z.infer<typeof tasaPlazoSchema>

const MAX_FILE_MB = 5

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

export const docsAprobacionSchema = z.object({
  archive_1: requiredFile('El primer documento es obligatorio'),
  archive_2: optionalFile(),
  archive_3: optionalFile(),
})

export type DocsAprobacionValues = z.infer<typeof docsAprobacionSchema>
