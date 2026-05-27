import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form'
import { TextField, Label, Input, FieldError } from '@heroui/react'

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
          <Input type={type} placeholder={placeholder} ref={field.ref} />
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    />
  )
}
