import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import { TextField, Label, TextArea, FieldError } from '@heroui/react'

interface FormTextareaProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  rules?: Omit<RegisterOptions<T, Path<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  label?: string
  placeholder?: string
  rows?: number
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
}

export function FormTextarea<T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  rows = 3,
  isRequired,
  isDisabled,
  className,
}: FormTextareaProps<T>) {
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
          <TextArea placeholder={placeholder} rows={rows} ref={field.ref} />
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  )
}
