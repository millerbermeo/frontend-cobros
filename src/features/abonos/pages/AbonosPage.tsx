import { useMemo, useState } from 'react'
import { cn } from '@/shared/utils/cn'
import { useModal } from '@/app/store/modal.store'
import { alert } from '@/shared/utils/alert'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { CreditosTable } from '../components/CreditosTable'
import { CreditosFilters } from '../components/CreditosFilters'
import { AbonosRegistroTable } from '../components/AbonosRegistroTable'
import { PagosParcialesInfo } from '../components/PagosParcialesInfo'
import { AbonoForm } from '../components/AbonoForm'
import { CreditoDetalleModal } from '../components/CreditoDetalleModal'
import { MOCK_ABONOS } from '../data/abonos.mock'
import { useCreditosActivos } from '../hooks/useAbonos'
import type { AbonoRegistro, CreditoActivo } from '../types/abonos.types'
import type { AbonoFormValues } from '../schemas/abono.schema'

type Tab = 'creditos' | 'registro'

const TABS: { key: Tab; label: string }[] = [
  { key: 'creditos', label: 'Créditos Activos' },
  { key: 'registro', label: 'Registro de Abonos' },
]

export function AbonosPage() {
  const { open, close } = useModal()
  const [tab, setTab] = useState<Tab>('creditos')
  const [abonos, setAbonos] = useState<AbonoRegistro[]>(MOCK_ABONOS)

  const [idInput, setIdInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [documentInput, setDocumentInput] = useState('')

  const id = useDebounce(idInput, 400)
  const name = useDebounce(nameInput, 400)
  const document = useDebounce(documentInput, 400)

  const params = useMemo(
    () => ({
      ...(id ? { id } : {}),
      ...(name ? { name } : {}),
      ...(document ? { document } : {}),
    }),
    [id, name, document],
  )

  const { data, isLoading, isFetching } = useCreditosActivos(params)
  const creditos = data?.data ?? []

  const handleAbonar = (credito: CreditoActivo) => (data: AbonoFormValues) => {
    const nuevo: AbonoRegistro = {
      id: `ab${Date.now()}`,
      fecha: new Date().toISOString().slice(0, 10),
      cliente: credito.nombre,
      creditoNumero: credito.id_sol_credi,
      monto: Number(data.monto),
      tipo: data.tipo,
      notas: data.notas?.trim() || 'Abono registrado',
    }
    setAbonos((prev) => [nuevo, ...prev])
    close()
    alert.toast('Abono registrado correctamente')
    setTab('registro')
  }

  const openAbonar = (credito: CreditoActivo) => {
    open({
      title: 'Registrar Nuevo Abono',
      size: 'full',
      content: <AbonoForm credito={credito} onSuccess={handleAbonar(credito)} onCancel={close} />,
    })
  }

  const verDetalles = (c: CreditoActivo) => {
    open({
      title: `Detalle del Crédito #${c.id_sol_credi}`,
      size: 'cover',
      content: <CreditoDetalleModal creditoId={c.id} />,
    })
  }

  const creditosFilters = (
    <CreditosFilters
      id={idInput}
      name={nameInput}
      document={documentInput}
      onIdChange={setIdInput}
      onNameChange={setNameInput}
      onDocumentChange={setDocumentInput}
    />
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Abonos</h1>
        <p className="text-sm text-foreground/50 mt-0.5">Registro de pagos y abonos a créditos</p>
      </div>

      <PagosParcialesInfo />

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium -mb-px border-b-2 transition-colors',
              tab === t.key
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground/50 hover:text-foreground',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'creditos' ? (
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Créditos Activos</h2>
            <p className="text-sm text-foreground/50">Selecciona un crédito para ver su tabla de amortización y abonos detallados</p>
          </div>
          <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
            <CreditosTable
              creditos={creditos}
              isLoading={isLoading || isFetching}
              filters={creditosFilters}
              onAbonar={openAbonar}
              onVerDetalles={verDetalles}
            />
          </div>
        </section>
      ) : (
        <section className="flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Registro de Todos los Abonos</h2>
            <p className="text-sm text-foreground/50">Historial completo de todos los abonos realizados en el sistema</p>
          </div>
          <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
            <AbonosRegistroTable abonos={abonos} />
          </div>
        </section>
      )}
    </div>
  )
}
