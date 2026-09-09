import { useTheme } from '@/shared/hooks/useTheme'
import { cn } from '@/shared/utils/cn'
import { SIDEBAR_WIDTH } from './layout.constants'
import { SidebarContent } from './sidebar/SidebarContent'
import { SIDEBAR_GRADIENT } from './sidebar/nav-items'
import { useSidebarState } from './sidebar/useSidebarState'

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const { expanded, toggle } = useSidebarState({ mobileOpen, onMobileClose })
  const { isDark } = useTheme()

  const gradientStyle = !isDark ? { background: SIDEBAR_GRADIENT } : undefined

  return (
    <>
      {/* Escritorio / tablet */}
      <aside
        className={cn(
          'hidden md:flex flex-col bg-card border-r border-border shrink-0 overflow-hidden z-20',
          'transition-[width] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]',
          expanded ? SIDEBAR_WIDTH.expanded : SIDEBAR_WIDTH.collapsed
        )}
        style={gradientStyle}
      >
        <SidebarContent
          collapsed={!expanded}
          showToggle
          expanded={expanded}
          onToggle={toggle}
        />
      </aside>

      {/* Backdrop móvil */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onMobileClose}
      />

      {/* Drawer móvil */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full z-50 md:hidden shadow-2xl bg-card border-r border-border',
          'w-[82vw] max-w-72 min-w-[15rem]',
          'transition-transform duration-250 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={gradientStyle}
      >
        <SidebarContent collapsed={false} onNav={onMobileClose} onClose={onMobileClose} />
      </aside>
    </>
  )
}
