import { Avatar, Button, Tooltip } from '@heroui/react'
import { useLocation } from 'react-router-dom'
import {
  MdMenu,
  MdDarkMode,
  MdLightMode,
  MdLogout,
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
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { useTheme } from '@/shared/hooks/useTheme'
import { cn } from '@/shared/utils/cn'
import { useCurrentUser, useLogout } from '@/features/auth/hooks/useAuth'
import { CommandPalette } from '@/shared/components/command-palette'
import { CONTENT_PADDING_X, HEADER_HEIGHT } from './layout.constants'
import { NAV_ITEMS } from './sidebar/nav-items'

const ROUTE_META: Record<string, { label: string; icon: IconType }> = {
  '/':              { label: 'Dashboard',             icon: MdDashboard },
  '/clientes':      { label: 'Clientes',              icon: MdPeople },
  '/solicitudes':   { label: 'Solicitudes de Crédito',icon: MdAssignment },
  '/aprobaciones':  { label: 'Aprobaciones',          icon: MdCheckCircle },
  '/contratos':     { label: 'Contratos',             icon: MdDescription },
  '/cobranza':      { label: 'Cobranza',              icon: MdAccountBalance },
  '/clientes-mora': { label: 'Clientes en Mora',      icon: MdReportProblem },
  '/abonos':        { label: 'Abonos',                icon: MdPayment },
  '/retiros':       { label: 'Retiros',               icon: MdCallMade },
  '/reportes':      { label: 'Reportes',              icon: MdBarChart },
  '/configuracion': { label: 'Configuración',         icon: MdSettings },
}

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

interface NavbarProps {
  onMobileMenuOpen: () => void
}

export function Navbar({ onMobileMenuOpen }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme()
  const logout = useLogout()
  const user = useCurrentUser()
  const { pathname } = useLocation()

  const segment = '/' + pathname.split('/')[1]
  const meta = ROUTE_META[segment] ?? ROUTE_META['/']
  const PageIcon = meta.icon

  return (
    <header
      className={cn(
        HEADER_HEIGHT,
        CONTENT_PADDING_X,
        'border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between gap-2 shrink-0 z-10 shadow-sm'
      )}
    >
      {/* Left */}
      <div className="flex items-center gap-2 md:gap-3 md:w-56 lg:w-64 3xl:w-72 md:shrink-0">
        <Button
          variant="ghost"
          isIconOnly
          aria-label="Abrir menú"
          className="md:hidden text-foreground/60 shrink-0"
          onPress={onMobileMenuOpen}
        >
          <MdMenu className="w-6 h-6" />
        </Button>

        <div className="flex items-center gap-2.5 min-w-0">
          <div className="hidden sm:flex w-7 h-7 rounded-lg bg-primary/10 items-center justify-center shrink-0 3xl:w-9 3xl:h-9">
            <PageIcon className="w-4 h-4 text-primary 3xl:w-5 3xl:h-5" />
          </div>
          <h1 className="text-sm font-semibold text-foreground truncate 3xl:text-base">
            {meta.label}
          </h1>
        </div>
      </div>

      {/* Center */}
      <CommandPalette items={NAV_ITEMS} />

      {/* Right */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Theme toggle */}
        <Tooltip delay={500}>
          <Tooltip.Trigger>
            <Button
              variant="ghost"
              isIconOnly
              aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              onPress={toggleTheme}
              className="text-foreground/60 hover:text-foreground hover:bg-foreground/8 rounded-xl"
            >
              {isDark
                ? <MdLightMode className="w-4.5 h-4.5" />
                : <MdDarkMode className="w-4.5 h-4.5" />}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{isDark ? 'Modo claro' : 'Modo oscuro'}</Tooltip.Content>
        </Tooltip>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-border mx-1" />

        {/* User pill */}
        {user && (
          <div className="hidden sm:flex items-center gap-2.5 bg-foreground/5 hover:bg-foreground/8 transition-colors rounded-xl px-2.5 py-1.5 cursor-default max-w-[40vw] lg:px-3 3xl:px-4 3xl:py-2">
            <Avatar size="sm" className="bg-primary w-7 h-7 shrink-0 3xl:w-9 3xl:h-9">
              <Avatar.Fallback className="text-white text-[11px] font-bold 3xl:text-sm">
                {getInitials(user.name)}
              </Avatar.Fallback>
            </Avatar>
            <div className="hidden md:flex flex-col leading-tight min-w-0">
              <span className="text-xs font-semibold text-foreground truncate 3xl:text-sm">
                {user.name}
              </span>
              <span className="text-[10px] text-foreground/40 font-medium truncate 3xl:text-xs">
                {user.rol}
              </span>
            </div>
          </div>
        )}

        {/* Logout */}
        <Tooltip delay={500}>
          <Tooltip.Trigger>
            <Button
              variant="ghost"
              isIconOnly
              aria-label="Cerrar sesión"
              onPress={logout}
              className="text-foreground/50 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <MdLogout className="w-4.5 h-4.5" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Cerrar sesión</Tooltip.Content>
        </Tooltip>
      </div>
    </header>
  )
}
