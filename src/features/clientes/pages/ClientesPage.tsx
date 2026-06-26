import { useState, useMemo } from 'react'
import { isAxiosError } from 'axios'
import { Button } from '@heroui/react'
import { MdPersonAdd, MdPeople, MdSearch, MdInsertDriveFile, MdEdit } from 'react-icons/md'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { ClientesLayout } from '../layouts/ClientesLayout'
import { ClienteForm } from '../components/ClienteForm'
import { useCustomers, useCreateCliente, useUpdateCliente } from '../hooks/useClientes'
import { customerFileUrl } from '../services/clientes.service'
import type { Customer } from '../types/clientes.types'
import type { ClienteFormValues } from '../schemas/cliente.schema'

const columns: Column<Record<string, unknown>>[] = [
  {
    key: 'id',
    label: '#',
    render: (val) => <span className="text-xs font-medium text-foreground/50">{String(val)}</span>,
  },
  {
    key: 'name',
    label: 'Cliente',
    render: (_, row) => {
      const c = row as unknown as Customer
      const initials = c.name
        .split(' ')
        .slice(0, 2)
        .map((p) => p[0])
        .join('')
        .toUpperCase()
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-bold text-primary">{initials}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{c.name}</p>
            <p className="text-xs text-foreground/40">{c.email || '—'}</p>
          </div>
        </div>
      )
    },
  },
  {
    key: 'document',
    label: 'Documento',
    render: (val) => <span className="text-sm text-foreground">{String(val)}</span>,
  },
  {
    key: 'phone',
    label: 'Teléfono',
    render: (_, row) => {
      const c = row as unknown as Customer
      return (
        <div>
          <p className="text-sm text-foreground">{c.phone}</p>
          {c.additional_phone && <p className="text-xs text-foreground/40">{c.additional_phone}</p>}
        </div>
      )
    },
  },
  {
    key: 'type_work',
    label: 'Trabajo',
    render: (_, row) => {
      const c = row as unknown as Customer
      return (
        <div>
          <p className="text-sm text-foreground">{c.type_work}</p>
          <p className="text-xs text-foreground/40">{c.employing_entity}</p>
        </div>
      )
    },
  },
  {
    key: 'url_source_of_income',
    label: 'Soporte',
    render: (val) => {
      const url = customerFileUrl(val as string)
      if (!url) return <span className="text-xs text-foreground/30">—</span>
      return (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <MdInsertDriveFile className="w-4 h-4" />
          Ver
        </a>
      )
    },
  },
]

const FILTER_INPUT_CLASS =
  'w-full sm:w-48 pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

export function ClientesPage() {
  const { open, close } = useModal()
  const createCliente = useCreateCliente()
  const updateCliente = useUpdateCliente()

  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [documentInput, setDocumentInput] = useState('')
  const [nameInput, setNameInput] = useState('')

  const document = useDebounce(documentInput, 400)
  const name = useDebounce(nameInput, 400)

  const params = useMemo(
    () => ({
      page,
      per_page: perPage,
      ...(document ? { document } : {}),
      ...(name ? { name } : {}),
    }),
    [page, perPage, document, name],
  )

  const { data, isLoading, isFetching } = useCustomers(params)

  // El backend devuelve `data` como array (listado) o como objeto único
  // (cuando el filtro por document encuentra 1 resultado) y sin `pagination`.
  const raw = data?.data
  const customers = Array.isArray(raw) ? raw : raw ? [raw] : []
  const pag = data?.pagination
  const total = Number(pag?.total ?? customers.length)
  const totalPages = pag?.last_page ?? 1
  const currentPage = pag?.current_page ?? page

  const resetTo = (setter: (v: string) => void) => (v: string) => {
    setter(v)
    setPage(1)
  }

  const handleCreate = async (formData: ClienteFormValues) => {
    try {
      const res = await createCliente.mutateAsync(formData)
      close()
      alert.toast(res.data.message || 'Cliente creado')
      setPage(1)
    } catch (err) {
      const data = isAxiosError(err) ? (err.response?.data as { error?: string; message?: string }) : undefined
      alert.error('Error', data?.error || data?.message || 'No se pudo crear el cliente')
    }
  }

  const openCreate = () => {
    open({
      title: 'Registrar cliente',
      size: 'md',
      content: <ClienteForm onSuccess={handleCreate} onCancel={close} />,
    })
  }

  const handleEdit = (customer: Customer) => async (formData: ClienteFormValues) => {
    try {
      const res = await updateCliente.mutateAsync({ id: customer.id, data: formData })
      close()
      alert.toast(res.data.message || 'Cliente actualizado')
    } catch (err) {
      const data = isAxiosError(err) ? (err.response?.data as { error?: string; message?: string }) : undefined
      alert.error('Error', data?.error || data?.message || 'No se pudo actualizar el cliente')
    }
  }

  const openEdit = (customer: Customer) => {
    open({
      title: 'Editar cliente',
      size: 'md',
      content: <ClienteForm customer={customer} onSuccess={handleEdit(customer)} onCancel={close} />,
    })
  }

  const actionColumn: Column<Record<string, unknown>> = {
    key: 'acciones',
    label: 'Acciones',
    render: (_, row) => {
      const c = row as unknown as Customer
      return (
        <Button
          variant="ghost"
          isIconOnly
          size="sm"
          className="text-foreground/50 hover:text-primary hover:bg-primary/10"
          onPress={() => openEdit(c)}
        >
          <MdEdit className="w-4 h-4" />
        </Button>
      )
    },
  }

  const filters = (
    <>
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
        <input
          type="text"
          value={documentInput}
          onChange={(e) => resetTo(setDocumentInput)(e.target.value)}
          placeholder="Documento..."
          className={FILTER_INPUT_CLASS}
        />
      </div>
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
        <input
          type="text"
          value={nameInput}
          onChange={(e) => resetTo(setNameInput)(e.target.value)}
          placeholder="Nombre..."
          className={FILTER_INPUT_CLASS}
        />
      </div>
    </>
  )

  return (
    <ClientesLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MdPeople className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Clientes</h1>
            <p className="text-xs text-foreground/45">{total} clientes registrados</p>
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
          data={customers as unknown as Record<string, unknown>[]}
          rowKey="id"
          isLoading={isLoading || isFetching}
          filtersComponent={filters}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={total}
          pageSize={perPage}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPerPage(s); setPage(1) }}
          emptyMessage="No se encontraron clientes"
        />
      </div>
    </ClientesLayout>
  )
}
