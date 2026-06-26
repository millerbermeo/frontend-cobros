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
import type { Usuario } from '../types/usuarios.types'

const SELECT_CLASS =
  'border border-border rounded-lg px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-full'

interface UsuarioFormProps {
  usuario?: Usuario | null
  roles: string[]
  onSuccess: (data: CreateUsuarioValues | EditUsuarioValues) => void
  onCancel: () => void
  isPending?: boolean
}

export function UsuarioForm({ usuario, roles, onSuccess, onCancel, isPending }: UsuarioFormProps) {
  const isEdit = !!usuario

  const createForm = useForm<CreateUsuarioValues>({
    resolver: zodResolver(createUsuarioSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { name: '', username: '', pass: '', rol: 'Cobrador', state: 1 },
  })

  const editForm = useForm<EditUsuarioValues>({
    resolver: zodResolver(editUsuarioSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { name: '', username: '', pass: '', rol: 'Cobrador', state: 1 },
  })

  useEffect(() => {
    if (usuario) {
      editForm.reset({
        name:     usuario.name,
        username: usuario.username,
        pass:     '',
        rol:      usuario.rol,
        state:    usuario.state,
      })
    } else {
      createForm.reset()
    }
  }, [usuario]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isEdit) {
    return (
      <form onSubmit={editForm.handleSubmit(onSuccess)} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <FormInput<EditUsuarioValues>
            name="name" control={editForm.control}
            label="Nombre" placeholder="Juan Pérez" isRequired
          />
          <FormInput<EditUsuarioValues>
            name="username" control={editForm.control}
            label="Username" placeholder="juan123" isRequired
          />
        </div>

        <FormInput<EditUsuarioValues>
          name="pass" control={editForm.control}
          label="Contraseña" placeholder="Dejar vacío para no cambiar"
          type="password"
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Rol <span className="text-danger">*</span></label>
            <select {...editForm.register('rol')} className={SELECT_CLASS}>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            {editForm.formState.errors.rol && (
              <p className="text-xs text-danger">{editForm.formState.errors.rol.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Estado <span className="text-danger">*</span></label>
            <select
              {...editForm.register('state', { valueAsNumber: true })}
              className={SELECT_CLASS}
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
          <Button type="button" variant="ghost" onPress={onCancel} isDisabled={isPending}>Cancelar</Button>
          <Button type="submit" variant="primary" isDisabled={isPending}>
            {isPending ? 'Guardando...' : 'Guardar cambios'}
          </Button>
        </div>
      </form>
    )
  }

  return (
    <form onSubmit={createForm.handleSubmit(onSuccess)} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <FormInput<CreateUsuarioValues>
          name="name" control={createForm.control}
          label="Nombre" placeholder="Juan Pérez" isRequired
        />
        <FormInput<CreateUsuarioValues>
          name="username" control={createForm.control}
          label="Username" placeholder="juan123" isRequired
        />
      </div>

      <FormInput<CreateUsuarioValues>
        name="pass" control={createForm.control}
        label="Contraseña" placeholder="Mínimo 6 caracteres"
        type="password" isRequired
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground">Rol <span className="text-danger">*</span></label>
        <select {...createForm.register('rol')} className={SELECT_CLASS}>
          {roles.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        {createForm.formState.errors.rol && (
          <p className="text-xs text-danger">{createForm.formState.errors.rol.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-border mt-2">
        <Button type="button" variant="ghost" onPress={onCancel} isDisabled={isPending}>Cancelar</Button>
        <Button type="submit" variant="primary" isDisabled={isPending}>
          {isPending ? 'Creando...' : 'Crear usuario'}
        </Button>
      </div>
    </form>
  )
}
