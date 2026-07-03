import { Button } from '@heroui/react'
import { MdDescription, MdArticle, MdDownload, MdInsertDriveFile } from 'react-icons/md'
import { creditFileUrl } from '@/shared/utils/creditFile'
import { formatCOP } from '@/shared/utils/currency'
import { formatFecha } from '@/shared/utils/date'
import type { CreditApplication } from '../types/contratos.types'

interface ContratoCardProps {
  contrato: CreditApplication
  onGenerar: (tipo: 'Letra' | 'Pagaré', c: CreditApplication) => void
  onDescargar: (c: CreditApplication) => void
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-foreground/50">{label}</p>
      <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  )
}

function DocLink({ label, raw }: { label: string; raw: string | null | undefined }) {
  const url = creditFileUrl(raw)
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
    >
      <MdInsertDriveFile className="h-4 w-4" />
      {label}
    </a>
  )
}

export function ContratoCard({ contrato, onGenerar, onDescargar }: ContratoCardProps) {
  const { id, name, document, type_credit, requested_amount, rate, term } = contrato
  const docs: { label: string; raw: string | null | undefined }[] = [
    { label: 'Identidad', raw: contrato.archive_document },
    { label: 'Desprendible', raw: contrato.archive_payment_stub },
    { label: 'Otros', raw: contrato.archive_other },
    { label: 'Aprobación 1', raw: contrato.archive_1 },
    { label: 'Aprobación 2', raw: contrato.archive_2 },
    { label: 'Aprobación 3', raw: contrato.archive_3 },
  ]
  const hasDocs = docs.some((d) => creditFileUrl(d.raw))

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{name}</h3>
          <p className="text-sm text-foreground/50 mt-0.5">Contrato #{id} · Doc: {document}</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15">
          Aprobado
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Metric label="Tipo de crédito" value={type_credit} />
        <Metric label="Monto Aprobado" value={formatCOP(Number(requested_amount))} />
        <Metric label="Tasa Mensual" value={`${rate}%`} />
        <Metric label="Plazo" value={`${term} meses`} />
        <Metric label="Fecha de creación" value={formatFecha(contrato.creation_date)} />
        <Metric label="Fecha de corte" value={formatFecha(contrato.cutoff_date)} />
        <Metric label="Fecha de firma" value={formatFecha(contrato.signature_date)} />
      </div>

      <div className="my-4 border-t border-border" />

      <p className="text-sm text-foreground/60 mb-2">Documentos:</p>
      {hasDocs ? (
        <div className="flex flex-wrap gap-2">
          {docs.map((d) => (
            <DocLink key={d.label} label={d.label} raw={d.raw} />
          ))}
        </div>
      ) : (
        <p className="text-xs text-foreground/40">Sin documentos adjuntos.</p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="primary" className="gap-1.5" onPress={() => onGenerar('Letra', contrato)}>
          <MdDescription className="h-4 w-4" />
          Generar Letra
        </Button>
        <Button
          variant="primary"
          className="gap-1.5 bg-violet-600! hover:bg-violet-700!"
          onPress={() => onGenerar('Pagaré', contrato)}
        >
          <MdArticle className="h-4 w-4" />
          Generar Pagaré
        </Button>
        <Button variant="outline" className="gap-1.5" onPress={() => onDescargar(contrato)}>
          <MdDownload className="h-4 w-4" />
          Descargar Todo
        </Button>
      </div>
    </div>
  )
}
