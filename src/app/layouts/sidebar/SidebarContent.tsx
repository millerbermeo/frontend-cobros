import { MdClose, MdChevronLeft, MdAccountBalanceWallet } from 'react-icons/md'
import { useUserModules } from '@/features/auth/hooks/useAuth'
import { cn } from '@/shared/utils/cn'
import { HEADER_HEIGHT } from '../layout.constants'
import { NAV_ITEMS } from './nav-items'
import { NavItem } from './NavItem'

interface SidebarContentProps {
  collapsed: boolean
  onNav?: () => void
  showToggle?: boolean
  expanded?: boolean
  onToggle?: () => void
  onClose?: () => void
}

export function SidebarContent({
  collapsed,
  onNav,
  showToggle,
  expanded,
  onToggle,
  onClose,
}: SidebarContentProps) {
  const modules = useUserModules()
  const visibleItems = modules.length > 0
    ? NAV_ITEMS.filter((item) => modules.includes(item.moduleKey))
    : NAV_ITEMS

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          HEADER_HEIGHT,
          'flex items-center border-b border-white/20 shrink-0 overflow-hidden',
          collapsed ? 'justify-center px-0' : 'px-4 gap-3 3xl:px-5'
        )}
      >
        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0 3xl:w-10 3xl:h-10">
          <MdAccountBalanceWallet className="w-4.5 h-4.5 text-white 3xl:w-5.5 3xl:h-5.5" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold text-white whitespace-nowrap flex-1 3xl:text-lg">
            Cobros
          </span>
        )}
        {onClose && !collapsed && (
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 transition-colors shrink-0 md:hidden"
          >
            <MdClose className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden 3xl:py-4">
        <ul className={cn('space-y-0.5 3xl:space-y-1', collapsed ? 'px-0' : 'px-3 3xl:px-4')}>
          {visibleItems.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} onNav={onNav} />
          ))}
        </ul>
      </nav>

      {/* Collapse toggle */}
      {showToggle && (
        <div className="p-2 border-t border-white/20 shrink-0">
          <button
            onClick={onToggle}
            aria-label={expanded ? 'Colapsar menú' : 'Expandir menú'}
            className="w-full h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white/80 3xl:h-10"
          >
            <MdChevronLeft
              className={cn(
                'w-5 h-5 transition-transform duration-200 3xl:w-6 3xl:h-6',
                !expanded && 'rotate-180'
              )}
            />
          </button>
        </div>
      )}
    </div>
  )
}
