import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { FormInput, FormSelect } from '@/shared/components/forms'
import { CLIENTE_OPTIONS } from '../data/retiros.mock'
import { retiroSchema, type RetiroFormValues } from '../schemas/retiro.schema'

interface RetiroFormProps {
  onSuccess: (data: RetiroFormValues) => void
  onCancel: () => void
}

export function RetiroForm({ onSuccess, onCancel }: RetiroFormProps) {
  const { control, handleSubmit } = useForm<RetiroFormValues>({
    resolver: zodResolver(retiroSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { cliente: '', monto: '', concepto: '', realizadoPor: '', autorizadoPor: 'Mauricio' },
  })

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-4">
      <FormSelect<RetiroFormValues>
        name="cliente" control={control}
        label="Cliente *" placeholder="Seleccionar cliente..."
        options={CLIENTE_OPTIONS}
      />
      <FormInput<RetiroFormValues>
        name="monto" control={control}
        label="Monto *" placeholder="$" type="number"
      />
      <FormInput<RetiroFormValues>
        name="concepto" control={control}
        label="Concepto *" placeholder="Ej: Desembolso crédito"
      />
      <div className="grid grid-cols-2 gap-3">
        <FormInput<RetiroFormValues>
          name="realizadoPor" control={control}
          label="Realizado por *" placeholder="Nombre"
        />
        <FormInput<RetiroFormValues>
          name="autorizadoPor" control={control}
          label="Autorizado por *" placeholder="Nombre"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" className="bg-emerald-600! hover:bg-emerald-700!">Registrar Retiro</Button>
      </div>
    </form>
  )
}
