import { useCallback } from 'react'
import { alert } from '@/shared/utils/alert'
import { downloadFile, fileTypeLabel, friendlyFileName } from '@/shared/utils/download'

const openInTab = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Acciones sobre un documento remoto: ver en pestaña nueva o descargar
 * con toast de progreso. Si la descarga falla (CORS, 404, red) cae de vuelta
 * a abrir el archivo en el navegador.
 */
export function useDocumentActions() {
  const downloadDocument = useCallback(async (url: string, label = 'Documento') => {
    const fileName = friendlyFileName(label, url)
    const progress = alert.download(label)

    try {
      await downloadFile(url, fileName, progress.setProgress)
      progress.close()
      alert.toast('Documento descargado')
    } catch {
      progress.close()
      alert.toast('No se pudo descargar, se abrió en una pestaña', 'warning')
      openInTab(url)
    }
  }, [])

  const openDocument = useCallback(
    (label: string, url: string) => {
      void alert.choose(label, {
        text: fileTypeLabel(url),
        confirmText: 'Ver',
        denyText: 'Descargar',
        onConfirm: () => openInTab(url),
        onDeny: () => downloadDocument(url, label),
      })
    },
    [downloadDocument]
  )

  return { openDocument, viewDocument: openInTab, downloadDocument }
}
