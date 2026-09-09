import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import { DOTS, getPageItems } from '@/shared/utils/pagination'

const CELL = 'h-8 min-w-8 px-2 rounded-lg text-sm font-medium transition-all duration-150 3xl:h-10 3xl:min-w-10 3xl:text-base'

interface PageButtonProps {
  page: number
  isActive: boolean
  onPress: (page: number) => void
}

function PageButton({ page, isActive, onPress }: PageButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onPress(page)}
      aria-label={`Ir a la página ${page}`}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        CELL,
        'tabular-nums',
        isActive
          ? 'bg-primary text-white shadow-sm shadow-primary/30'
          : 'text-foreground/60 hover:text-foreground hover:bg-foreground/8'
      )}
    >
      {page}
    </button>
  )
}

interface ArrowButtonProps {
  direction: 'prev' | 'next'
  isDisabled: boolean
  onPress: () => void
}

function ArrowButton({ direction, isDisabled, onPress }: ArrowButtonProps) {
  const Icon = direction === 'prev' ? MdChevronLeft : MdChevronRight

  return (
    <button
      type="button"
      onClick={onPress}
      disabled={isDisabled}
      aria-label={direction === 'prev' ? 'Página anterior' : 'Página siguiente'}
      className={cn(
        CELL,
        'flex items-center justify-center',
        isDisabled
          ? 'text-muted/50 cursor-not-allowed'
          : 'text-foreground/60 hover:text-primary hover:bg-primary/10 active:scale-95'
      )}
    >
      <Icon className="w-5 h-5 3xl:w-6 3xl:h-6" />
    </button>
  )
}

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function TablePagination({ currentPage, totalPages, onPageChange }: TablePaginationProps) {
  const items = getPageItems(currentPage, totalPages)

  const goTo = (page: number) => {
    const safe = Math.min(Math.max(page, 1), totalPages)
    if (safe !== currentPage) onPageChange(safe)
  }

  return (
    <nav
      aria-label="Paginación"
      className="flex items-center gap-1 p-1 rounded-xl border border-border bg-card shadow-sm"
    >
      <ArrowButton direction="prev" isDisabled={currentPage <= 1} onPress={() => goTo(currentPage - 1)} />

      {/* Números: solo desde sm para no apretar el móvil */}
      <div className="hidden sm:flex items-center gap-1">
        {items.map((item, idx) =>
          item === DOTS ? (
            <span
              key={`dots-${idx}`}
              aria-hidden
              className="h-8 min-w-8 flex items-end justify-center pb-1.5 text-muted select-none 3xl:h-10 3xl:min-w-10"
            >
              …
            </span>
          ) : (
            <PageButton key={item} page={item} isActive={item === currentPage} onPress={goTo} />
          )
        )}
      </div>

      {/* Móvil: indicador compacto */}
      <span className="sm:hidden px-2 text-sm font-medium text-foreground tabular-nums">
        {currentPage} <span className="text-muted font-normal">de</span> {totalPages}
      </span>

      <ArrowButton
        direction="next"
        isDisabled={currentPage >= totalPages}
        onPress={() => goTo(currentPage + 1)}
      />
    </nav>
  )
}
