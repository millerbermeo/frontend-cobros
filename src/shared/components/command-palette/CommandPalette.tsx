import { MdSearch } from 'react-icons/md'
import { useCommandPalette } from './useCommandPalette'
import { CommandPaletteTrigger } from './CommandPaletteTrigger'
import { CommandPaletteResults } from './CommandPaletteResults'
import type { CommandPaletteItem } from './types'

interface CommandPaletteProps {
  items: CommandPaletteItem[]
}

/**
 * Buscador de módulos del sidebar. Se abre con clic en el trigger o Ctrl/Cmd+K
 * y despliega los resultados justo debajo, anclado al input.
 */
export function CommandPalette({ items }: CommandPaletteProps) {
  const {
    isOpen, query, setQuery, activeIndex, setActiveIndex,
    filteredItems, inputRef, containerRef, open, handleKeyDown, select,
  } = useCommandPalette(items)

  return (
    <div ref={containerRef} className="relative hidden md:block">
      {isOpen ? (
        <div className="flex w-56 items-center gap-2 rounded-xl border border-primary/40 bg-card px-3 py-2 shadow-sm ring-2 ring-primary/10 lg:w-72 3xl:w-80">
          <MdSearch className="h-4 w-4 shrink-0 text-foreground/40" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ir a una sección..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/30"
          />
        </div>
      ) : (
        <CommandPaletteTrigger onOpen={open} />
      )}

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[20rem] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <CommandPaletteResults
            items={filteredItems}
            activeIndex={activeIndex}
            onSelect={select}
            onHover={setActiveIndex}
          />
          <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-foreground/40">
            <span>↑↓ navegar</span>
            <span>↵ ir</span>
            <span>Esc cerrar</span>
          </div>
        </div>
      )}
    </div>
  )
}
