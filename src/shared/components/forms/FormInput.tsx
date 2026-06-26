import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import { TextField, Label, Input } from '@heroui/react'
import { cn } from '@/shared/utils/cn'

interface FormInputProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  label?: string
  placeholder?: string
  type?: string
  isRequired?: boolean
  isDisabled?: boolean
  description?: string
  className?: string
}

export function FormInput<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  type = 'text',
  isRequired,
  isDisabled,
  className,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <TextField
          name={field.name}
          value={field.value ?? ''}
          onChange={field.onChange}
          onBlur={field.onBlur}
          isInvalid={!!fieldState.error}
          isRequired={isRequired}
          isDisabled={isDisabled}
          className={className}
        >
          {label && <Label>{label}</Label>}
          <Input
            type={type}
            placeholder={placeholder}
            ref={field.ref}
            className={cn(
              fieldState.error &&
                'border-danger focus:border-danger data-[focused=true]:border-danger ring-danger/30 focus:ring-danger/30 data-[focused=true]:ring-danger/30',
            )}
          />
          {fieldState.error && (
            <p className="text-sm text-danger mt-1">{fieldState.error.message}</p>
          )}
        </TextField>
      )}
    />
  )
}
