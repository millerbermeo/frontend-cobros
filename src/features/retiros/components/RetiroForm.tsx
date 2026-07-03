import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { MdPersonOutline, MdBadge } from 'react-icons/md'
import { FormInput, FormMoneyInput, CustomerSearchSelect } from '@/shared/components/forms'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { retiroSchema, type RetiroFormValues } from '../schemas/retiro.schema'

interface RetiroFormProps {
  onSuccess: (data: RetiroFormValues) => void
  onCancel: () => void
  isSubmitting?: boolean
}

function nowParts() {
  const d = new Date()
  return { fecha: d.toISOString().slice(0, 10), hora: d.toTimeString().slice(0, 5) }
}

function initials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join('').toUpperCase()
}

export function RetiroForm({ onSuccess, onCancel, isSubmitting = false }: RetiroFormProps) {
  const authUser = useAuthStore((s) => s.user)
  const { fecha, hora } = nowParts()

  const { control, handleSubmit, setValue } = useForm<RetiroFormValues>({
    resolver: zodResolver(retiroSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      cliente: '', documento: '', fecha, hora, monto: '', concepto: '',
      realizadoPor: '', autorizadoPor: authUser?.name ?? '',
    },
  })

  const cliente = useWatch({ control, name: 'cliente' })
  const documento = useWatch({ control, name: 'documento' })

  const handleSelectCliente = ({ name, document }: { name: string; document: string }) => {
    setValue('cliente', name, { shouldValidate: true })
    setValue('documento', document, { shouldValidate: true })
  }

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-foreground">Cliente *</label>
        <CustomerSearchSelect onSelect={handleSelectCliente} />
        {cliente ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-primary/5 px-4 py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <span className="text-sm font-bold text-primary">{initials(cliente)}</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{cliente}</p>
              <p className="flex items-center gap-1 text-xs text-foreground/50">
                <MdBadge className="h-3.5 w-3.5" />
                {documento || '—'}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-background/40 px-4 py-3">
            <MdPersonOutline className="h-5 w-5 text-foreground/30" />
            <p className="text-sm text-foreground/40">Ningún cliente seleccionado</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormInput<RetiroFormValues> name="fecha" control={control} label="Fecha *" type="date" isRequired />
        <FormInput<RetiroFormValues> name="hora" control={control} label="Hora *" type="time" isRequired />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormMoneyInput<RetiroFormValues> name="monto" control={control} label="Monto *" placeholder="$ 0" isRequired />
        <FormInput<RetiroFormValues> name="concepto" control={control} label="Concepto *" placeholder="Ej: Desembolso crédito, gastos operativos" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormInput<RetiroFormValues> name="autorizadoPor" control={control} label="Autorizado por *" placeholder="Nombre" isDisabled />
        <FormInput<RetiroFormValues> name="realizadoPor" control={control} label="Realizado por *" placeholder="Nombre de quien realiza el retiro" />
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border">
        <Button type="button" variant="ghost" onPress={onCancel} isDisabled={isSubmitting}>Cancelar</Button>
        <Button type="submit" variant="primary" className="bg-emerald-600! hover:bg-emerald-700!" isDisabled={isSubmitting}>
          Registrar Retiro
        </Button>
      </div>
    </form>
  )
}
