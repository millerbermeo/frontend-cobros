import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { COMPACT_QUERY, DESKTOP_QUERY } from '../layout.constants'

interface UseSidebarStateOptions {
  mobileOpen: boolean
  onMobileClose: () => void
}

/**
 * Estado responsive del sidebar:
 * - por defecto colapsado en tablet/laptop chico (768–1279px), expandido en ≥1280px
 * - el toggle manual del usuario manda hasta que se cruza ese breakpoint
 * - cierra el drawer móvil si la pantalla crece hasta escritorio
 */
export function useSidebarState({ mobileOpen, onMobileClose }: UseSidebarStateOptions) {
  const isCompact = useMediaQuery(COMPACT_QUERY)
  const isDesktop = useMediaQuery(DESKTOP_QUERY)

  // null = seguir el valor por defecto del breakpoint actual
  const [override, setOverride] = useState<boolean | null>(null)
  const [prevCompact, setPrevCompact] = useState(isCompact)

  // Ajuste de estado durante el render: al cambiar de breakpoint se descarta
  // la preferencia manual y se vuelve al valor por defecto.
  if (prevCompact !== isCompact) {
    setPrevCompact(isCompact)
    setOverride(null)
  }

  const expanded = override ?? !isCompact

  useEffect(() => {
    if (isDesktop && mobileOpen) onMobileClose()
  }, [isDesktop, mobileOpen, onMobileClose])

  return {
    expanded,
    toggle: () => setOverride(!expanded),
  }
}
