import { useMemo, useState } from 'react'
import { Button } from '@heroui/react'
import { MdAdd, MdDescription } from 'react-icons/md'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { TotalRetirosCard } from '../components/TotalRetirosCard'
import { RetirosTable } from '../components/RetirosTable'
import { RetiroForm } from '../components/RetiroForm'
import { MOCK_RETIROS } from '../data/retiros.mock'
import type { RetiroRegistro } from '../types/retiros.types'
import type { RetiroFormValues } from '../schemas/retiro.schema'

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

function nowParts() {
  const d = new Date()
  return {
    fecha: d.toISOString().slice(0, 10),
    hora: d.toTimeString().slice(0, 5),
  }
}

export function RetirosPage() {
  const { open, close } = useModal()
  const [retiros, setRetiros] = useState<RetiroRegistro[]>(MOCK_RETIROS)

  const total = useMemo(() => retiros.reduce((acc, r) => acc + r.monto, 0), [retiros])

  const handleCreate = (data: RetiroFormValues) => {
    const { fecha, hora } = nowParts()
    const nuevo: RetiroRegistro = {
      id: `r${Date.now()}`,
      cliente: data.cliente,
      fecha,
      hora,
      monto: Number(data.monto),
      concepto: data.concepto,
      realizadoPor: data.realizadoPor,
      autorizadoPor: data.autorizadoPor,
    }
    setRetiros((prev) => [nuevo, ...prev])
    close()
    alert.toast('Retiro registrado correctamente')
  }

  const openCreate = () => {
    open({
      title: 'Registrar Retiro',
      size: 'sm',
      content: <RetiroForm onSuccess={handleCreate} onCancel={close} />,
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Retiros</h1>
          <p className="text-sm text-foreground/50 mt-0.5">Registro de retiros de dinero y desembolsos</p>
        </div>
        <Button variant="primary" className="gap-1.5 bg-emerald-600! hover:bg-emerald-700!" onPress={openCreate}>
          <MdAdd className="h-4 w-4" />
          Registrar Retiro
        </Button>
      </div>

      <TotalRetirosCard total={total} />

      {/* Historial */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 bg-slate-700 dark:bg-slate-800 px-5 py-3.5 text-white">
          <MdDescription className="h-5 w-5" />
          <h2 className="text-sm font-semibold">Historial de Retiros</h2>
        </div>

        <div className="p-5">
          <RetirosTable retiros={retiros} />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-5 py-3.5 border-t border-border text-sm">
          <p className="text-foreground/60">
            Total de retiros registrados: <span className="font-semibold text-foreground">{retiros.length}</span>
          </p>
          <p className="text-foreground/60">
            Total acumulado: <span className="font-semibold text-rose-600 dark:text-rose-400">{currency.format(total)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
