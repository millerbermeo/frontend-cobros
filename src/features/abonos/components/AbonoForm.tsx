import { useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { MdAdd } from 'react-icons/md'
import { FormMoneyInput, FormTextarea } from '@/shared/components/forms'
import { Spinner } from '@/shared/components/loaders/Spinner'
import { createAbonoSchema, type AbonoFormValues } from '../schemas/abono.schema'
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
  const schema = useMemo(() => createAbonoSchema(credito), [credito])
  const { control, handleSubmit } = useForm<AbonoFormValues>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { tipo: 'interes', monto: '', montoInteres: '', montoCapital: '', notas: '' },
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

      {tipo === 'ambos' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <FormMoneyInput<AbonoFormValues>
              name="montoInteres" control={control}
              label="Monto a Interés *" placeholder="0"
            />
            <p className="text-xs text-foreground/50">Pendiente: {currency.format(credito.outstanding_interest)}</p>
          </div>
          <div className="flex flex-col gap-1">
            <FormMoneyInput<AbonoFormValues>
              name="montoCapital" control={control}
              label="Monto a Capital *" placeholder="0"
            />
            <p className="text-xs text-foreground/50">Saldo: {currency.format(credito.outstanding_principal)}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <FormMoneyInput<AbonoFormValues>
            name="monto" control={control}
            label="Monto del Abono *" placeholder="0"
          />
          <p className="text-xs text-foreground/50">Máximo: {currency.format(maxParaTipo(tipo, credito))}</p>
        </div>
      )}

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
