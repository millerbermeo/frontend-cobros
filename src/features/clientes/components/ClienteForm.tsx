import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { FormInput } from '@/shared/components/forms/FormInput'
import { clienteSchema, type ClienteFormValues } from '../schemas/cliente.schema'
import type { Cliente } from '../types/clientes.types'

const TIPO_IDENTIFICACION_OPTIONS = [
  { value: 'cedula',            label: 'Cédula de ciudadanía'  },
  { value: 'cedula_extranjeria', label: 'Cédula de extranjería' },
  { value: 'pasaporte',         label: 'Pasaporte'             },
  { value: 'nit',               label: 'NIT'                   },
  { value: 'tarjeta_identidad', label: 'Tarjeta de identidad'  },
]

const SELECT_CLASS =
  'border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-full'

interface ClienteFormProps {
  cliente?: Cliente | null
  onSuccess: (data: ClienteFormValues) => void
  onCancel: () => void
}

export function ClienteForm({ cliente, onSuccess, onCancel }: ClienteFormProps) {
  const isEdit = !!cliente

  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nombre: '',
      apellidos: '',
      tipoIdentificacion: 'cedula',
      numeroIdentificacion: '',
      direccion: '',
      telefono: '',
      correo: '',
      recomendadoPor: '',
      telefonoAdicional: '',
      tipoTrabajo: '',
      entidadTrabajo: '',
      fuenteIngresos: '',
    },
  })

  useEffect(() => {
    if (cliente) {
      reset({
        nombre: cliente.nombre,
        apellidos: cliente.apellidos,
        tipoIdentificacion: cliente.tipoIdentificacion,
        numeroIdentificacion: cliente.numeroIdentificacion,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo ?? '',
        recomendadoPor: cliente.recomendadoPor ?? '',
        telefonoAdicional: cliente.telefonoAdicional ?? '',
        tipoTrabajo: cliente.tipoTrabajo,
        entidadTrabajo: cliente.entidadTrabajo,
        fuenteIngresos: cliente.fuenteIngresos ?? '',
      })
    } else {
      reset()
    }
  }, [cliente]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form onSubmit={handleSubmit(onSuccess)} className="flex flex-col gap-4">
      {/* Nombre y Apellidos */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="nombre"
          control={control}
          label="Nombre"
          placeholder="Juan"
          isRequired
        />
        <FormInput<ClienteFormValues>
          name="apellidos"
          control={control}
          label="Apellidos"
          placeholder="Pérez García"
          isRequired
        />
      </div>

      {/* Tipo y Número de Identificación */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Tipo de identificación <span className="text-danger">*</span>
          </label>
          <select {...register('tipoIdentificacion')} className={SELECT_CLASS}>
            {TIPO_IDENTIFICACION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.tipoIdentificacion && (
            <p className="text-xs text-danger">{errors.tipoIdentificacion.message}</p>
          )}
        </div>
        <FormInput<ClienteFormValues>
          name="numeroIdentificacion"
          control={control}
          label="Número de identificación"
          placeholder="1234567890"
          isRequired
        />
      </div>

      {/* Dirección */}
      <FormInput<ClienteFormValues>
        name="direccion"
        control={control}
        label="Dirección"
        placeholder="Calle 123 # 45-67, Barrio, Ciudad"
        isRequired
      />

      {/* Teléfono y Correo */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="telefono"
          control={control}
          label="Teléfono"
          placeholder="3001234567"
          isRequired
        />
        <FormInput<ClienteFormValues>
          name="correo"
          control={control}
          label="Correo electrónico"
          placeholder="cliente@ejemplo.com"
          type="email"
        />
      </div>

      {/* Recomendado Por y Teléfono Adicional */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="recomendadoPor"
          control={control}
          label="Recomendado por"
          placeholder="Nombre del referido"
        />
        <FormInput<ClienteFormValues>
          name="telefonoAdicional"
          control={control}
          label="Teléfono adicional"
          placeholder="3009876543"
        />
      </div>

      {/* Información Laboral */}
      <div className="grid grid-cols-2 gap-3">
        <FormInput<ClienteFormValues>
          name="tipoTrabajo"
          control={control}
          label="Tipo de trabajo"
          placeholder="Empleado, Independiente..."
          isRequired
        />
        <FormInput<ClienteFormValues>
          name="entidadTrabajo"
          control={control}
          label="Entidad donde trabaja"
          placeholder="Nombre de la empresa"
          isRequired
        />
      </div>

      {/* Fuente de Ingresos */}
      <FormInput<ClienteFormValues>
        name="fuenteIngresos"
        control={control}
        label="Fuente de ingresos"
        placeholder="Salario, honorarios, arriendo..."
      />

      {/* Botones */}
      <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
        <Button type="button" variant="ghost" onPress={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          {isEdit ? 'Actualizar cliente' : 'Registrar cliente'}
        </Button>
      </div>
    </form>
  )
}
