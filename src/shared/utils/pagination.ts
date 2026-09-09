export const DOTS = 'dots' as const

export type PageItem = number | typeof DOTS

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

/**
 * Construye la lista de páginas visibles con elipsis.
 * Ej: current=6, total=20, siblings=1 → [1, dots, 5, 6, 7, dots, 20]
 */
export function getPageItems(current: number, total: number, siblings = 1): PageItem[] {
  // primera + última + actual + hermanos + 2 elipsis
  const maxVisible = siblings * 2 + 5

  if (total <= maxVisible) return range(1, total)

  const left = Math.max(current - siblings, 1)
  const right = Math.min(current + siblings, total)
  const showLeftDots = left > 2
  const showRightDots = right < total - 1

  if (!showLeftDots && showRightDots) {
    return [...range(1, siblings * 2 + 3), DOTS, total]
  }

  if (showLeftDots && !showRightDots) {
    return [1, DOTS, ...range(total - (siblings * 2 + 2), total)]
  }

  return [1, DOTS, ...range(left, right), DOTS, total]
}
