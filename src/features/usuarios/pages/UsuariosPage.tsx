import { useState } from 'react'
import { Button } from '@heroui/react'
import { MdPersonAdd, MdEdit, MdAdminPanelSettings } from 'react-icons/md'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { cn } from '@/shared/utils/cn'
import { useUsuarios, useCreateUsuario, useUpdateUsuario } from '../hooks/useUsuarios'
import { UsuarioForm } from '../components/UsuarioForm'
import type { Usuario } from '../types/usuarios.types'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

const STATE_CONFIG: Record<number, { label: string; className: string; dot: string }> = {
  1: { label: 'Activo',   className: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/15', dot: 'bg-emerald-500'   },
  0: { label: 'Inactivo', className: 'text-foreground/40 bg-foreground/5',                    dot: 'bg-foreground/30' },
}

const ROL_COLORS: Record<string, string> = {
  Administrador: 'text-violet-600 bg-violet-50 dark:bg-violet-500/15',
  Supervisor:    'text-blue-600   bg-blue-50   dark:bg-blue-500/15',
  Cobrador:      'text-amber-600  bg-amber-50  dark:bg-amber-500/15',
  Auditor:       'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/15',
  Asesor:        'text-teal-600   bg-teal-50   dark:bg-teal-500/15',
}

const columns: Column<Record<string, unknown>>[] = [
  {
    key: 'name',
    label: 'Usuario',
    sortable: true,
    render: (_, row) => {
      const u = row as unknown as Usuario
      const initials = u.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-primary">{initials}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{u.name}</p>
            <p className="text-xs text-foreground/40 font-mono">@{u.username}</p>
          </div>
        </div>
      )
    },
  },
  {
    key: 'rol',
    label: 'Rol',
    render: (val) => {
      const rol = String(val)
      const cls = ROL_COLORS[rol] ?? 'text-foreground/50 bg-foreground/5'
      return <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cls)}>{rol}</span>
    },
  },
  {
    key: 'state',
    label: 'Estado',
    render: (val) => {
      const cfg = STATE_CONFIG[val as number] ?? STATE_CONFIG[0]
      return (
        <span className={cn('flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit', cfg.className)}>
          <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
          {cfg.label}
        </span>
      )
    },
  },
]

export function UsuariosPage() {
  const { open, close } = useModal()
  const [page, setPage] = useState(1)

  const { data: response, isLoading } = useUsuarios(page)
  const { mutate: createUsuario, isPending: isCreating } = useCreateUsuario()
  const { mutate: updateUsuario, isPending: isUpdating } = useUpdateUsuario()

  const usuarios   = response?.data       ?? []
  const roles      = response?.roles      ?? []
  const pagination = response?.pagination

  const handleCreate = (data: CreateUsuarioValues | EditUsuarioValues) => {
    createUsuario(data as CreateUsuarioValues, {
      onSuccess: () => { close(); alert.toast('Usuario creado correctamente') },
      onError:   () => alert.toast('Error al crear el usuario', 'error'),
    })
  }

  const handleEdit = (usuario: Usuario) => (data: CreateUsuarioValues | EditUsuarioValues) => {
    updateUsuario({ id: usuario.id, data: data as EditUsuarioValues }, {
      onSuccess: () => { close(); alert.toast('Usuario actualizado correctamente') },
      onError:   () => alert.toast('Error al actualizar el usuario', 'error'),
    })
  }

  const openCreate = () => {
    open({
      title: 'Nuevo usuario',
      size: 'sm',
      content: (
        <UsuarioForm
          roles={roles}
          onSuccess={handleCreate}
          onCancel={close}
          isPending={isCreating}
        />
      ),
    })
  }

  const openEdit = (usuario: Usuario) => {
    open({
      title: 'Editar usuario',
      size: 'sm',
      content: (
        <UsuarioForm
          usuario={usuario}
          roles={roles}
          onSuccess={handleEdit(usuario)}
          onCancel={close}
          isPending={isUpdating}
        />
      ),
    })
  }

  const actionColumn: Column<Record<string, unknown>> = {
    key: 'id',
    label: 'Acciones',
    render: (_, row) => {
      const u = row as unknown as Usuario
      return (
        <Button
          variant="ghost"
          isIconOnly
          size="sm"
          className="text-foreground/50 hover:text-primary hover:bg-primary/10"
          onPress={() => openEdit(u)}
        >
          <MdEdit className="w-4 h-4" />
        </Button>
      )
    },
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0">
            <MdAdminPanelSettings className="w-5 h-5 text-violet-500" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Usuarios del Sistema</h2>
            <p className="text-xs text-foreground/50 mt-0.5">
              {isLoading ? 'Cargando...' : `${pagination?.total ?? usuarios.length} usuarios registrados`}
            </p>
          </div>
        </div>
        <Button variant="primary" onPress={openCreate} size="sm" className="gap-1.5">
          <MdPersonAdd className="w-4 h-4" />
          Nuevo usuario
        </Button>
      </div>

      {/* Table */}
      <div className="p-5">
        <DataTable
          columns={[...columns, actionColumn]}
          data={usuarios as unknown as Record<string, unknown>[]}
          rowKey="id"
          isLoading={isLoading}
          currentPage={pagination?.current_page ?? page}
          totalPages={pagination?.last_page ?? 1}
          totalItems={pagination?.total}
          pageSize={pagination?.per_page ?? 10}
          onPageChange={setPage}
          emptyMessage="No se encontraron usuarios"
        />
      </div>
    </div>
  )
}
