import { useRef } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { MdUploadFile, MdClose } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'

interface FormFileUploadProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  description?: string
}

export function FormFileUpload<T extends FieldValues>({
  name,
  control,
  label,
  accept,
  multiple = false,
  maxSizeMB = 5,
  description,
}: FormFileUploadProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const files = field.value as FileList | null
        const fileList = files ? Array.from(files) : []

        const handleClear = (e: React.MouseEvent) => {
          e.stopPropagation()
          field.onChange(null)
          if (inputRef.current) inputRef.current.value = ''
        }

        return (
          <div className="flex flex-col gap-1">
            {label && (
              <label className="text-sm font-medium">
                {label}
              </label>
            )}
            <div
              role="button"
              tabIndex={0}
              className={cn(
                'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors',
                'hover:border-primary hover:bg-primary/5',
                fieldState.error ? 'border-danger bg-danger/5' : 'border-border'
              )}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            >
              <MdUploadFile className="w-8 h-8 mx-auto mb-2 text-muted" />

              {fileList.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {fileList.map((file, i) => (
                    <span key={i} className="text-sm font-medium text-foreground">
                      {file.name}
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={handleClear}
                    className="mx-auto mt-2 text-muted hover:text-danger transition-colors"
                  >
                    <MdClose className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted">
                    {description ?? 'Haz clic o arrastra un archivo aquí'}
                  </p>
                  {accept && (
                    <p className="text-xs text-muted mt-1">Tipos: {accept}</p>
                  )}
                  <p className="text-xs text-muted mt-1">Máximo {maxSizeMB}MB</p>
                </>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              className="hidden"
              onChange={(e) => {
                const selected = e.target.files
                if (!selected) return
                const valid = Array.from(selected).filter(
                  (f) => f.size <= maxSizeMB * 1024 * 1024
                )
                if (valid.length === 0) {
                  field.onChange(null)
                  return
                }
                const dt = new DataTransfer()
                valid.forEach((f) => dt.items.add(f))
                field.onChange(dt.files)
              }}
              onBlur={field.onBlur}
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
