/** Nombre de archivo legible a partir de una URL. */
export function fileNameFromUrl(url: string, fallback = 'documento'): string {
  const name = url.split('?')[0].split('/').pop()
  if (!name) return fallback
  try {
    return decodeURIComponent(name)
  } catch {
    return name
  }
}

/** Extensión en minúsculas, sin punto. Cadena vacía si no tiene. */
export function fileExtension(url: string): string {
  const name = fileNameFromUrl(url)
  const dot = name.lastIndexOf('.')
  return dot === -1 ? '' : name.slice(dot + 1).toLowerCase()
}

/**
 * Nombre limpio para guardar en disco a partir de la etiqueta visible,
 * conservando la extensión real. Evita exponer los nombres hasheados
 * que genera el backend (ej. 6a6e4df6cf0b6_doc2953232.pdf).
 */
export function friendlyFileName(label: string, url: string): string {
  const base = label
    .trim()
    .replace(/[\\/:*?"<>|]+/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
  const ext = fileExtension(url)
  return ext ? `${base}.${ext}` : base
}

/** Etiqueta corta del tipo de archivo para mostrar al usuario. */
export function fileTypeLabel(url: string): string {
  const ext = fileExtension(url)
  return ext ? `Archivo ${ext.toUpperCase()}` : 'Documento adjunto'
}

type ProgressFn = (percent: number) => void

/** Lee el stream completo reportando el avance cuando se conoce el tamaño total. */
async function readWithProgress(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  total: number,
  onProgress?: ProgressFn
): Promise<BlobPart[]> {
  const chunks: BlobPart[] = []
  let received = 0

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value as BlobPart)
    received += value.length
    if (total > 0) onProgress?.(Math.min(99, Math.round((received / total) * 100)))
  }

  return chunks
}

/** Dispara la descarga del blob en el navegador. */
function saveBlob(blob: Blob, fileName: string): void {
  const href = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(href)
}

/**
 * Descarga un archivo a disco. Lanza el error si la petición falla
 * (CORS, 404, red) para que quien llame decida el fallback.
 */
export async function downloadFile(
  url: string,
  fileName = fileNameFromUrl(url),
  onProgress?: ProgressFn
): Promise<void> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)

  const total = Number(res.headers.get('content-length')) || 0
  const reader = res.body?.getReader()

  const blob = reader
    ? new Blob(await readWithProgress(reader, total, onProgress))
    : await res.blob()

  onProgress?.(100)
  saveBlob(blob, fileName)
}
