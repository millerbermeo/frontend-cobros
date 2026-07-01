import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from '@heroui/react'
import type { IconType } from 'react-icons'
import {
  MdClose,
  MdDashboard,
  MdPeople,
  MdAssignment,
  MdCheckCircle,
  MdDescription,
  MdAccountBalance,
  MdReportProblem,
  MdPayment,
  MdCallMade,
  MdBarChart,
  MdSettings,
  MdChevronLeft,
  MdAccountBalanceWallet,
} from 'react-icons/md'
import { useTheme } from '@/shared/hooks/useTheme'
import { useUserModules } from '@/features/auth/hooks/useAuth'
import { cn } from '@/shared/utils/cn'

interface NavItemConfig {
  label: string
  icon: IconType
  path: string
  moduleKey: string
  end?: boolean
}

const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Dashboard',              icon: MdDashboard,         path: '/',             moduleKey: 'Dashboard',               end: true },
  { label: 'Clientes',               icon: MdPeople,            path: '/clientes',     moduleKey: 'Clientes'               },
  { label: 'Solicitudes de Crédito', icon: MdAssignment,        path: '/solicitudes',  moduleKey: 'Solicitudes de Crédito' },
  { label: 'Aprobaciones',           icon: MdCheckCircle,       path: '/aprobaciones', moduleKey: 'Aprobaciones'           },
  { label: 'Contratos',              icon: MdDescription,       path: '/contratos',    moduleKey: 'Contratos'              },
  { label: 'Cobranza',               icon: MdAccountBalance,    path: '/cobranza',     moduleKey: 'Cobranza'               },
  { label: 'Clientes en Mora',       icon: MdReportProblem,     path: '/clientes-mora',moduleKey: 'Clientes en Mora'       },
  { label: 'Abonos',                 icon: MdPayment,           path: '/abonos',       moduleKey: 'Abonos'                 },
  { label: 'Retiros',                icon: MdCallMade,          path: '/retiros',      moduleKey: 'Retiros'                },
  { label: 'Reportes',               icon: MdBarChart,          path: '/reportes',     moduleKey: 'Reportes'               },
  { label: 'Configuración',          icon: MdSettings,          path: '/configuracion',moduleKey: 'Configuración'          },
]

const SIDEBAR_GRADIENT = 'linear-gradient(145deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)'

interface NavItemProps {
  item: NavItemConfig
  collapsed: boolean
  onNav?: () => void
}

function NavItem({ item, collapsed, onNav }: NavItemProps) {
  const { label, icon: Icon, path, end } = item

  const link = (
    <NavLink
      to={path}
      end={end}
      onClick={onNav}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl transition-all duration-150 select-none outline-none overflow-hidden',
          collapsed ? 'h-10 w-10 justify-center' : 'h-10 px-3 w-full',
          isActive
            ? 'bg-white/25 text-white shadow-sm'
            : 'text-white/70 hover:bg-white/15 hover:text-white'
        )
      }
    >
      <Icon className="w-4.5 h-4.5 shrink-0" />
      {!collapsed && (
        <span className="text-sm font-medium truncate whitespace-nowrap">
          {label}
        </span>
      )}
    </NavLink>
  )

  if (collapsed) {
    return (
      <li className="flex justify-center">
        <Tooltip delay={300}>
          <Tooltip.Trigger>{link}</Tooltip.Trigger>
          <Tooltip.Content placement="right" showArrow>
            {label}
          </Tooltip.Content>
        </Tooltip>
      </li>
    )
  }

  return <li className="flex justify-center">{link}</li>
}

interface SidebarContentProps {
  collapsed: boolean
  onNav?: () => void
  showToggle?: boolean
  expanded?: boolean
  onToggle?: () => void
  onClose?: () => void
}

function SidebarContent({ collapsed, onNav, showToggle, expanded, onToggle, onClose }: SidebarContentProps) {
  const modules = useUserModules()
  const visibleItems = modules.length > 0
    ? NAV_ITEMS.filter((item) => modules.includes(item.moduleKey))
    : NAV_ITEMS

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          'h-16 flex items-center border-b border-white/20 shrink-0 overflow-hidden',
          collapsed ? 'justify-center px-0' : 'px-4 gap-3'
        )}
      >
        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
          <MdAccountBalanceWallet className="w-4.5 h-4.5 text-white" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold text-white whitespace-nowrap flex-1">
            Cobros
          </span>
        )}
        {onClose && !collapsed && (
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 transition-colors shrink-0"
          >
            <MdClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        <ul className={cn('space-y-0.5', collapsed ? 'px-0' : 'px-3')}>
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
            className="w-full h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white/80"
          >
            <MdChevronLeft
              className={cn(
                'w-5 h-5 transition-transform duration-200',
                !expanded && 'rotate-180'
              )}
            />
          </button>
        </div>
      )}
    </div>
  )
}

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [desktopExpanded, setDesktopExpanded] = useState(true)
  const { isDark } = useTheme()

  const gradientStyle = !isDark ? { background: SIDEBAR_GRADIENT } : undefined

  return (
    <>
      {/* Desktop */}
      <aside
        className="hidden md:flex flex-col bg-card border-r border-border shrink-0 overflow-hidden z-20"
        style={{
          width: desktopExpanded ? 260 : 72,
          transition: 'width 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          ...gradientStyle,
        }}
      >
        <SidebarContent
          collapsed={!desktopExpanded}
          showToggle
          expanded={desktopExpanded}
          onToggle={() => setDesktopExpanded((v) => !v)}
        />
      </aside>

      {/* Mobile backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden',
          'transition-opacity duration-200',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onMobileClose}
      />

      {/* Mobile drawer */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-72 bg-card border-r border-border z-50 md:hidden shadow-2xl',
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
