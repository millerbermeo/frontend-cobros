import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { FormInput, FormSelect, FormTextarea } from '@/shared/components/forms'
import { abonoSchema, TIPO_ABONO_OPTIONS, type AbonoFormValues } from '../schemas/abono.schema'
import type { CreditoAbono } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface AbonoFormProps {
  credito: CreditoAbono
  onSuccess: (data: AbonoFormValues) => void
  onCancel: () => void
}

export function AbonoForm({ credito, onSuccess, onCancel }: AbonoFormProps) {
  const { control, handleSubmit } = useForm<AbonoFormValues>({
    resolver: zodResolver(abonoSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { tipo: 'interes', monto: '', notas: '' },
  })

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-4">
      <div className="rounded-xl bg-foreground/5 px-4 py-3 text-sm">
        <p className="font-medium text-foreground">{credito.cliente} · Crédito #{credito.numero}</p>
        <p className="text-foreground/60 mt-0.5">
          Saldo capital: {currency.format(credito.saldoCapital)} · Intereses: {currency.format(credito.interesesPendientes)}
        </p>
      </div>

      <FormSelect<AbonoFormValues>
        name="tipo" control={control}
        label="Tipo de abono *" placeholder="Seleccionar..."
        options={[...TIPO_ABONO_OPTIONS]}
      />
      <FormInput<AbonoFormValues>
        name="monto" control={control}
        label="Monto a abonar *" placeholder="$" type="number"
      />
      <FormTextarea<AbonoFormValues>
        name="notas" control={control}
        label="Notas" placeholder="Ej: Pago parcial de intereses"
      />

      <div className="flex justify-end gap-2 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" className="bg-emerald-600! hover:bg-emerald-700!">Registrar Abono</Button>
      </div>
    </form>
  )
}
