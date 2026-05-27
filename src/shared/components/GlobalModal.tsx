import { Button, Modal } from '@heroui/react'
import { useModalStore } from '@/app/store/modal.store'

export function GlobalModal() {
  const isOpen = useModalStore((s) => s.isOpen)
  const config = useModalStore((s) => s.config)
  const close = useModalStore((s) => s.close)

  const state = {
    isOpen,
    setOpen: (v: boolean) => { if (!v) close() },
    open: () => {},
    close,
    toggle: () => { if (isOpen) close() },
  }

  if (!config) return null

  return (
    <Modal state={state}>
      <Modal.Backdrop isDismissable />
      <Modal.Container size={config.size ?? 'md'} placement="center">
        <Modal.Dialog>
          <Modal.Header className="flex items-center justify-between">
            <Modal.Heading className="text-base font-semibold text-foreground">
              {config.title}
            </Modal.Heading>
            <Modal.CloseTrigger />
          </Modal.Header>

          <Modal.Body className="text-sm text-foreground/70 py-2">
            {config.content}
          </Modal.Body>

          {config.actions && config.actions.length > 0 && (
            <Modal.Footer className="flex justify-end gap-2 pt-2">
              {config.actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant ?? 'outline'}
                  onPress={action.onPress}
                  isDisabled={action.isLoading}
                >
                  {action.isLoading ? 'Cargando...' : action.label}
                </Button>
              ))}
            </Modal.Footer>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  )
}
