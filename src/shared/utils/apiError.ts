import { isAxiosError } from 'axios'

/**
 * true cuando el backend responde "no encontrado" (404 o mensaje de error).
 * Se usa para tratar los listados vacíos como resultado vacío, no como error.
 */
export function isNotFoundError(err: unknown): boolean {
  if (!isAxiosError(err)) return false
  const status = err.response?.status
  const data = err.response?.data as { error?: string; message?: string } | undefined
  const msg = data?.error ?? data?.message ?? ''
  return status === 404 || /no encontrad|not found|sin resultados/i.test(msg)
}

/** Mensaje de error legible desde una respuesta de axios. */
export function apiErrorMessage(err: unknown, fallback: string): string {
  const data = isAxiosError(err) ? (err.response?.data as { error?: string; message?: string }) : undefined
  return data?.error || data?.message || fallback
}
