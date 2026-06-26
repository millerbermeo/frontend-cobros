import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
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

  // Keep config alive during exit animation
  const lastConfig = useRef(config)
  if (config) lastConfig.current = config
  const display = lastConfig.current

  return createPortal(
    <AnimatePresence>
      {isOpen && display && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 bg-black/60 z-[100]"
          />

          {/* Dialog wrapper — centers the card */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0,   scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'w-full pointer-events-auto',
                'bg-card border border-border rounded-2xl shadow-2xl',
                SIZE_CLASS[display.size ?? 'md'],
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">{display.title}</h2>
                <button
                  onClick={close}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground/40 hover:text-foreground hover:bg-foreground/8 transition-colors"
                >
                  <MdClose className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
                {display.content}
              </div>

              {/* Footer — only when actions exist */}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
