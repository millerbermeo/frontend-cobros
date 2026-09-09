import type { IconType } from 'react-icons'
import {
  MdPictureAsPdf,
  MdImage,
  MdDescription,
  MdTableChart,
  MdInsertDriveFile,
} from 'react-icons/md'
import { fileExtension } from '@/shared/utils/download'

interface DocumentStyle {
  icon: IconType
  /** Fondo + color del ícono según el tipo de archivo. */
  tone: string
}

const STYLES: Record<string, DocumentStyle> = {
  pdf:  { icon: MdPictureAsPdf, tone: 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300' },
  jpg:  { icon: MdImage,        tone: 'bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300' },
  doc:  { icon: MdDescription,  tone: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300' },
  xls:  { icon: MdTableChart,   tone: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300' },
}

const ALIASES: Record<string, keyof typeof STYLES> = {
  jpeg: 'jpg', png: 'jpg', webp: 'jpg', gif: 'jpg', bmp: 'jpg', svg: 'jpg',
  docx: 'doc', odt: 'doc', rtf: 'doc', txt: 'doc',
  xlsx: 'xls', csv: 'xls', ods: 'xls',
}

const FALLBACK: DocumentStyle = {
  icon: MdInsertDriveFile,
  tone: 'bg-primary/10 text-primary',
}

/** Ícono y color correspondientes a la extensión del archivo. */
export function documentStyle(url: string): DocumentStyle {
  const ext = fileExtension(url)
  return STYLES[ALIASES[ext] ?? ext] ?? FALLBACK
}
