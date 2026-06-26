import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { MdInfoOutline, MdLink, MdSave } from 'react-icons/md'
import { FormInput } from '@/shared/components/forms/FormInput'
import { alert } from '@/shared/utils/alert'
import {
  integracionEducacionSchema,
  type IntegracionEducacionValues,
} from '../schemas/configuracion.schema'

export function IntegracionEducacionForm() {
  const [isSaving, setIsSaving] = useState(false)

  const { control, handleSubmit } = useForm<IntegracionEducacionValues>({
    resolver: zodResolver(integracionEducacionSchema),
    defaultValues: { urlIntegracion: '', tokenAcceso: '' },
  })

  const onSubmit = async (_data: IntegracionEducacionValues) => {
    setIsSaving(true)
    alert.loading('Guardando integración...')
    await new Promise((r) => setTimeout(r, 800))
    alert.closeLoading()
    setIsSaving(false)
    alert.toast('Integración guardada correctamente')
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 p-5 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
          <MdLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Integración con Secretaría de Educación
          </h2>
          <p className="text-xs text-foreground/50 mt-0.5">
            Conecta con el sistema externo para acceso a información
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5 flex flex-col gap-4">
          {/* Info callout */}
          <div className="flex items-start gap-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/30 dark:text-blue-400 px-4 py-3 text-xs">
            <MdInfoOutline className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Esta integración permite el acceso a información para la Secretaría de Educación
              según lo requerido.
            </span>
          </div>

          <FormInput<IntegracionEducacionValues>
            name="urlIntegracion"
            control={control}
            label="URL de Integración"
            placeholder="https://api.educacion.gov.co/v1"
            type="url"
          />

          <FormInput<IntegracionEducacionValues>
            name="tokenAcceso"
            control={control}
            label="Token de Acceso"
            placeholder="Token de autenticación"
            type="password"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end px-5 pb-5">
          <Button type="submit" variant="primary" isDisabled={isSaving} className="gap-1.5">
            <MdSave className="w-4 h-4" />
            {isSaving ? 'Guardando...' : 'Guardar integración'}
          </Button>
        </div>
      </form>
    </div>
  )
}
