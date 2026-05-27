import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@heroui/react'
import { FormInput } from '@/shared/components/forms/FormInput'
import {
  createUsuarioSchema,
  editUsuarioSchema,
  type CreateUsuarioValues,
  type EditUsuarioValues,
} from '../schemas/usuario.schema'
import type { Usuario, RolUsuario, EstadoUsuario } from '../types/usuarios.types'

const ROL_OPTIONS: { value: RolUsuario; label: string }[] = [
  { value: 'admin',      label: 'Administrador' },
  { value: 'supervisor', label: 'Supervisor'    },
  { value: 'cobrador',   label: 'Cobrador'      },
  { value: 'auditor',    label: 'Auditor'       },
]

const ESTADO_OPTIONS: { value: EstadoUsuario; label: string }[] = [
  { value: 'activo',   label: 'Activo'   },
  { value: 'inactivo', label: 'Inactivo' },
]

const SELECT_CLASS =
  'border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-full'

interface UsuarioFormProps {
  usuario?: Usuario | null
  onSuccess: (data: CreateUsuarioValues | EditUsuarioValues) => void
  onCancel: () => void
}

export function UsuarioForm({ usuario, onSuccess, onCancel }: UsuarioFormProps) {
  const isEdit = !!usuario

  const createForm = useForm<CreateUsuarioValues>({
    resolver: zodResolver(createUsuarioSchema),
    defaultValues: { nombre: '', username: '', email: '', rol: 'cobrador', password: '', confirmPassword: '' },
  })

  const editForm = useForm<EditUsuarioValues>({
    resolver: zodResolver(editUsuarioSchema),
    defaultValues: { nombre: '', username: '', email: '', rol: 'cobrador', estado: 'activo' },
  })

  useEffect(() => {
    if (usuario) {
      editForm.reset({
        nombre:   usuario.nombre,
        username: usuario.username ?? '',
        email:    usuario.email,
        rol:      usuario.rol,
        estado:   usuario.estado,
      })
    } else {
      createForm.reset()
    }
  }, [usuario]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isEdit) {
    return (
      <form onSubmit={editForm.handleSubmit(onSuccess)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <FormInput<EditUsuarioValues> name="nombre"   control={editForm.control} label="Nombre"   placeholder="Juan"       isRequired />
          <FormInput<EditUsuarioValues> name="username" control={editForm.control} label="Username" placeholder="juan123"             />
        </div>
        <FormInput<EditUsuarioValues> name="email" control={editForm.control} label="Correo electrónico" placeholder="usuario@cobros.com" type="email" isRequired />

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Rol</label>
            <select {...editForm.register('rol')} className={SELECT_CLASS}>
              {ROL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Estado</label>
            <select {...editForm.register('estado')} className={SELECT_CLASS}>
              {ESTADO_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
          <Button type="button" variant="ghost" onPress={onCancel}>Cancelar</Button>
          <Button type="submit" variant="primary">Guardar cambios</Button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={createForm.handleSubmit(onSuccess)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <FormInput<CreateUsuarioValues> name="nombre"   control={createForm.control} label="Nombre"   placeholder="Juan"   isRequired />
        <FormInput<CreateUsuarioValues> name="username" control={createForm.control} label="Username" placeholder="juan123"          />
      </div>
      <FormInput<CreateUsuarioValues> name="email" control={createForm.control} label="Correo electrónico" placeholder="usuario@cobros.com" type="email" isRequired />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground">Rol</label>
        <select {...createForm.register('rol')} className={SELECT_CLASS}>
          {ROL_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <FormInput<CreateUsuarioValues> name="password"        control={createForm.control} label="Contraseña"          placeholder="Mínimo 8 caracteres" type="password" isRequired />
        <FormInput<CreateUsuarioValues> name="confirmPassword" control={createForm.control} label="Confirmar contraseña" placeholder="Repite la contraseña" type="password" isRequired />
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
        <Button type="button" variant="ghost" onPress={onCancel}>Cancelar</Button>
        <Button type="submit" variant="primary">Crear usuario</Button>
      </div>
    </form>
  )
}
