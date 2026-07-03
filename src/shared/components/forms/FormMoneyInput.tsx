import { useState } from 'react'
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import { TextField, Label, Input } from '@heroui/react'
import { cn } from '@/shared/utils/cn'
import { formatMoneyTyping, moneyToDisplay } from '@/shared/utils/currency'

interface FormMoneyInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}

interface MoneyFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>
  error?: string
  label?: string
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}

function MoneyField<T extends FieldValues>({
  field,
  error,
  label,
  placeholder,
  isRequired,
  isDisabled,
  className,
}: MoneyFieldProps<T>) {
  // Texto visible: preserva la coma final mientras se teclean decimales.
  const [display, setDisplay] = useState(() => moneyToDisplay(field.value as string))

  const handleChange = (raw: string) => {
    const { display: shown, canonical } = formatMoneyTyping(raw)
    setDisplay(shown)
    field.onChange(canonical)
  }

  return (
    <TextField isInvalid={!!error} isRequired={isRequired} isDisabled={isDisabled} className={className}>
      {label && <Label>{label}</Label>}
      <Input
        inputMode="decimal"
        placeholder={placeholder}
        value={display}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={field.onBlur}
        ref={field.ref}
        className={cn(
          error &&
            'border-danger focus:border-danger data-[focused=true]:border-danger ring-danger/30 focus:ring-danger/30 data-[focused=true]:ring-danger/30',
        )}
      />
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </TextField>
  )
}

/**
 * Input de precio en COP. Formatea mientras se escribe (miles con punto, decimales
 * con coma, máx 2) y guarda en el formulario el valor limpio (canónico) listo para el
 * backend: "10000000.50". Ver `@/shared/utils/currency`.
 */
export function FormMoneyInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  isRequired,
  isDisabled,
  className,
}: FormMoneyInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MoneyField<T>
          field={field}
          error={fieldState.error?.message}
          label={label}
          placeholder={placeholder}
          isRequired={isRequired}
          isDisabled={isDisabled}
          className={className}
        />
      )}
    />
  )
}
