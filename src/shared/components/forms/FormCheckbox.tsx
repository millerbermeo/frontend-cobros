import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Checkbox, FieldError } from '@heroui/react'
import type { ReactNode } from 'react'

interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  children?: ReactNode
  isDisabled?: boolean
  className?: string
}

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  children,
  isDisabled,
  className,
}: FormCheckboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          <Checkbox
            isSelected={!!field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isDisabled={isDisabled}
            isInvalid={!!fieldState.error}
            className={className}
          >
            {children}
          </Checkbox>
          <FieldError>{fieldState.error?.message}</FieldError>
        </div>
      )}
    />
  )
}
