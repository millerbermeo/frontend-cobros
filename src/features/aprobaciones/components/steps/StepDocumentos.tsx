import { DocumentChip } from '@/shared/components/documents/DocumentChip'
import { creditFileUrl } from '@/shared/utils/creditFile'
import type { CreditApplication } from '../../types/aprobaciones.types'

interface DocItem {
  label: string
  raw: string
}

function DocRow({ label, raw }: DocItem) {
  const url = creditFileUrl(raw)

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
      <span className="text-sm text-foreground/70">{label}</span>
      {url ? (
        <DocumentChip label={label} url={url} />
      ) : (
        <span className="text-xs text-foreground/30">Sin archivo</span>
      )}
    </div>
  )
}

export function StepDocumentos({ solicitud }: { solicitud: CreditApplication }) {
  const docs: DocItem[] = [
    { label: 'Documento de identidad', raw: solicitud.archive_document },
    { label: 'Desprendible de pago', raw: solicitud.archive_payment_stub },
    { label: 'Otros documentos', raw: solicitud.archive_other },
  ]

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-foreground/60">
        Revisa los documentos adjuntos de la solicitud antes de continuar.
      </p>
      {docs.map((d) => (
        <DocRow key={d.label} {...d} />
      ))}
    </div>
  )
}
