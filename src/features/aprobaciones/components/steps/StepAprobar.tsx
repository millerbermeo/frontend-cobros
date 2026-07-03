import { useForm } from 'react-hook-form'
import { Button } from '@heroui/react'
import { MdCheckCircle, MdInfoOutline } from 'react-icons/md'
import { FormFileUpload } from '@/shared/components/forms'

interface StepAprobarProps {
  onApprove: () => void
  onBack: () => void
  isSubmitting?: boolean
}

type DocsValues = { doc1: FileList | null; doc2: FileList | null }

export function StepAprobar({ onApprove, onBack, isSubmitting }: StepAprobarProps) {
  // Formulario local para los documentos finales. La subida real queda pendiente
  // del endpoint del backend; por ahora solo se captura la selección.
  const { control } = useForm<DocsValues>({ defaultValues: { doc1: null, doc2: null } })

  return (
    <div className="flex flex-col gap-5">
      <p className="text-sm text-foreground/60">
        Adjunta los documentos finales del crédito y aprueba la solicitud.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormFileUpload<DocsValues>
          name="doc1" control={control}
          accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
          description="Documento de aprobación"
        />
        <FormFileUpload<DocsValues>
          name="doc2" control={control}
          accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
          description="Documento adicional"
        />
      </div>

      <div className="flex items-start gap-2 rounded-xl border border-amber-300/50 bg-amber-50 px-3 py-2 dark:border-amber-500/20 dark:bg-amber-500/10">
        <MdInfoOutline className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          La subida de documentos al servidor estará disponible cuando el endpoint esté listo.
          Por ahora, aprobar solo cambia el estado de la solicitud.
        </p>
      </div>

      <div className="flex justify-between gap-2 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onBack} isDisabled={isSubmitting}>
          Atrás
        </Button>
        <Button variant="primary" className="gap-1.5" onPress={onApprove} isPending={isSubmitting}>
          <MdCheckCircle className="h-4 w-4" />
          Aprobar crédito
        </Button>
      </div>
    </div>
  )
}
