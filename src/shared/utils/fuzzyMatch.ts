const DIACRITICS_PATTERN = /[̀-ͯ]/g

function normalize(value: string): string {
  return value.normalize('NFD').replace(DIACRITICS_PATTERN, '').toLowerCase()
}

/**
 * Coincidencia por subsecuencia (los caracteres de `query` deben aparecer
 * en orden dentro de `target`, no necesariamente contiguos).
 * Retorna un score de relevancia o null si no hay coincidencia.
 */
export function fuzzyMatch(query: string, target: string): number | null {
  const q = normalize(query.trim())
  const t = normalize(target)
  if (!q) return 0

  let score = 0
  let queryIndex = 0
  let prevMatchIndex = -1
  let consecutiveBonus = 0

  for (let i = 0; i < t.length && queryIndex < q.length; i++) {
    if (t[i] !== q[queryIndex]) continue

    consecutiveBonus = prevMatchIndex === i - 1 ? consecutiveBonus + 5 : 0
    const isWordStart = i === 0 || t[i - 1] === ' '
    score += 10 + consecutiveBonus + (isWordStart ? 8 : 0)
    prevMatchIndex = i
    queryIndex++
  }

  return queryIndex === q.length ? score : null
}
