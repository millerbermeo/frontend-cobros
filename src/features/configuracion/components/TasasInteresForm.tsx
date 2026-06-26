import { useState } from 'react'
import { useForm, useWatch, Controller, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { TextField, Label, Input, FieldError } from '@heroui/react'
import { MdPercent, MdWarningAmber, MdSave } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import { alert } from '@/shared/utils/alert'
import { tasasInteresSchema, type TasasInteresValues } from '../schemas/configuracion.schema'

const TASA_FIELDS: { name: keyof TasasInteresValues; label: string }[] = [
  { name: 'tasaTarjeta', label: 'Préstamo con Tarjeta (%)' },
  { name: 'tasaPignoracion', label: 'Préstamo con Pignoración (%)' },
  { name: 'tasaHipotecario', label: 'Préstamo Hipotecario (%)' },
  { name: 'tasaEfectivo', label: 'Préstamo en Efectivo (%)' },
]

export function TasasInteresForm() {
  const [isSaving, setIsSaving] = useState(false)

  const { control, handleSubmit } = useForm<TasasInteresValues>({
    resolver: zodResolver(tasasInteresSchema) as Resolver<TasasInteresValues>,
    defaultValues: {
      tasaTarjeta: 3.5,
      tasaPignoracion: 2.5,
      tasaHipotecario: 2.0,
      tasaEfectivo: 4.0,
    },
  })

  const watched = useWatch({ control })
  const showWarning = TASA_FIELDS.some(({ name }) => {
    const v = Number(watched[name])
    return !isNaN(v) && v > 0 && v < 3
  })

  const onSubmit = async (_data: TasasInteresValues) => {
    setIsSaving(true)
    alert.loading('Guardando tasas...')
    await new Promise((r) => setTimeout(r, 800))
    alert.closeLoading()
    setIsSaving(false)
    alert.toast('Tasas de interés guardadas')
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 p-5 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
          <MdPercent className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">Tasas de Interés</h2>
          <p className="text-xs text-foreground/50 mt-0.5">
            Configure las tasas predeterminadas por tipo de crédito
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TASA_FIELDS.map(({ name, label }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  value={String(field.value ?? '')}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={!!fieldState.error}
                  className="flex flex-col gap-1"
                >
                  <Label className="text-xs font-medium text-foreground/70">{label}</Label>
                  <Input
                    ref={field.ref}
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder="0.0"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/30 aria-invalid:border-danger aria-invalid:ring-danger/20"
                  />
                  <FieldError className="text-xs text-danger">{fieldState.error?.message}</FieldError>
                </TextField>
              )}
            />
          ))}
        </div>

        {/* Warning */}
        <div
          className={cn(
            'mx-5 mb-5 flex items-start gap-2.5 rounded-xl px-4 py-3 text-xs transition-all duration-300',
            'bg-amber-50 border border-amber-200 text-amber-700',
            'dark:bg-amber-500/10 dark:border-amber-500/30 dark:text-amber-400',
            showWarning ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 py-0 mb-0 overflow-hidden',
          )}
          aria-hidden={!showWarning}
        >
          <MdWarningAmber className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Las tasas inferiores al 3% requieren autorización especial del{' '}
            <strong>Administrador</strong>
          </span>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 pb-5">
          <Button type="submit" variant="primary" isDisabled={isSaving} className="gap-1.5">
            <MdSave className="w-4 h-4" />
            {isSaving ? 'Guardando...' : 'Guardar tasas'}
          </Button>
        </div>
      </form>
    </div>
  )
}
