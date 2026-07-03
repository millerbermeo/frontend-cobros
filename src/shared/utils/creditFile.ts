import { config } from '@/config'

/**
 * El backend guarda los archivos de crédito como ruta absoluta del servidor
 * (/var/www/html/back/create/document_credit/<archivo>). Devuelve un enlace
 * abierto en el navegador, o null si no aplica.
 */
export function creditFileUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw
  const name = raw.split('/').pop()
  if (!name) return null
  return `${config.apiUrl}/create/document_credit/${name}`
}
