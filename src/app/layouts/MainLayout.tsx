import { useState } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, Button, Tooltip } from '@heroui/react'
import type { IconType } from 'react-icons'
import {
  MdMenu,
  MdClose,
  MdDarkMode,
  MdLightMode,
  MdLogout,
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
import { useCurrentUser, useLogout } from '@/features/auth/hooks/useAuth'
import { cn } from '@/shared/utils/cn'

interface NavItemConfig {
  label: string
  icon: IconType
  path: string
  end?: boolean
}

const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Dashboard', icon: MdDashboard, path: '/', end: true },
  { label: 'Clientes', icon: MdPeople, path: '/clientes' },
  { label: 'Solicitudes de Crédito', icon: MdAssignment, path: '/solicitudes' },
  { label: 'Aprobaciones', icon: MdCheckCircle, path: '/aprobaciones' },
  { label: 'Contratos', icon: MdDescription, path: '/contratos' },
  { label: 'Cobranza', icon: MdAccountBalance, path: '/cobranza' },
  { label: 'Abonos', icon: MdPayment, path: '/abonos' },
  { label: 'Retiros', icon: MdCallMade, path: '/retiros' },
  { label: 'Reportes', icon: MdBarChart, path: '/reportes' },
  { label: 'Configuración', icon: MdSettings, path: '/configuracion' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

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
          collapsed ? 'h-10 w-10 justify-center mx-auto' : 'h-10 px-3 w-full',
          isActive
            ? 'bg-primary text-white shadow-sm'
            : 'text-foreground/60 hover:bg-foreground/5 hover:text-foreground'
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
      <li>
        <Tooltip delay={300}>
          <Tooltip.Trigger>{link}</Tooltip.Trigger>
          <Tooltip.Content placement="right" showArrow>
            {label}
          </Tooltip.Content>
        </Tooltip>
      </li>
    )
  }

  return <li>{link}</li>
}

interface SidebarContentProps {
  collapsed: boolean
  onNav?: () => void
  showToggle?: boolean
  expanded?: boolean
  onToggle?: () => void
  onClose?: () => void
}

function SidebarContent({
  collapsed,
  onNav,
  showToggle,
  expanded,
  onToggle,
  onClose,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={cn(
          'h-16 flex items-center border-b border-border shrink-0 overflow-hidden',
          collapsed ? 'justify-center px-0' : 'px-4 gap-3'
        )}
      >
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
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
              className="text-base font-bold text-foreground whitespace-nowrap flex-1"
            >
              Cobros
            </motion.span>
          )}
        </AnimatePresence>
        {onClose && !collapsed && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-foreground/5 text-foreground/50 transition-colors shrink-0"
          >
            <MdClose className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        <ul className={cn('space-y-0.5', collapsed ? 'px-2' : 'px-3')}>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.path} item={item} collapsed={collapsed} onNav={onNav} />
          ))}
        </ul>
      </nav>

      {/* Desktop collapse toggle */}
      {showToggle && (
        <div className="p-2 border-t border-border shrink-0">
          <button
            onClick={onToggle}
            className="w-full h-8 flex items-center justify-center rounded-lg hover:bg-foreground/5 transition-colors text-foreground/40 hover:text-foreground/70"
          >
            <motion.div
              animate={{ rotate: expanded ? 0 : 180 }}
              transition={{ duration: 0.2 }}
            >
              <MdChevronLeft className="w-5 h-5" />
            </motion.div>
          </button>
        </div>
      )}
    </div>
  )
}

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [desktopExpanded, setDesktopExpanded] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { mutate: logout } = useLogout()
  const user = useCurrentUser()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <motion.aside
        initial={false}
        animate={{ width: desktopExpanded ? 260 : 72 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:flex flex-col bg-card border-r border-border shrink-0 overflow-hidden z-20"
      >
        <SidebarContent
          collapsed={!desktopExpanded}
          showToggle
          expanded={desktopExpanded}
          onToggle={() => setDesktopExpanded((v) => !v)}
        />
      </motion.aside>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 h-full w-72 bg-card border-r border-border z-50 md:hidden shadow-2xl"
            >
              <SidebarContent
                collapsed={false}
                onNav={() => setMobileOpen(false)}
                onClose={() => setMobileOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar */}
        <header className="h-16 border-b border-border bg-card px-4 flex items-center justify-between shrink-0 z-10">
          <Button
            variant="ghost"
            isIconOnly
            className="md:hidden text-foreground/60"
            onPress={() => setMobileOpen(true)}
          >
            <MdMenu className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-1 ml-auto">
            {user?.name && (
              <div className="hidden sm:flex items-center gap-2 mr-2">
                <Avatar size="sm" className="bg-primary">
                  <Avatar.Fallback className="text-white text-xs font-semibold">
                    {getInitials(user.name)}
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{user.name}</span>
              </div>
            )}
            <Button
              variant="ghost"
              isIconOnly
              onPress={toggleTheme}
              className="text-foreground/60"
            >
              {isDark ? (
                <MdLightMode className="w-5 h-5" />
              ) : (
                <MdDarkMode className="w-5 h-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              isIconOnly
              onPress={() => logout()}
              className="text-foreground/60"
            >
              <MdLogout className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
