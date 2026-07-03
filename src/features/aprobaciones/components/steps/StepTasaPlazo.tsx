import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { FormInput } from '@/shared/components/forms'
import { tasaPlazoSchema, type TasaPlazoValues } from '../../schemas/aprobacion.schema'
import type { CreditApplication } from '../../types/aprobaciones.types'

interface StepTasaPlazoProps {
  solicitud: CreditApplication
  onSubmit: (values: TasaPlazoValues) => void
  onBack: () => void
  isSubmitting?: boolean
}

export function StepTasaPlazo({ solicitud, onSubmit, onBack, isSubmitting }: StepTasaPlazoProps) {
  const { control, handleSubmit } = useForm<TasaPlazoValues>({
    resolver: zodResolver(tasaPlazoSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { rate: solicitud.rate ?? '', term: String(solicitud.term ?? '') },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <p className="text-sm text-foreground/60">
        Ajusta la tasa y el plazo del crédito si es necesario, luego guarda para continuar.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput<TasaPlazoValues>
          name="rate" control={control}
          label="Tasa fija mensual (%)" placeholder="3.5" type="number" isRequired
        />
        <FormInput<TasaPlazoValues>
          name="term" control={control}
          label="Plazo (meses)" placeholder="12" type="number" isRequired
        />
      </div>
      <div className="flex justify-between gap-2 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onBack} isDisabled={isSubmitting}>
          Atrás
        </Button>
        <Button type="submit" variant="primary" isPending={isSubmitting}>
          Guardar y continuar
        </Button>
      </div>
    </form>
  )
}
