import { useState, useMemo } from 'react'
import { Button } from '@heroui/react'
import { MdPersonAdd, MdEdit, MdDelete, MdAdminPanelSettings } from 'react-icons/md'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { useModal } from '@/app/store/modal.store'
import { cn } from '@/shared/utils/cn'
import { UsuarioForm } from '../components/UsuarioForm'
import type { Usuario, RolUsuario, EstadoUsuario } from '../types/usuarios.types'
import type { CreateUsuarioValues, EditUsuarioValues } from '../schemas/usuario.schema'

const ROL_CONFIG: Record<RolUsuario, { label: string; className: string }> = {
  admin:      { label: 'Administrador', className: 'text-violet-600 bg-violet-50 dark:bg-violet-500/15' },
  supervisor: { label: 'Supervisor',    className: 'text-blue-600   bg-blue-50   dark:bg-blue-500/15'   },
  cobrador:   { label: 'Cobrador',      className: 'text-amber-600  bg-amber-50  dark:bg-amber-500/15'  },
  auditor:    { label: 'Auditor',       className: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-500/15' },
}

const ESTADO_CONFIG: Record<EstadoUsuario, { label: string; className: string; dot: string }> = {
  activo:   { label: 'Activo',   className: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/15', dot: 'bg-emerald-500'   },
  inactivo: { label: 'Inactivo', className: 'text-foreground/40 bg-foreground/5',                    dot: 'bg-foreground/30' },
}

const MOCK_USUARIOS: Usuario[] = [
  { id: '1', nombre: 'Admin',  apellido: 'Sistema',     email: 'admin@cobros.com',  rol: 'admin',      estado: 'activo',   createdAt: '2026-01-15' },
  { id: '2', nombre: 'Juan',   apellido: 'Cobrador',    email: 'juan@cobros.com',   rol: 'cobrador',   estado: 'activo',   createdAt: '2026-02-01' },
  { id: '3', nombre: 'María',  apellido: 'Supervisora', email: 'maria@cobros.com',  rol: 'supervisor', estado: 'activo',   createdAt: '2026-02-15' },
  { id: '4', nombre: 'Carlos', apellido: 'Auditor',     email: 'carlos@cobros.com', rol: 'auditor',    estado: 'inactivo', createdAt: '2026-03-01' },
  { id: '5', nombre: 'Lucía',  apellido: 'Cobradora',   email: 'lucia@cobros.com',  rol: 'cobrador',   estado: 'activo',   createdAt: '2026-03-20' },
]

function getInitials(nombre: string, apellido: string) {
  return (nombre[0] + apellido[0]).toUpperCase()
}

function nextId(list: Usuario[]) {
  return String(Math.max(...list.map((u) => Number(u.id))) + 1)
}

export function UsuariosPage() {
  const { open, close } = useModal()
  const [usuarios, setUsuarios] = useState<Usuario[]>(MOCK_USUARIOS)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return usuarios.filter((u) =>
      u.nombre.toLowerCase().includes(q) ||
      u.apellido.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.rol.toLowerCase().includes(q)
    )
  }, [usuarios, search])

  const handleCreate = (data: CreateUsuarioValues | EditUsuarioValues) => {
    const { confirmPassword: _cp, password: _pw, ...rest } = data as CreateUsuarioValues
    setUsuarios((prev) => [
      ...prev,
      { ...rest, id: nextId(prev), estado: 'activo', createdAt: new Date().toISOString().slice(0, 10) },
    ])
    close()
  }

  const handleEdit = (usuario: Usuario) => (data: CreateUsuarioValues | EditUsuarioValues) => {
    setUsuarios((prev) => prev.map((u) => u.id === usuario.id ? { ...u, ...data } : u))
    close()
  }

  const openCreate = () => {
    open({
      title: 'Nuevo usuario',
      size: 'sm',
      content: <UsuarioForm onSuccess={handleCreate} onCancel={close} />,
    })
  }

  const openEdit = (usuario: Usuario) => {
    open({
      title: 'Editar usuario',
      size: 'sm',
      content: <UsuarioForm usuario={usuario} onSuccess={handleEdit(usuario)} onCancel={close} />,
    })
  }

  const openDelete = (u: Usuario) => {
    open({
      title: 'Eliminar usuario',
      size: 'xs',
      content: (
        <p className="text-sm text-foreground/70">
          ¿Eliminar a{' '}
          <span className="font-semibold text-foreground">{u.nombre} {u.apellido}</span>?
          {' '}Esta acción no se puede deshacer.
        </p>
      ),
      actions: [
        { label: 'Cancelar', onPress: close, variant: 'ghost' },
        {
          label: 'Eliminar',
          variant: 'danger',
          onPress: () => { setUsuarios((prev) => prev.filter((x) => x.id !== u.id)); close() },
        },
      ],
    })
  }

  const columns: Column<Record<string, unknown>>[] = [
    {
      key: 'nombre',
      label: 'Usuario',
      render: (_, row) => {
        const u = row as unknown as Usuario
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-primary">{getInitials(u.nombre, u.apellido)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{u.nombre} {u.apellido}</p>
              <p className="text-xs text-foreground/40">{u.email}</p>
            </div>
          </div>
        )
      },
    },
    {
      key: 'rol',
      label: 'Rol',
      render: (val) => {
        const cfg = ROL_CONFIG[val as RolUsuario]
        return <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.className)}>{cfg.label}</span>
      },
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (val) => {
        const cfg = ESTADO_CONFIG[val as EstadoUsuario]
        return (
          <span className={cn('flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full w-fit', cfg.className)}>
            <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
            {cfg.label}
          </span>
        )
      },
    },
    {
      key: 'createdAt',
      label: 'Creado',
      render: (val) => (
        <span className="text-xs text-foreground/50">
          {new Date(val as string).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      ),
    },
    {
      key: 'id',
      label: 'Acciones',
      render: (_, row) => {
        const u = row as unknown as Usuario
        return (
          <div className="flex items-center gap-1">
            <Button variant="ghost" isIconOnly size="sm"
              className="text-foreground/50 hover:text-primary hover:bg-primary/10"
              onPress={() => openEdit(u)}
            >
              <MdEdit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" isIconOnly size="sm"
              className="text-foreground/50 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              onPress={() => openDelete(u)}
            >
              <MdDelete className="w-4 h-4" />
            </Button>
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
            <MdAdminPanelSettings className="w-5 h-5 text-violet-500" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Usuarios del Sistema</h1>
            <p className="text-xs text-foreground/45">{usuarios.length} usuarios registrados</p>
          </div>
        </div>
        <Button variant="primary" onPress={openCreate} className="self-start sm:self-auto">
          <MdPersonAdd className="w-4 h-4 mr-1" />
          Nuevo usuario
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
        <DataTable
          columns={columns}
          data={filtered as unknown as Record<string, unknown>[]}
          rowKey="id"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Buscar por nombre, email o rol..."
          totalItems={filtered.length}
          emptyMessage="No se encontraron usuarios"
        />
      </div>
    </div>
  )
}
