import Swal from 'sweetalert2'

type AlertIcon = 'success' | 'error' | 'warning' | 'info'

interface ConfirmOptions {
  text?: string
  confirmText?: string
  cancelText?: string
  danger?: boolean
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
}

function buildSwal() {
  const isDark = document.documentElement.classList.contains('dark')

  return Swal.mixin({
    background:          isDark ? '#1e293b' : '#ffffff',
    color:               isDark ? '#f1f5f9' : '#111827',
    confirmButtonColor:  '#6366f1',
    cancelButtonColor:   isDark ? '#334155' : '#e5e7eb',
    buttonsStyling:      true,
    customClass: {
      popup:         'swal-popup',
      confirmButton: 'swal-confirm',
      cancelButton:  'swal-cancel',
    },
  })
}

const toastMixin = Swal.mixin({
  toast:              true,
  position:           'top-end',
  showConfirmButton:  false,
  timer:              3000,
  timerProgressBar:   true,
})

export const alert = {
  success: (title: string, text?: string) =>
    buildSwal().fire({ icon: 'success', title, text, confirmButtonText: 'Aceptar' }),

  error: (title: string, text?: string) =>
    buildSwal().fire({ icon: 'error', title, text, confirmButtonText: 'Aceptar' }),

  warning: (title: string, text?: string) =>
    buildSwal().fire({ icon: 'warning', title, text, confirmButtonText: 'Aceptar' }),

  info: (title: string, text?: string) =>
    buildSwal().fire({ icon: 'info', title, text, confirmButtonText: 'Aceptar' }),

  /**
   * Modal de confirmación.
   * Usar `danger: true` para acciones destructivas — botón confirmar en rojo.
   *
   * @example
   * alert.confirm('¿Cerrar sesión?', { onConfirm: logout })
   * alert.confirm('¿Eliminar?', { danger: true, onConfirm: () => deleteItem(id) })
   */
  confirm: async (title: string, options: ConfirmOptions) => {
    const {
      text,
      confirmText = 'Confirmar',
      cancelText  = 'Cancelar',
      danger      = false,
      onConfirm,
      onCancel,
    } = options

    const swal = buildSwal()

    if (danger) {
      swal.update?.({ confirmButtonColor: '#ef4444' } as Parameters<typeof swal.update>[0])
    }

    const result = await (danger
      ? buildSwal().fire({
          icon: 'warning',
          title,
          text,
          showCancelButton:   true,
          confirmButtonText:  confirmText,
          cancelButtonText:   cancelText,
          confirmButtonColor: '#ef4444',
        })
      : buildSwal().fire({
          icon: 'question',
          title,
          text,
          showCancelButton:  true,
          confirmButtonText: confirmText,
          cancelButtonText:  cancelText,
        })
    )

    if (result.isConfirmed) await onConfirm()
    else if (result.isDismissed && onCancel) onCancel()
  },

  /**
   * Toast top-right, se cierra solo a los 3 s.
   *
   * @example
   * alert.toast('Guardado correctamente')
   * alert.toast('Sin conexión', 'error')
   */
  toast: (title: string, icon: AlertIcon = 'success') => {
    const isDark = document.documentElement.classList.contains('dark')
    return toastMixin.fire({
      icon,
      title,
      background: isDark ? '#1e293b' : '#ffffff',
      color:      isDark ? '#f1f5f9' : '#111827',
    })
  },
}
