import { MdInsertDriveFile } from 'react-icons/md'

interface CurrentFileLinkProps {
  url: string | null
}

/** Enlace al archivo actual guardado en el servidor (solo en edición). */
export function CurrentFileLink({ url }: CurrentFileLinkProps) {
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline w-fit"
    >
      <MdInsertDriveFile className="w-4 h-4" />
      Ver actual
    </a>
  )
}
