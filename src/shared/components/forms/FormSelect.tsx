import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import ReactSelect, { type MultiValue, type SingleValue } from 'react-select'

export interface SelectOption {
  label: string
  value: string | number
}

interface FormSelectProps<T extends FieldValues, IsMulti extends boolean = false> {
  name: Path<T>
  control: Control<T>
  options?: SelectOption[]
  label?: string
  placeholder?: string
  isMulti?: IsMulti
  isDisabled?: boolean
  isClearable?: boolean
  isSearchable?: boolean
}

export function FormSelect<T extends FieldValues, IsMulti extends boolean = false>({
  name,
  control,
  options = [],
  label,
  placeholder,
  isMulti,
  isDisabled,
  isClearable,
  isSearchable = true,
}: FormSelectProps<T, IsMulti>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedValue = isMulti
          ? options.filter((opt) =>
              (field.value as (string | number)[])?.includes(opt.value)
            )
          : (options.find((opt) => opt.value === field.value) ?? null)

        const handleChange = (
          selected: MultiValue<SelectOption> | SingleValue<SelectOption>
        ) => {
          if (isMulti) {
            field.onChange((selected as MultiValue<SelectOption>).map((o) => o.value))
          } else {
            field.onChange((selected as SingleValue<SelectOption>)?.value ?? null)
          }
        }

        return (
          <div className="flex flex-col gap-1">
            {label && (
              <label htmlFor={name} className="text-sm font-medium text-foreground">
                {label}
              </label>
            )}
            <ReactSelect
              inputId={name}
              options={options}
              value={selectedValue}
              onChange={handleChange}
              onBlur={field.onBlur}
              isMulti={isMulti}
              isDisabled={isDisabled}
              isClearable={isClearable}
              isSearchable={isSearchable}
              placeholder={placeholder}
              classNamePrefix="react-select"
            />
            {fieldState.error && (
              <p className="text-xs text-danger">{fieldState.error.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}
