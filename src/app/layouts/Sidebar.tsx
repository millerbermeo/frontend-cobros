import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
          'flex items-center gap-3 rounded-xl transition-all duration-150 select-none outline-none',
          collapsed ? 'h-10 w-10 justify-center' : 'h-10 px-3 w-full',
          isActive
            ? 'bg-white/25 text-white shadow-sm'
            : 'text-white/70 hover:bg-white/15 hover:text-white'
        )
      }
    >
      <Icon className="w-[18px] h-[18px] shrink-0" />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            key="label"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.15 }}
            className="text-sm font-medium truncate whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
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
          <MdAccountBalanceWallet className="w-[18px] h-[18px] text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              key="brand"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              className="text-base font-bold text-white whitespace-nowrap flex-1"
            >
              Cobros
            </motion.span>
          )}
        </AnimatePresence>
        {onClose && !collapsed && (
          <button
            onClick={onClose}
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
            className="w-full h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white/80"
          >
            <motion.div animate={{ rotate: expanded ? 0 : 180 }} transition={{ duration: 0.2 }}>
              <MdChevronLeft className="w-5 h-5" />
            </motion.div>
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
      <motion.aside
        initial={false}
        animate={{ width: desktopExpanded ? 260 : 72 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col bg-card border-r border-border shrink-0 overflow-hidden z-20"
        style={gradientStyle}
      >
        <SidebarContent
          collapsed={!desktopExpanded}
          showToggle
          expanded={desktopExpanded}
          onToggle={() => setDesktopExpanded((v) => !v)}
        />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 h-full w-72 bg-card border-r border-border z-50 md:hidden shadow-2xl"
              style={gradientStyle}
            >
              <SidebarContent collapsed={false} onNav={onMobileClose} onClose={onMobileClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
