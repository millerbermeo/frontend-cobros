import { useState, useMemo } from 'react'
import { Button } from '@heroui/react'
import { MdSearch } from 'react-icons/md'
import { useModal } from '@/app/store/modal.store'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { Spinner } from '@/shared/components/loaders/Spinner'
import { AprobacionesLayout } from '../layouts/AprobacionesLayout'
import { AprobacionCard } from '../components/AprobacionCard'
import { AprobacionWizard } from '../components/AprobacionWizard'
import { useAprobacionesInfinite, flattenAprobaciones } from '../hooks/useAprobaciones'
import type { CreditApplication } from '../types/aprobaciones.types'

const FILTER_INPUT_CLASS =
  'w-full sm:w-56 pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary'

export function AprobacionesPage() {
  const { open, close } = useModal()
  const [documentInput, setDocumentInput] = useState('')
  const [nameInput, setNameInput] = useState('')

  const document = useDebounce(documentInput, 400)
  const name = useDebounce(nameInput, 400)
  const filters = useMemo(
    () => ({ ...(document ? { document } : {}), ...(name ? { name } : {}) }),
    [document, name],
  )

  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAprobacionesInfinite(filters)

  const solicitudes = flattenAprobaciones(data?.pages)

  const openWizard = (solicitud: CreditApplication) => {
    open({
      title: `Aprobación · ${solicitud.name}`,
      size: 'lg',
      content: <AprobacionWizard solicitud={solicitud} onDone={close} />,
    })
  }

  return (
    <AprobacionesLayout>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Proceso de Aprobación</h1>
          <p className="text-sm text-foreground/50 mt-0.5">Validación, tasa y aprobación de créditos</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
            <input
              type="text" value={documentInput} onChange={(e) => setDocumentInput(e.target.value)}
              placeholder="Documento..." className={FILTER_INPUT_CLASS}
            />
          </div>
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" />
            <input
              type="text" value={nameInput} onChange={(e) => setNameInput(e.target.value)}
              placeholder="Nombre..." className={FILTER_INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16"><Spinner /></div>
      ) : isError ? (
        <p className="text-center py-16 text-sm text-danger">No se pudieron cargar las solicitudes.</p>
      ) : solicitudes.length === 0 ? (
        <p className="text-center py-16 text-sm text-foreground/40">No se encontraron solicitudes.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {solicitudes.map((s) => (
              <AprobacionCard key={s.id} solicitud={s} onProcess={openWizard} />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center pt-2">
              <Button variant="outline" onPress={() => fetchNextPage()} isPending={isFetchingNextPage}>
                {isFetchingNextPage ? 'Cargando...' : 'Cargar más'}
              </Button>
            </div>
          )}
        </>
      )}
    </AprobacionesLayout>
  )
}
