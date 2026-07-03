import { Controller, type Control } from 'react-hook-form'
import { cn } from '@/shared/utils/cn'
import { TIPO_ABONO_OPTIONS, type AbonoFormValues } from '../schemas/abono.schema'
import type { CreditoActivo } from '../types/abonos.types'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface AbonoTipoSelectorProps {
  control: Control<AbonoFormValues>
  credito: CreditoActivo
}

function subtitleFor(value: string, credito: CreditoActivo): string {
  if (value === 'interes') return `Pendiente: ${currency.format(credito.outstanding_interest)}`
  if (value === 'capital') return `Saldo: ${currency.format(credito.outstanding_principal)}`
  return 'Abono combinado'
}

export function AbonoTipoSelector({ control, credito }: AbonoTipoSelectorProps) {
  return (
    <Controller
      name="tipo"
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Tipo de Abono *</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIPO_ABONO_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => field.onChange(opt.value)}
                className={cn(
                  'text-left rounded-xl border px-4 py-3 transition-colors',
                  field.value === opt.value
                    ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                    : 'border-border hover:border-primary/40',
                )}
              >
                <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-foreground/50 mt-0.5">{subtitleFor(opt.value, credito)}</p>
              </button>
            ))}
          </div>
          {fieldState.error && <p className="text-sm text-danger mt-1.5">{fieldState.error.message}</p>}
        </div>
      )}
    />
  )
}
