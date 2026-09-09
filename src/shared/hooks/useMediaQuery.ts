import { useCallback, useSyncExternalStore } from 'react'

/**
 * Suscribe un componente a una media query CSS.
 * Usa useSyncExternalStore para evitar setState dentro de efectos.
 * Devuelve `false` en entornos sin `matchMedia` (SSR).
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query]
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
