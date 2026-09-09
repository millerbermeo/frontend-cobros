import { NavLink } from 'react-router-dom'
import { Tooltip } from '@heroui/react'
import { cn } from '@/shared/utils/cn'
import type { NavItemConfig } from './nav-items'

interface NavItemProps {
  item: NavItemConfig
  collapsed: boolean
  onNav?: () => void
}

export function NavItem({ item, collapsed, onNav }: NavItemProps) {
  const { label, icon: Icon, path, end } = item

  const link = (
    <NavLink
      to={path}
      end={end}
      onClick={onNav}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-xl transition-all duration-150 select-none outline-none overflow-hidden',
          collapsed
            ? 'h-10 w-10 justify-center 3xl:h-12 3xl:w-12'
            : 'h-11 px-3 w-full md:h-10 3xl:h-12 3xl:px-4',
          isActive
            ? 'bg-white/25 text-white shadow-sm'
            : 'text-white/70 hover:bg-white/15 hover:text-white'
        )
      }
    >
      <Icon className="w-5 h-5 shrink-0 md:w-4.5 md:h-4.5 3xl:w-5.5 3xl:h-5.5" />
      {!collapsed && (
        <span className="text-sm font-medium truncate whitespace-nowrap 3xl:text-base">
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
