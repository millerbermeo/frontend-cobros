import { useState } from 'react'
import { Button } from '@heroui/react'
import { MdAdd } from 'react-icons/md'
import { DataTable, type Column } from '@/shared/components/tables/DataTable'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { cn } from '@/shared/utils/cn'
import { SolicitudForm } from '../components/SolicitudForm'
import { MOCK_SOLICITUDES } from '../data/solicitudes.mock'
import type { EstadoSolicitud, Solicitud } from '../types/solicitudes.types'
import type { SolicitudFormValues } from '../schemas/solicitud.schema'

const ESTADO_CONFIG: Record<EstadoSolicitud, string> = {
  pendiente:  'text-amber-700   bg-amber-100   dark:text-amber-300  dark:bg-amber-500/15',
  validacion: 'text-sky-700     bg-sky-100     dark:text-sky-300    dark:bg-sky-500/15',
  aprobado:   'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15',
  rechazado:  'text-rose-700    bg-rose-100    dark:text-rose-300   dark:bg-rose-500/15',
}

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

const columns: Column<Record<string, unknown>>[] = [
  { key: 'cliente', label: 'Cliente', sortable: true,
    render: (val) => <span className="font-medium text-foreground">{String(val)}</span> },
  { key: 'tipo', label: 'Tipo',
    render: (val) => <span className="capitalize text-foreground/70">{String(val)}</span> },
  { key: 'monto', label: 'Monto',
    render: (val) => <span className="font-medium text-foreground">{currency.format(Number(val))}</span> },
  { key: 'tasa', label: 'Tasa', render: (val) => `${val}%` },
  { key: 'plazo', label: 'Plazo', render: (val) => `${val} meses` },
  { key: 'fecha', label: 'Fecha',
    render: (val) => <span className="text-foreground/60">{String(val)}</span> },
  { key: 'estado', label: 'Estado',
    render: (val) => {
      const estado = val as EstadoSolicitud
      return (
        <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md capitalize', ESTADO_CONFIG[estado])}>
          {estado}
        </span>
      )
    } },
]

export function SolicitudesPage() {
  const { open, close } = useModal()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(MOCK_SOLICITUDES)

  const handleCreate = (data: SolicitudFormValues) => {
    const nueva: Solicitud = {
      id: `s${Date.now()}`,
      cliente: data.cliente,
      tipo: data.tipo,
      monto: Number(data.monto),
      tasa: Number(data.tasa),
      plazo: Number(data.plazo),
      garantia: data.garantia,
      fecha: new Date().toISOString().slice(0, 10),
      estado: 'pendiente',
    }
    setSolicitudes((prev) => [nueva, ...prev])
    close()
    alert.toast('Solicitud creada correctamente')
  }

  const openCreate = () => {
    open({
      title: 'Nueva Solicitud de Crédito',
      size: 'lg',
      content: <SolicitudForm onSuccess={handleCreate} onCancel={close} />,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Solicitudes de Crédito</h1>
          <p className="text-sm text-foreground/50 mt-0.5">Gestión de solicitudes y aprobaciones</p>
        </div>
        <Button variant="primary" className="gap-1.5" onPress={openCreate}>
          <MdAdd className="w-4 h-4" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
        <DataTable
          columns={columns}
          data={solicitudes as unknown as Record<string, unknown>[]}
          rowKey="id"
          emptyMessage="No hay solicitudes registradas"
        />
      </div>
    </div>
  )
}
