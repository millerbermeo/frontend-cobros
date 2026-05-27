import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { RadioGroup, Radio, Label, FieldError } from '@heroui/react'

export interface RadioOption {
  label: string
  value: string
}

interface FormRadioGroupProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  options: RadioOption[]
  orientation?: 'horizontal' | 'vertical'
  isRequired?: boolean
  isDisabled?: boolean
}

export function FormRadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  options,
  orientation = 'vertical',
  isRequired,
  isDisabled,
}: FormRadioGroupProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <RadioGroup
          value={field.value}
          onChange={field.onChange}
          orientation={orientation}
          isInvalid={!!fieldState.error}
          isRequired={isRequired}
          isDisabled={isDisabled}
        >
          {label && <Label>{label}</Label>}
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
          <FieldError>{fieldState.error?.message}</FieldError>
        </RadioGroup>
      )}
    />
  )
}
