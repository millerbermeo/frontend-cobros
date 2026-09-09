import { MdOutlineOpenInNew } from 'react-icons/md'
import { useDocumentActions } from '@/shared/hooks/useDocumentActions'
import { cn } from '@/shared/utils/cn'
import { documentStyle } from './documentIcon'

interface DocumentChipProps {
  label: string
  /** URL ya resuelta del archivo. Si viene vacía el chip no se renderiza. */
  url: string | null | undefined
  /** Solo el ícono, sin texto. Para celdas de tabla. */
  iconOnly?: boolean
  /** Marcador cuando no hay archivo: chip punteado (false) o guion (true). */
  showEmpty?: boolean
  className?: string
}

function EmptyChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-dashed border-border px-2.5 py-1.5 text-xs font-medium text-foreground/30">
      {label}: sin archivo
    </span>
  )
}

const BASE_CLASS = cn(
  'group inline-flex items-center rounded-xl border border-border bg-card cursor-pointer',
  'text-xs font-medium text-foreground/70 shadow-sm transition-all duration-150',
  'hover:border-primary/40 hover:text-foreground hover:shadow-md',
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.97]'
)

/**
 * Chip de documento. Al hacer clic abre un diálogo con las opciones
 * de ver en el navegador o descargar con indicador de progreso.
 */
export function DocumentChip({ label, url, iconOnly = false, showEmpty = false, className }: DocumentChipProps) {
  const { openDocument } = useDocumentActions()

  if (!url) return showEmpty ? <EmptyChip label={label} /> : null

  const { icon: Icon, tone } = documentStyle(url)

  return (
    <button
      type="button"
      onClick={() => openDocument(label, url)}
      title={`Ver o descargar ${label}`}
      aria-label={`Ver o descargar ${label}`}
      className={cn(
        BASE_CLASS,
        iconOnly ? 'gap-0 p-1' : 'gap-2 py-1.5 pl-1.5 pr-3 3xl:text-sm',
        className
      )}
    >
      <span className={cn('flex h-6 w-6 items-center justify-center rounded-lg 3xl:h-7 3xl:w-7', tone)}>
        <Icon className="h-3.5 w-3.5 3xl:h-4 3xl:w-4" />
      </span>
      {!iconOnly && (
        <>
          {label}
          <MdOutlineOpenInNew className="h-3 w-3 text-foreground/25 transition-colors group-hover:text-primary" />
        </>
      )}
    </button>
  )
}
