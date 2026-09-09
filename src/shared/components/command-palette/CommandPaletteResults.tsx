import { cn } from '@/shared/utils/cn'
import type { CommandPaletteItem } from './types'

interface CommandPaletteResultsProps {
  items: CommandPaletteItem[]
  activeIndex: number
  onSelect: (item: CommandPaletteItem) => void
  onHover: (index: number) => void
}

export function CommandPaletteResults({ items, activeIndex, onSelect, onHover }: CommandPaletteResultsProps) {
  if (items.length === 0) {
    return <div className="px-4 py-6 text-center text-sm text-foreground/40">Sin resultados</div>
  }

  return (
    <ul className="max-h-80 overflow-y-auto py-2">
      {items.map((item, index) => {
        const Icon = item.icon
        const isActive = index === activeIndex
        return (
          <li key={item.path}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              onMouseEnter={() => onHover(index)}
              className={cn(
                'flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors',
                isActive ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-foreground/5'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
