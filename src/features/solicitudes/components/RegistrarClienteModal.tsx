import { createPortal } from 'react-dom'
import { isAxiosError } from 'axios'
import { MdClose } from 'react-icons/md'
import { alert } from '@/shared/utils/alert'
import { ClienteForm } from '@/features/clientes/components/ClienteForm'
import { useCreateCliente } from '@/features/clientes/hooks/useClientes'
import type { ClienteFormValues } from '@/features/clientes/schemas/cliente.schema'

interface RegistrarClienteModalProps {
  open: boolean
  onClose: () => void
  onRegistered: (cliente: { name: string; document: string }) => void
}

/**
 * Modal local (portal a body) para registrar un cliente sin salir del formulario de
 * solicitud. Usa portal para no anidar su <form> dentro del form de la solicitud.
 */
export function RegistrarClienteModal({ open, onClose, onRegistered }: RegistrarClienteModalProps) {
  const createCliente = useCreateCliente()

  if (!open) return null

  const handleCreate = async (values: ClienteFormValues) => {
    alert.loading('Registrando cliente...')
    try {
      const res = await createCliente.mutateAsync(values)
      alert.closeLoading()
      alert.toast(res.data.message || 'Cliente registrado')
      onRegistered({ name: values.name, document: values.document })
      onClose()
    } catch (err) {
      alert.closeLoading()
      const data = isAxiosError(err) ? (err.response?.data as { error?: string; message?: string }) : undefined
      alert.error('Error', data?.error || data?.message || 'No se pudo registrar el cliente')
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 pt-6 pb-4">
          <h2 className="text-lg font-semibold text-foreground">Registrar cliente</h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-foreground/40 transition-colors hover:bg-foreground/8 hover:text-foreground"
          >
            <MdClose className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
          <ClienteForm
            onSuccess={handleCreate}
            onCancel={onClose}
            isSubmitting={createCliente.isPending}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
