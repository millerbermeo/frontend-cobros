import { Button } from '@heroui/react'
import { MdEdit } from 'react-icons/md'
import { DocumentChip } from '@/shared/components/documents/DocumentChip'
import type { Column } from '@/shared/components/tables/DataTable'
import { cn } from '@/shared/utils/cn'
import { creditFileUrl } from '../services/solicitudes.service'
import { formatCOP } from '@/shared/utils/currency'
import { formatFecha } from '@/shared/utils/date'
import type { CreditApplication } from '../types/solicitudes.types'

const ESTADO_CONFIG: Record<string, string> = {
  Pendiente:  'text-amber-700   bg-amber-100   dark:text-amber-300   dark:bg-amber-500/15',
  Validación: 'text-sky-700     bg-sky-100     dark:text-sky-300     dark:bg-sky-500/15',
  Aprobado:   'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15',
  Rechazado:  'text-rose-700    bg-rose-100    dark:text-rose-300    dark:bg-rose-500/15',
}

const EMPTY_CELL = <span className="text-xs text-foreground/30">—</span>

function FileCell({ raw, label }: { raw: string | null | undefined; label: string }) {
  const url = creditFileUrl(raw)
  if (!url) return EMPTY_CELL
  return <DocumentChip label={label} url={url} />
}

const APPROVAL_DOCS = ['Documento 1', 'Documento 2', 'Documento 3'] as const

function ApprovalDocs({ solicitud }: { solicitud: CreditApplication }) {
  const docs = [solicitud.archive_1, solicitud.archive_2, solicitud.archive_3]
  const present = docs
    .map((raw, i) => ({ url: creditFileUrl(raw), label: APPROVAL_DOCS[i] }))
    .filter((d) => d.url)

  if (present.length === 0) return EMPTY_CELL

  return (
    <div className="flex items-center gap-1.5">
      {present.map((d) => (
        <DocumentChip key={d.label} label={d.label} url={d.url} />
      ))}
    </div>
  )
}

function FechaCell({ value }: { value: string | null | undefined }) {
  return <span className="text-sm text-foreground/70 whitespace-nowrap">{formatFecha(value)}</span>
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
      render: (val) => <span className="font-medium text-foreground">{formatCOP(Number(val))}</span>,
    },
    { key: 'rate', label: 'Tasa', render: (val) => `${val}%` },
    { key: 'term', label: 'Plazo', render: (val) => `${val} meses` },
    {
      key: 'archive_document', label: 'Docs',
      render: (_, row) => {
        const s = row as unknown as CreditApplication
        return (
          <div className="flex items-center gap-1.5">
            <FileCell raw={s.archive_document} label="Documento de identidad" />
            <FileCell raw={s.archive_payment_stub} label="Desprendible de pago" />
            <FileCell raw={s.archive_other} label="Otros documentos" />
          </div>
        )
      },
    },
    {
      key: 'archive_1', label: 'Aprobación',
      render: (_, row) => <ApprovalDocs solicitud={row as unknown as CreditApplication} />,
    },
    {
      key: 'creation_date', label: 'Creación',
      render: (val) => <FechaCell value={val as string} />,
    },
    {
      key: 'cutoff_date', label: 'Corte',
      render: (val) => <FechaCell value={val as string} />,
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
