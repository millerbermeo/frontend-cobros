import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@heroui/react'
import { MdClose } from 'react-icons/md'
import { useModalStore } from '@/app/store/modal.store'
import type { ModalSize } from '@/app/store/modal.store'
import { cn } from '@/shared/utils/cn'

const SIZE_CLASS: Record<ModalSize, string> = {
  xs:    'max-w-sm',
  sm:    'max-w-md',
  md:    'max-w-2xl',
  lg:    'max-w-3xl',
  full:  'max-w-4xl',
  cover: 'max-w-5xl',
}

export function GlobalModal() {
  const isOpen  = useModalStore((s) => s.isOpen)
  const config  = useModalStore((s) => s.config)
  const close   = useModalStore((s) => s.close)

  // Keep config alive during exit transition
  const lastConfig = useRef(config)
  if (config) lastConfig.current = config
  const display = lastConfig.current

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={cn(
          'fixed inset-0 bg-black/60 z-100',
          'transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Dialog wrapper */}
      <div
        className={cn(
          'fixed inset-0 z-101 flex items-center justify-center p-4',
          'transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        )}
      >
        {display && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'w-full bg-card border border-border rounded-2xl shadow-2xl',
              SIZE_CLASS[display.size ?? 'md'],
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">{display.title}</h2>
              <button
                onClick={close}
                aria-label="Cerrar"
                className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/8 transition-colors"
              >
                <MdClose className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
              {display.content}
            </div>

            {/* Footer */}
            {display.actions && display.actions.length > 0 && (
              <div className="flex justify-end gap-2 px-6 pb-6 pt-1">
                {display.actions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant ?? 'outline'}
                    onPress={action.onPress}
                    isDisabled={action.isLoading}
                  >
                    {action.isLoading ? 'Cargando...' : action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>,
    document.body,
  )
}
