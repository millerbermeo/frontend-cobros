import { useState, useMemo } from 'react'
import { isAxiosError } from 'axios'
import { Button } from '@heroui/react'
import { MdAdd, MdDescription, MdSearch } from 'react-icons/md'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { DataTable } from '@/shared/components/tables/DataTable'
import { SolicitudesLayout } from '../layouts/SolicitudesLayout'
import { SolicitudForm } from '../components/SolicitudForm'
import { buildColumns } from '../components/solicitudColumns'
import { useCreditApplications, useCreateSolicitud, useUpdateSolicitud } from '../hooks/useSolicitudes'
import type { CreditApplication } from '../types/solicitudes.types'
import type { SolicitudFormValues } from '../schemas/solicitud.schema'

const FILTER_INPUT_CLASS =
  'w-full sm:w-48 pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

function apiErrorMessage(err: unknown, fallback: string): string {
  const data = isAxiosError(err) ? (err.response?.data as { error?: string; message?: string }) : undefined
  return data?.error || data?.message || fallback
}

export function SolicitudesPage() {
  const { open, close } = useModal()
  const createSolicitud = useCreateSolicitud()
  const updateSolicitud = useUpdateSolicitud()

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

  const { data, isLoading, isFetching } = useCreditApplications(params)

  // El backend devuelve `data` como array (listado) o como objeto único
  // (cuando el filtro por document encuentra 1 resultado) y sin `pagination`.
  const raw = data?.data
  const solicitudes = Array.isArray(raw) ? raw : raw ? [raw] : []
  const pag = data?.pagination
  const total = Number(pag?.total ?? solicitudes.length)
  const totalPages = pag?.last_page ?? 1
  const currentPage = pag?.current_page ?? page

  const resetTo = (setter: (v: string) => void) => (v: string) => {
    setter(v)
    setPage(1)
  }

  const handleCreate = async (formData: SolicitudFormValues) => {
    alert.loading('Creando solicitud...')
    try {
      const res = await createSolicitud.mutateAsync(formData)
      alert.closeLoading()
      close()
      alert.toast(res.data.message || 'Solicitud creada')
      setPage(1)
    } catch (err) {
      alert.closeLoading()
      alert.error('Error', apiErrorMessage(err, 'No se pudo crear la solicitud'))
    }
  }

  const handleEdit = (solicitud: CreditApplication) => async (formData: SolicitudFormValues) => {
    alert.loading('Actualizando solicitud...')
    try {
      const res = await updateSolicitud.mutateAsync({ id: solicitud.id, data: formData })
      alert.closeLoading()
      close()
      alert.toast(res.data.message || 'Solicitud actualizada')
    } catch (err) {
      alert.closeLoading()
      alert.error('Error', apiErrorMessage(err, 'No se pudo actualizar la solicitud'))
    }
  }

  const openCreate = () => {
    open({
      title: 'Nueva solicitud de crédito',
      size: 'lg',
      content: <SolicitudForm onSuccess={handleCreate} onCancel={close} />,
    })
  }

  const openEdit = (solicitud: CreditApplication) => {
    open({
      title: 'Editar solicitud de crédito',
      size: 'lg',
      content: <SolicitudForm solicitud={solicitud} onSuccess={handleEdit(solicitud)} onCancel={close} />,
    })
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
    <SolicitudesLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MdDescription className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Solicitudes de Crédito</h1>
            <p className="text-xs text-foreground/45">{total} solicitudes registradas</p>
          </div>
        </div>
        <Button variant="primary" onPress={openCreate} className="self-start sm:self-auto gap-1.5">
          <MdAdd className="w-4 h-4" />
          Nueva solicitud
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
        <DataTable
          columns={buildColumns(openEdit)}
          data={solicitudes as unknown as Record<string, unknown>[]}
          rowKey="id"
          isLoading={isLoading || isFetching}
          filtersComponent={filters}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={total}
          pageSize={perPage}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPerPage(s); setPage(1) }}
          emptyMessage="No se encontraron solicitudes"
        />
      </div>
    </SolicitudesLayout>
  )
}
