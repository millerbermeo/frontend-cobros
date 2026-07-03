import { MdPersonOutline, MdBadge } from 'react-icons/md'

interface SelectedClienteCardProps {
  name?: string
  document?: string
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

/** Muestra el cliente seleccionado (nombre + documento) en una tarjeta. */
export function SelectedClienteCard({ name, document }: SelectedClienteCardProps) {
  if (!name && !document) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-background/40 px-4 py-3">
        <MdPersonOutline className="h-5 w-5 text-foreground/30" />
        <p className="text-sm text-foreground/40">Ningún cliente seleccionado</p>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-primary/5 px-4 py-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
        <span className="text-sm font-bold text-primary">{name ? initials(name) : '?'}</span>
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{name || '—'}</p>
        <p className="flex items-center gap-1 text-xs text-foreground/50">
          <MdBadge className="h-3.5 w-3.5" />
          {document || '—'}
        </p>
      </div>
    </div>
  )
}
