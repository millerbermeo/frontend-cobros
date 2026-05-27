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
  MdPayment,
  MdCallMade,
  MdBarChart,
  MdSettings,
  MdAdminPanelSettings as MdUsers,
} from 'react-icons/md'
import type { IconType } from 'react-icons'
import { useTheme } from '@/shared/hooks/useTheme'
import { useCurrentUser, useLogout } from '@/features/auth/hooks/useAuth'

const ROUTE_META: Record<string, { label: string; icon: IconType }> = {
  '/':              { label: 'Dashboard',             icon: MdDashboard },
  '/clientes':      { label: 'Clientes',              icon: MdPeople },
  '/solicitudes':   { label: 'Solicitudes de Crédito',icon: MdAssignment },
  '/aprobaciones':  { label: 'Aprobaciones',          icon: MdCheckCircle },
  '/contratos':     { label: 'Contratos',             icon: MdDescription },
  '/cobranza':      { label: 'Cobranza',              icon: MdAccountBalance },
  '/abonos':        { label: 'Abonos',                icon: MdPayment },
  '/retiros':       { label: 'Retiros',               icon: MdCallMade },
  '/reportes':      { label: 'Reportes',              icon: MdBarChart },
  '/usuarios':      { label: 'Usuarios del Sistema',  icon: MdUsers },
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
  const { mutate: logout } = useLogout()
  const user = useCurrentUser()
  const { pathname } = useLocation()

  const segment = '/' + pathname.split('/')[1]
  const meta = ROUTE_META[segment] ?? ROUTE_META['/']
  const PageIcon = meta.icon

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between shrink-0 z-10 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          isIconOnly
          className="md:hidden text-foreground/60"
          onPress={onMobileMenuOpen}
        >
          <MdMenu className="w-5 h-5" />
        </Button>

        <div className="hidden md:flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
            <PageIcon className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-sm font-semibold text-foreground">{meta.label}</h1>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <Tooltip delay={500}>
          <Tooltip.Trigger>
            <Button
              variant="ghost"
              isIconOnly
              onPress={toggleTheme}
              className="text-foreground/60 hover:text-foreground hover:bg-foreground/8 rounded-xl"
            >
              {isDark
                ? <MdLightMode className="w-[18px] h-[18px]" />
                : <MdDarkMode className="w-[18px] h-[18px]" />}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{isDark ? 'Modo claro' : 'Modo oscuro'}</Tooltip.Content>
        </Tooltip>

        {/* Divider */}
        <div className="w-px h-6 bg-border mx-1" />

        {/* User pill */}
        {user?.name && (
          <div className="hidden sm:flex items-center gap-2.5 bg-foreground/5 hover:bg-foreground/8 transition-colors rounded-xl px-3 py-1.5 cursor-default">
            <Avatar size="sm" className="bg-primary w-7 h-7">
              <Avatar.Fallback className="text-white text-[11px] font-bold">
                {getInitials(user.name)}
              </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-foreground">{user.name}</span>
              <span className="text-[10px] text-foreground/40 font-medium">Administrador</span>
            </div>
          </div>
        )}

        {/* Logout */}
        <Tooltip delay={500}>
          <Tooltip.Trigger>
            <Button
              variant="ghost"
              isIconOnly
              onPress={() => logout()}
              className="text-foreground/50 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <MdLogout className="w-[18px] h-[18px]" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>Cerrar sesión</Tooltip.Content>
        </Tooltip>
      </div>
    </header>
  )
}
