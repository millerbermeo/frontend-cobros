import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { MdCheckCircle, MdInsertDriveFile } from 'react-icons/md'
import { FormFileUpload } from '@/shared/components/forms'
import { creditFileUrl } from '@/shared/utils/creditFile'
import { docsAprobacionSchema, type DocsAprobacionValues } from '../../schemas/aprobacion.schema'
import type { CreditApplication } from '../../types/aprobaciones.types'

interface StepAprobarProps {
  solicitud: CreditApplication
  onApprove: (values: DocsAprobacionValues) => void
  onBack: () => void
  isSubmitting?: boolean
  readOnly?: boolean
}

function CurrentDoc({ raw, label = 'Ver documento actual' }: { raw: string | null | undefined; label?: string }) {
  const url = creditFileUrl(raw)
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline w-fit"
    >
      <MdInsertDriveFile className="h-3.5 w-3.5" />
      {label}
    </a>
  )
}

function ReadOnlyDocs({ solicitud, onBack }: { solicitud: CreditApplication; onBack: () => void }) {
  const docs = [solicitud.archive_1, solicitud.archive_2, solicitud.archive_3]
  const hasAny = docs.some((d) => creditFileUrl(d))
  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-foreground/60">Documentos finales del crédito aprobado.</p>
      {hasAny ? (
        <div className="flex flex-col gap-2">
          {docs.map((raw, i) =>
            creditFileUrl(raw) ? (
              <div key={i} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-4 py-3">
                <span className="text-sm text-foreground/70">Documento {i + 1}</span>
                <CurrentDoc raw={raw} label="Ver documento" />
              </div>
            ) : null,
          )}
        </div>
      ) : (
        <p className="text-sm text-foreground/40">No hay documentos finales cargados.</p>
      )}
      <div className="flex justify-start pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onBack}>Atrás</Button>
      </div>
    </div>
  )
}

export function StepAprobar({ solicitud, onApprove, onBack, isSubmitting, readOnly }: StepAprobarProps) {
  if (readOnly) return <ReadOnlyDocs solicitud={solicitud} onBack={onBack} />

  const { control, handleSubmit } = useForm<DocsAprobacionValues>({
    resolver: zodResolver(docsAprobacionSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { archive_1: undefined, archive_2: undefined, archive_3: undefined },
  })

  return (
    <form onSubmit={handleSubmit(onApprove)} className="flex flex-col gap-5">
      <p className="text-sm text-foreground/60">
        Adjunta los documentos finales del crédito y aprueba la solicitud.
        El primer documento es obligatorio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <FormFileUpload<DocsAprobacionValues>
            name="archive_1" control={control}
            label="Documento 1 *" accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
            description="Obligatorio"
          />
          <CurrentDoc raw={solicitud.archive_1} />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <FormFileUpload<DocsAprobacionValues>
            name="archive_2" control={control}
            label="Documento 2" accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
            description="Opcional"
          />
          <CurrentDoc raw={solicitud.archive_2} />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <FormFileUpload<DocsAprobacionValues>
            name="archive_3" control={control}
            label="Documento 3" accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
            description="Opcional"
          />
          <CurrentDoc raw={solicitud.archive_3} />
        </div>
      </div>

      <div className="flex justify-between gap-2 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onBack} isDisabled={isSubmitting}>
          Atrás
        </Button>
        <Button type="submit" variant="primary" className="gap-1.5" isPending={isSubmitting}>
          <MdCheckCircle className="h-4 w-4" />
          Aprobar crédito
        </Button>
      </div>
    </form>
  )
}
