import { Button } from '@heroui/react'
import { MdEdit, MdInsertDriveFile } from 'react-icons/md'
import type { Column } from '@/shared/components/tables/DataTable'
import { cn } from '@/shared/utils/cn'
import { creditFileUrl } from '../services/solicitudes.service'
import type { CreditApplication } from '../types/solicitudes.types'

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency', currency: 'COP', maximumFractionDigits: 0,
})

const ESTADO_CONFIG: Record<string, string> = {
  Pendiente:  'text-amber-700   bg-amber-100   dark:text-amber-300   dark:bg-amber-500/15',
  Validación: 'text-sky-700     bg-sky-100     dark:text-sky-300     dark:bg-sky-500/15',
  Aprobado:   'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15',
  Rechazado:  'text-rose-700    bg-rose-100    dark:text-rose-300    dark:bg-rose-500/15',
}

function FileLink({ raw, label = 'Ver' }: { raw: string | null | undefined; label?: string }) {
  const url = creditFileUrl(raw)
  if (!url) return <span className="text-xs text-foreground/30">—</span>
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
    >
      <MdInsertDriveFile className="w-4 h-4" />
      {label}
    </a>
  )
}

function ApprovalDocs({ solicitud }: { solicitud: CreditApplication }) {
  const docs = [solicitud.archive_1, solicitud.archive_2, solicitud.archive_3]
  const present = docs.filter((d) => creditFileUrl(d))
  if (present.length === 0) return <span className="text-xs text-foreground/30">—</span>
  return (
    <div className="flex items-center gap-3">
      {present.map((raw, i) => (
        <FileLink key={i} raw={raw} label={`Doc ${i + 1}`} />
      ))}
    </div>
  )
}

export function buildColumns(
  onEdit: (s: CreditApplication) => void,
): Column<Record<string, unknown>>[] {
  return [
    {
      key: 'id', label: '#',
      render: (val) => <span className="text-xs font-medium text-foreground/50">{String(val)}</span>,
    },
    {
      key: 'name', label: 'Cliente',
      render: (_, row) => {
        const s = row as unknown as CreditApplication
        return (
          <div>
            <p className="text-sm font-medium text-foreground">{s.name}</p>
            <p className="text-xs text-foreground/40">{s.document}</p>
          </div>
        )
      },
    },
    {
      key: 'type_credit', label: 'Tipo',
      render: (val) => <span className="text-sm text-foreground/70">{String(val)}</span>,
    },
    {
      key: 'requested_amount', label: 'Monto',
      render: (val) => <span className="font-medium text-foreground">{currency.format(Number(val))}</span>,
    },
    { key: 'rate', label: 'Tasa', render: (val) => `${val}%` },
    { key: 'term', label: 'Plazo', render: (val) => `${val} meses` },
    {
      key: 'archive_document', label: 'Docs',
      render: (_, row) => {
        const s = row as unknown as CreditApplication
        return (
          <div className="flex items-center gap-3">
            <FileLink raw={s.archive_document} />
            <FileLink raw={s.archive_payment_stub} />
            <FileLink raw={s.archive_other} />
          </div>
        )
      },
    },
    {
      key: 'archive_1', label: 'Aprobación',
      render: (_, row) => <ApprovalDocs solicitud={row as unknown as CreditApplication} />,
    },
    {
      key: 'state', label: 'Estado',
      render: (val) => {
        const estado = String(val)
        return (
          <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md', ESTADO_CONFIG[estado] ?? 'text-foreground/60 bg-foreground/10')}>
            {estado}
          </span>
        )
      },
    },
    {
      key: 'acciones', label: 'Acciones',
      render: (_, row) => {
        const s = row as unknown as CreditApplication
        return (
          <Button
            variant="ghost" isIconOnly size="sm"
            className="text-foreground/50 hover:text-primary hover:bg-primary/10"
            onPress={() => onEdit(s)}
          >
            <MdEdit className="w-4 h-4" />
          </Button>
        )
      },
    },
  ]
}
