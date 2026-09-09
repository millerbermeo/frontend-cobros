/**
 * Dimensiones compartidas entre Navbar y Sidebar.
 * Centralizadas para que la barra superior y el header del sidebar
 * mantengan siempre la misma altura en todos los breakpoints.
 */

/** Alto de la barra superior y del bloque de logo del sidebar. */
export const HEADER_HEIGHT = 'h-14 md:h-16 3xl:h-20'

/** Padding horizontal de navbar y contenido principal. */
export const CONTENT_PADDING_X = 'px-3 sm:px-4 md:px-6 3xl:px-8 4xl:px-10'

/** Ancho máximo del contenido para evitar líneas kilométricas en 27"–32". */
export const CONTENT_MAX_WIDTH = 'mx-auto w-full max-w-[1400px] 3xl:max-w-[1720px] 4xl:max-w-[2100px]'

/** Ancho del sidebar de escritorio según estado y breakpoint. */
export const SIDEBAR_WIDTH = {
  expanded: 'w-sidebar xl:w-sidebar-lg 3xl:w-sidebar-xl',
  collapsed: 'w-sidebar-collapsed 3xl:w-sidebar-collapsed-lg',
} as const

/** Breakpoint a partir del cual el sidebar deja de ser drawer. */
export const DESKTOP_QUERY = '(min-width: 768px)'

/** Entre 768px y 1279px el sidebar arranca colapsado para no comerse el ancho. */
export const COMPACT_QUERY = '(min-width: 768px) and (max-width: 1279px)'
