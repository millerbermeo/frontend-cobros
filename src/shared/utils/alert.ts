import Swal from 'sweetalert2'

type AlertIcon = 'success' | 'error' | 'warning' | 'info'

interface ChooseOptions {
  text?: string
  confirmText: string
  denyText: string
  onConfirm: () => void | Promise<void>
  onDeny: () => void | Promise<void>
}

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

const DOWNLOAD_BAR_ID = 'swal-download-bar'

function downloadToastHtml(label: string) {
  return `
    <div class="flex items-center gap-3 text-left">
      <span class="relative flex h-9 w-9 shrink-0 items-center justify-center">
        <span class="absolute inset-0 rounded-full border-2 border-primary/20"></span>
        <span class="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"></span>
        <span class="text-primary text-base leading-none">↓</span>
      </span>
      <div class="min-w-0">
        <p class="text-sm font-semibold leading-tight">Descargando</p>
        <p class="text-xs opacity-60 truncate max-w-[13rem]">${label}</p>
        <div class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-current/10">
          <div id="${DOWNLOAD_BAR_ID}" class="h-full w-1/3 rounded-full bg-primary/60 animate-pulse transition-[width] duration-200"></div>
        </div>
      </div>
    </div>
  `
}

export const alert = {
  loading: (title = 'Procesando...') => {
    const isDark = document.documentElement.classList.contains('dark')
    Swal.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      background: isDark ? '#1e293b' : '#ffffff',
      color:      isDark ? '#f1f5f9' : '#111827',
      didOpen: () => Swal.showLoading(),
    })
  },

  closeLoading: () => Swal.close(),

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
   * Diálogo de dos acciones. Se cierra con Esc o clic fuera.
   *
   * @example
   * alert.choose('Identidad', {
   *   confirmText: 'Ver', denyText: 'Descargar',
   *   onConfirm: openInTab, onDeny: download,
   * })
   */
  choose: async (title: string, options: ChooseOptions) => {
    const { text, confirmText, denyText, onConfirm, onDeny } = options

    const result = await buildSwal().fire({
      title,
      text,
      icon: 'question',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: confirmText,
      denyButtonText: denyText,
      denyButtonColor: '#0ea5e9',
    })

    if (result.isConfirmed) await onConfirm()
    else if (result.isDenied) await onDeny()
  },

  /**
   * Toast de progreso arriba a la derecha, sin timer.
   * Devuelve el control para actualizar el porcentaje y cerrarlo.
   *
   * @example
   * const dl = alert.download('Documento de identidad')
   * dl.setProgress(60)
   * dl.close()
   */
  download: (label: string) => {
    const isDark = document.documentElement.classList.contains('dark')

    void Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      allowOutsideClick: false,
      html: downloadToastHtml(label),
      background: isDark ? '#1e293b' : '#ffffff',
      color:      isDark ? '#f1f5f9' : '#111827',
      width: '22rem',
    })

    return {
      setProgress: (percent: number) => {
        const bar = document.getElementById(DOWNLOAD_BAR_ID)
        if (!bar) return
        // Al llegar el primer dato real se pasa de indeterminado a determinado.
        bar.classList.remove('w-1/3', 'animate-pulse', 'bg-primary/60')
        bar.classList.add('bg-primary')
        bar.style.width = `${Math.max(0, Math.min(100, percent))}%`
      },
      close: () => Swal.close(),
    }
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
