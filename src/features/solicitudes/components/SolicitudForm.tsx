import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { FormInput, FormSelect, FormFileUpload } from '@/shared/components/forms'
import {
  solicitudSchema,
  solicitudEditSchema,
  ESTADO_OPTIONS,
  TIPO_CREDITO_OPTIONS,
  type SolicitudFormValues,
} from '../schemas/solicitud.schema'
import { creditFileUrl } from '../services/solicitudes.service'
import { CurrentFileLink } from './CurrentFileLink'
import type { CreditApplication } from '../types/solicitudes.types'

interface SolicitudFormProps {
  solicitud?: CreditApplication | null
  onSuccess: (data: SolicitudFormValues) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function SolicitudForm({ solicitud, onSuccess, onCancel, isSubmitting }: SolicitudFormProps) {
  const isEdit = !!solicitud

  const { control, handleSubmit } = useForm<SolicitudFormValues>({
    resolver: zodResolver(isEdit ? solicitudEditSchema : solicitudSchema) as Resolver<SolicitudFormValues>,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: solicitud?.name ?? '',
      document: solicitud?.document ?? '',
      type_credit: solicitud?.type_credit ?? '',
      requested_amount: solicitud ? String(solicitud.requested_amount) : '',
      rate: solicitud?.rate ?? '3.5',
      term: solicitud ? String(solicitud.term) : '12',
      warranty: solicitud?.warranty ?? '',
      state: solicitud?.state ?? 'Pendiente',
      archive_document: undefined,
      archive_payment_stub: undefined,
      archive_other: undefined,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput<SolicitudFormValues>
          name="name" control={control}
          label="Nombre del cliente" placeholder="Juan Carlos Pérez" isRequired
        />
        <FormInput<SolicitudFormValues>
          name="document" control={control}
          label="Documento" placeholder="1032456738" isRequired
        />
        <FormSelect<SolicitudFormValues>
          name="type_credit" control={control}
          label="Tipo de crédito" placeholder="Seleccionar..."
          options={[...TIPO_CREDITO_OPTIONS]}
        />
        <FormSelect<SolicitudFormValues>
          name="state" control={control}
          label="Estado" placeholder="Seleccionar..."
          options={[...ESTADO_OPTIONS]}
          isDisabled={!isEdit}
        />
        <FormInput<SolicitudFormValues>
          name="requested_amount" control={control}
          label="Monto solicitado" placeholder="$" type="number" isRequired
        />
        <FormInput<SolicitudFormValues>
          name="rate" control={control}
          label="Tasa fija mensual (%)" placeholder="3.5" type="number" isRequired
        />
        <FormInput<SolicitudFormValues>
          name="term" control={control}
          label="Plazo (meses)" placeholder="12" type="number" isRequired
        />
        <FormInput<SolicitudFormValues>
          name="warranty" control={control}
          label="Garantía" placeholder="Prenda vehicular, bien raíz..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground">Documentos requeridos</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5 min-w-0">
            {isEdit && <CurrentFileLink url={creditFileUrl(solicitud?.archive_document)} />}
            <FormFileUpload<SolicitudFormValues>
              name="archive_document" control={control}
              accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
              description={isEdit ? 'Reemplazar documento' : 'Documento de identidad'}
            />
          </div>
          <div className="flex flex-col gap-1.5 min-w-0">
            {isEdit && <CurrentFileLink url={creditFileUrl(solicitud?.archive_payment_stub)} />}
            <FormFileUpload<SolicitudFormValues>
              name="archive_payment_stub" control={control}
              accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
              description={isEdit ? 'Reemplazar desprendible' : 'Desprendible de pago'}
            />
          </div>
          <div className="flex flex-col gap-1.5 min-w-0">
            {isEdit && <CurrentFileLink url={creditFileUrl(solicitud?.archive_other)} />}
            <FormFileUpload<SolicitudFormValues>
              name="archive_other" control={control}
              accept=".pdf,.jpg,.jpeg,.png" maxSizeMB={5}
              description={isEdit ? 'Reemplazar otro' : 'Otros documentos'}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onCancel} isDisabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isPending={isSubmitting}>
          {isEdit ? 'Actualizar solicitud' : 'Crear solicitud'}
        </Button>
      </div>
    </form>
  )
}
