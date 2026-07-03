/**
 * Formatea fechas del backend para mostrar.
 * "2026-07-02 21:54:28" → "2026-07-02 21:54"; "2026-07-20" → "2026-07-20".
 */
export function formatFecha(raw: string | null | undefined): string {
  if (!raw) return '—'
  const [date, time] = raw.split(' ')
  // El backend usa "0000-00-00" para fechas vacías.
  if (!date || date.startsWith('0000')) return '—'
  return time ? `${date} ${time.slice(0, 5)}` : date
}
