import { MdSearch } from 'react-icons/md'

interface CommandPaletteTriggerProps {
  onOpen: () => void
}

export function CommandPaletteTrigger({ onOpen }: CommandPaletteTriggerProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="hidden md:flex items-center gap-2 w-56 lg:w-72 rounded-xl border border-border bg-background/60 px-3 py-2 text-left text-xs text-foreground/40 transition-colors hover:border-primary/40 hover:text-foreground/60 3xl:w-80 3xl:text-sm"
    >
      <MdSearch className="h-4 w-4 shrink-0" />
      <span className="flex-1 truncate">Buscar en el panel...</span>
      <kbd className="hidden lg:inline-flex items-center rounded-md border border-border bg-foreground/5 px-1.5 py-0.5 text-[10px] font-medium text-foreground/40">
        Ctrl K
      </kbd>
    </button>
  )
}
