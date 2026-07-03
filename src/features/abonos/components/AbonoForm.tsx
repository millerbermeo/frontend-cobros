import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { MdAdd } from 'react-icons/md'
import { FormMoneyInput, FormTextarea } from '@/shared/components/forms'
import { Spinner } from '@/shared/components/loaders/Spinner'
import { abonoSchema, type AbonoFormValues } from '../schemas/abono.schema'
import { useCreditoConRetiros } from '../hooks/useAbonos'
import { AbonoCreditoInfoCard } from './AbonoCreditoInfoCard'
import { AbonoRetirosCard } from './AbonoRetirosCard'
import { AbonoTipoSelector } from './AbonoTipoSelector'
import type { CreditoActivo } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface AbonoFormProps {
  credito: CreditoActivo
  onSuccess: (data: AbonoFormValues) => void
  onCancel: () => void
}

function maxParaTipo(tipo: string, credito: CreditoActivo): number {
  if (tipo === 'capital') return credito.outstanding_principal
  if (tipo === 'ambos') return credito.outstanding_principal + credito.outstanding_interest
  return credito.outstanding_interest
}

export function AbonoForm({ credito, onSuccess, onCancel }: AbonoFormProps) {
  const { data, isLoading } = useCreditoConRetiros(credito.id)
  const { control, handleSubmit } = useForm<AbonoFormValues>({
    resolver: zodResolver(abonoSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { tipo: 'interes', monto: '', notas: '' },
  })

  const tipo = useWatch({ control, name: 'tipo' })
  const retiros = data?.retiros_disponibles ?? []
  const totalDisponible = data?.total_disponible ?? 0

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-5">
      <p className="text-sm text-foreground/50 -mt-2">Complete la información del abono a realizar</p>

      <AbonoCreditoInfoCard credito={credito} />

      {isLoading ? (
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      ) : (
        retiros.length > 0 && <AbonoRetirosCard retiros={retiros} total={totalDisponible} />
      )}

      <AbonoTipoSelector control={control} credito={credito} />

      <div className="flex flex-col gap-1">
        <FormMoneyInput<AbonoFormValues>
          name="monto" control={control}
          label="Monto del Abono *" placeholder="0"
        />
        <p className="text-xs text-foreground/50">Máximo: {currency.format(maxParaTipo(tipo, credito))}</p>
      </div>

      <FormTextarea<AbonoFormValues>
        name="notas" control={control}
        label="Notas (opcional)" placeholder="Ingrese notas o comentarios adicionales sobre este abono..."
      />

      <div className="flex justify-end gap-2 pt-3 border-t border-border">
        <Button type="button" variant="ghost" onPress={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary" className="gap-1.5 bg-emerald-600! hover:bg-emerald-700!">
          <MdAdd className="h-4 w-4" /> Registrar Abono
        </Button>
      </div>
    </form>
  )
}
