import Swal from 'sweetalert2'

export const alert = {
  success: (title: string, text?: string) =>
    Swal.fire({ icon: 'success', title, text, confirmButtonText: 'OK' }),

  error: (title: string, text?: string) =>
    Swal.fire({ icon: 'error', title, text, confirmButtonText: 'OK' }),

  warning: (title: string, text?: string) =>
    Swal.fire({ icon: 'warning', title, text, confirmButtonText: 'OK' }),

  info: (title: string, text?: string) =>
    Swal.fire({ icon: 'info', title, text, confirmButtonText: 'OK' }),

  confirm: (title: string, text?: string) =>
    Swal.fire({
      icon: 'warning',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }),

  toast: (title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success') =>
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
