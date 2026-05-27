import Swal from 'sweetalert2'

type ToastIcon = 'success' | 'error' | 'warning' | 'info'

interface ConfirmOptions {
  text?: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
}

export const alert = {
  /** Modal de éxito */
  success: (title: string, text?: string) =>
    Swal.fire({ icon: 'success', title, text, confirmButtonText: 'Aceptar' }),

  /** Modal de error */
  error: (title: string, text?: string) =>
    Swal.fire({ icon: 'error', title, text, confirmButtonText: 'Aceptar' }),

  /** Modal de advertencia */
  warning: (title: string, text?: string) =>
    Swal.fire({ icon: 'warning', title, text, confirmButtonText: 'Aceptar' }),

  /** Modal informativo */
  info: (title: string, text?: string) =>
    Swal.fire({ icon: 'info', title, text, confirmButtonText: 'Aceptar' }),

  /**
   * Modal de confirmación — ejecuta `onConfirm` si el usuario acepta.
   *
   * @example
   * alert.confirm('¿Eliminar usuario?', {
   *   text: 'Esta acción no se puede deshacer',
   *   onConfirm: () => deleteUser(id),
   * })
   */
  confirm: async (title: string, options: ConfirmOptions) => {
    const {
      text,
      confirmText = 'Confirmar',
      cancelText = 'Cancelar',
      onConfirm,
      onCancel,
    } = options

    const result = await Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
    })

    if (result.isConfirmed) await onConfirm()
    else if (result.isDismissed && onCancel) onCancel()
  },

  /**
   * Toast en esquina superior derecha — se cierra solo a los 3 s.
   *
   * @example
   * alert.toast('Guardado correctamente')
   * alert.toast('No se pudo conectar', 'error')
   */
  toast: (title: string, icon: ToastIcon = 'success') =>
    Swal.fire({
      icon,
      title,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }),
}
