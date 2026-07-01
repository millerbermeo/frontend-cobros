import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { FormInput, FormSelect, FormFileUpload } from '@/shared/components/forms'
import { CLIENTE_OPTIONS } from '../data/solicitudes.mock'
import {
  solicitudSchema,
  TIPO_CREDITO_OPTIONS,
  type SolicitudFormValues,
} from '../schemas/solicitud.schema'

interface SolicitudFormProps {
  onSuccess: (data: SolicitudFormValues) => void
  onCancel: () => void
}

// Documentos requeridos son estáticos (demo). No entran al schema.
type DocsValues = { cedula: FileList | null; desprendible: FileList | null; otros: FileList | null }

export function SolicitudForm({ onSuccess, onCancel }: SolicitudFormProps) {
  const { control, handleSubmit } = useForm<SolicitudFormValues>({
    resolver: zodResolver(solicitudSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { cliente: '', monto: '', tasa: '3.5', plazo: '12', garantia: '' },
  })

  const docsForm = useForm<DocsValues>({
    defaultValues: { cedula: null, desprendible: null, otros: null },
  })

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect<SolicitudFormValues>
            name="cliente" control={control}
            label="Cliente *" placeholder="Seleccionar cliente..."
            options={CLIENTE_OPTIONS}
          />
          <FormSelect<SolicitudFormValues>
            name="tipo" control={control}
            label="Tipo de Crédito *" placeholder="Seleccionar..."
            options={[...TIPO_CREDITO_OPTIONS]}
          />
          <FormInput<SolicitudFormValues>
            name="monto" control={control}
            label="Monto Solicitado *" placeholder="$" type="number"
          />
          <FormInput<SolicitudFormValues>
            name="tasa" control={control}
            label="Tasa Fija Mensual (%) *" placeholder="3.5" type="number"
          />
          <FormInput<SolicitudFormValues>
            name="plazo" control={control}
            label="Plazo (meses) *" placeholder="12" type="number"
          />
          <FormInput<SolicitudFormValues>
            name="garantia" control={control}
            label="Garantía" placeholder="Prenda vehicular, bien raíz, etc."
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-foreground">Documentos Requeridos</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormFileUpload<DocsValues> name="cedula"       control={docsForm.control} description="Cédula" />
            <FormFileUpload<DocsValues> name="desprendible" control={docsForm.control} description="Desprendible de pago" />
            <FormFileUpload<DocsValues> name="otros"        control={docsForm.control} description="Otros documentos" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border">
          <Button type="button" variant="ghost" onPress={onCancel}>Cancelar</Button>
          <Button type="submit" variant="primary">Crear Solicitud</Button>
        </div>
    </form>
  )
}
