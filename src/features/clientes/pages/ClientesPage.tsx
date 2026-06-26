import { useState, useMemo } from 'react'
import { Button } from '@heroui/react'
import { MdPersonAdd, MdPeople, MdDelete } from 'react-icons/md'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { usePagination } from '@/shared/hooks/usePagination'
import { ClientesLayout } from '../layouts/ClientesLayout'
import { ClienteForm } from '../components/ClienteForm'
import { useCreateCliente } from '../hooks/useClientes'
import { MOCK_CLIENTES } from '../data/clientes.mock'
import type { Cliente, TipoIdentificacion } from '../types/clientes.types'
import type { ClienteFormValues } from '../schemas/cliente.schema'

const TIPO_ID_LABEL: Record<TipoIdentificacion, string> = {
  cedula:             'CC',
  cedula_extranjeria: 'CE',
  pasaporte:          'PA',
  nit:                'NIT',
  tarjeta_identidad:  'TI',
}

const columns: Column<Record<string, unknown>>[] = [
  {
    key: 'nombre',
    label: 'Cliente',
    sortable: true,
    render: (_, row) => {
      const c = row as unknown as Cliente
      const initials = (c.nombre[0] + (c.apellidos[0] ?? '')).toUpperCase()
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-primary">{initials}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{c.nombre} {c.apellidos}</p>
            <p className="text-xs text-foreground/40">{c.correo ?? '—'}</p>
          </div>
        </div>
      )
    },
  },
  {
    key: 'numeroIdentificacion',
    label: 'Identificación',
    render: (_, row) => {
      const c = row as unknown as Cliente
      return (
        <span className="text-sm text-foreground">
          <span className="text-xs font-semibold text-primary mr-1">
            {TIPO_ID_LABEL[c.tipoIdentificacion]}
          </span>
          {c.numeroIdentificacion}
        </span>
      )
    },
  },
  {
    key: 'telefono',
    label: 'Teléfono',
    render: (val) => <span className="text-sm text-foreground">{String(val)}</span>,
  },
  {
    key: 'tipoTrabajo',
    label: 'Trabajo',
    render: (_, row) => {
      const c = row as unknown as Cliente
      return (
        <div>
          <p className="text-sm text-foreground">{c.tipoTrabajo}</p>
          <p className="text-xs text-foreground/40">{c.entidadTrabajo}</p>
        </div>
      )
    },
  },
  {
    key: 'createdAt',
    label: 'Registrado',
    sortable: true,
    render: (val) => (
      <span className="text-xs text-foreground/50">
        {new Date(val as string).toLocaleDateString('es-CO', {
          day: '2-digit', month: 'short', year: 'numeric',
        })}
      </span>
    ),
  },
]

export function ClientesPage() {
  const { open, close } = useModal()
  const createCliente = useCreateCliente()
  const [clientes, setClientes] = useState<Cliente[]>(MOCK_CLIENTES)
  const { params, setPage, setPageSize, setSearch } = usePagination()
  const [sortKey, setSortKey] = useState<string>('')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    const q = (params.search ?? '').toLowerCase()
    let list = q
      ? clientes.filter((c) =>
          c.nombre.toLowerCase().includes(q) ||
          c.apellidos.toLowerCase().includes(q) ||
          c.numeroIdentificacion.includes(q) ||
          (c.correo ?? '').toLowerCase().includes(q) ||
          c.entidadTrabajo.toLowerCase().includes(q)
        )
      : clientes

    if (sortKey) {
      list = [...list].sort((a, b) => {
        const av = String((a as unknown as Record<string, unknown>)[sortKey] ?? '')
        const bv = String((b as unknown as Record<string, unknown>)[sortKey] ?? '')
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      })
    }

    return list
  }, [clientes, params.search, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / params.pageSize))
  const safePage = Math.min(params.page, totalPages)
  const paginated = filtered.slice((safePage - 1) * params.pageSize, safePage * params.pageSize)

  const handleCreate = async (data: ClienteFormValues) => {
    try {
      const res = await createCliente.mutateAsync(data)
      const nuevo: Cliente = {
        id: String(res.data.id),
        nombre: data.name,
        apellidos: '',
        tipoIdentificacion: 'cedula',
        numeroIdentificacion: data.document,
        direccion: data.address,
        telefono: data.phone,
        correo: data.email || undefined,
        recomendadoPor: data.recommended || undefined,
        telefonoAdicional: data.additional_phone || undefined,
        tipoTrabajo: data.type_work,
        entidadTrabajo: data.employing_entity,
        fuenteIngresos: data.source_of_income || undefined,
        createdAt: new Date().toISOString().slice(0, 10),
      }
      setClientes((prev) => [nuevo, ...prev])
      close()
      alert.toast(res.data.message || 'Cliente creado')
    } catch {
      alert.error('Error', 'No se pudo crear el cliente')
    }
  }

  const openCreate = () => {
    open({
      title: 'Registrar cliente',
      size: 'md',
      content: <ClienteForm onSuccess={handleCreate} onCancel={close} />,
    })
  }

  const openDelete = (c: Cliente) => {
    open({
      title: 'Eliminar cliente',
      size: 'xs',
      content: (
        <p className="text-sm text-foreground/70">
          ¿Eliminar a <span className="font-semibold text-foreground">{c.nombre} {c.apellidos}</span>?
          {' '}Esta acción no se puede deshacer.
        </p>
      ),
      actions: [
        { label: 'Cancelar', onPress: close, variant: 'ghost' },
        {
          label: 'Eliminar',
          variant: 'danger',
          onPress: () => { setClientes((prev) => prev.filter((x) => x.id !== c.id)); close() },
        },
      ],
    })
  }

  const actionColumn: Column<Record<string, unknown>> = {
    key: 'id',
    label: 'Acciones',
    render: (_, row) => {
      const c = row as unknown as Cliente
      return (
        <div className="flex items-center gap-1">
          <Button variant="ghost" isIconOnly size="sm"
            className="text-foreground/50 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
            onPress={() => openDelete(c)}
          >
            <MdDelete className="w-4 h-4" />
          </Button>
        </div>
      )
    },
  }

  const handleSort = (key: string, dir: 'asc' | 'desc') => {
    setSortKey(key)
    setSortDir(dir)
  }

  return (
    <ClientesLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MdPeople className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Clientes</h1>
            <p className="text-xs text-foreground/45">{clientes.length} clientes registrados</p>
          </div>
        </div>
        <Button variant="primary" onPress={openCreate} className="self-start sm:self-auto">
          <MdPersonAdd className="w-4 h-4 mr-1" />
          Registrar cliente
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
        <DataTable
          columns={[...columns, actionColumn]}
          data={paginated as unknown as Record<string, unknown>[]}
          rowKey="id"
          searchValue={params.search ?? ''}
          onSearchChange={(v) => { setSearch(v); setPage(1) }}
          searchPlaceholder="Buscar por nombre, identificación, correo o empresa..."
          currentPage={safePage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={params.pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          sortKey={sortKey}
          sortDirection={sortDir}
          onSort={handleSort}
          emptyMessage="No se encontraron clientes"
        />
      </div>
    </ClientesLayout>
  )
}
