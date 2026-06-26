import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { MdInsertDriveFile } from 'react-icons/md'
import { FormInput } from '@/shared/components/forms/FormInput'
import { FormFileUpload } from '@/shared/components/forms/FormFileUpload'
import { clienteSchema, clienteEditSchema, type ClienteFormValues } from '../schemas/cliente.schema'
import { customerFileUrl } from '../services/clientes.service'
import type { Customer } from '../types/clientes.types'

interface ClienteFormProps {
  customer?: Customer | null
  onSuccess: (data: ClienteFormValues) => void
  onCancel: () => void
  isSubmitting?: boolean
}

export function ClienteForm({ customer, onSuccess, onCancel, isSubmitting }: ClienteFormProps) {
  const isEdit = !!customer
  const currentFileUrl = customerFileUrl(customer?.url_source_of_income)

  const { control, handleSubmit } = useForm<ClienteFormValues>({
    resolver: zodResolver(isEdit ? clienteEditSchema : clienteSchema) as Resolver<ClienteFormValues>,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: customer?.name ?? '',
      document: customer?.document ?? '',
      address: customer?.address ?? '',
      phone: customer?.phone ?? '',
      email: customer?.email ?? '',
      recommended: customer?.recommended ?? '',
      additional_phone: customer?.additional_phone ?? '',
      type_work: customer?.type_work ?? '',
      employing_entity: customer?.employing_entity ?? '',
      source_of_income: customer?.source_of_income ?? '',
      url_source_of_income: undefined,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-4">
      {/* Nombre y documento */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="name"
          control={control}
          label="Nombre completo"
          placeholder="Juan Carlos Pérez"
          isRequired
        />
        <FormInput<ClienteFormValues>
          name="document"
          control={control}
          label="Documento"
          placeholder="1032456738"
          isRequired
        />
      </div>

      {/* Dirección */}
      <FormInput<ClienteFormValues>
        name="address"
        control={control}
        label="Dirección"
        placeholder="Calle 45 #12-34, Bogotá, Colombia"
        isRequired
      />

      {/* Teléfono y correo */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="phone"
          control={control}
          label="Teléfono"
          placeholder="+573001234567"
          isRequired
        />
        <FormInput<ClienteFormValues>
          name="email"
          control={control}
          label="Correo electrónico"
          placeholder="cliente@ejemplo.com"
          type="email"
        />
      </div>

      {/* Recomendado y teléfono adicional */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="recommended"
          control={control}
          label="Recomendado por"
          placeholder="María Gómez"
        />
        <FormInput<ClienteFormValues>
          name="additional_phone"
          control={control}
          label="Teléfono adicional"
          placeholder="+573102345678"
        />
      </div>

      {/* Información laboral */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="type_work"
          control={control}
          label="Tipo de trabajo"
          placeholder="Empleado, Independiente..."
          isRequired
        />
        <FormInput<ClienteFormValues>
          name="employing_entity"
          control={control}
          label="Entidad donde trabaja"
          placeholder="Tecnologías ABC S.A.S."
          isRequired
        />
      </div>

      {/* Fuente de ingresos */}
      <FormInput<ClienteFormValues>
        name="source_of_income"
        control={control}
        label="Fuente de ingresos"
        placeholder="Salario mensual, honorarios..."
      />

      {/* Soporte de ingresos (archivo) */}
      <div className="flex flex-col gap-2">
        {isEdit && currentFileUrl && (
          <a
            href={currentFileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline w-fit"
          >
            <MdInsertDriveFile className="w-4 h-4" />
            Ver soporte actual
          </a>
        )}
        <FormFileUpload<ClienteFormValues>
          name="url_source_of_income"
          control={control}
          label={isEdit ? 'Reemplazar soporte (opcional)' : 'Soporte de ingresos'}
          accept=".pdf,.jpg,.jpeg,.png"
          maxSizeMB={5}
          description={
            isEdit
              ? 'Sube un archivo solo si quieres reemplazar el actual'
              : 'Adjunta el soporte (PDF o imagen)'
          }
        />
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
        <Button type="button" variant="ghost" onPress={onCancel} isDisabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isPending={isSubmitting}>
          {isEdit ? 'Actualizar cliente' : 'Registrar cliente'}
        </Button>
      </div>
    </form>
  )
}
