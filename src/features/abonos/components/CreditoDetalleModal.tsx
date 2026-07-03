import { MdErrorOutline } from 'react-icons/md'
import { Spinner } from '@/shared/components/loaders/Spinner'
import { useCreditoConRetiros } from '../hooks/useAbonos'
import { CreditoDetalleHeader } from './CreditoDetalleHeader'
import { RetirosHistorialTable } from './RetirosHistorialTable'

interface CreditoDetalleModalProps {
  creditoId: number
}

export function CreditoDetalleModal({ creditoId }: CreditoDetalleModalProps) {
  const { data, isLoading, isError } = useCreditoConRetiros(creditoId)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner size="lg" />
      </div>
    )
  }

  if (isError || !data?.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-foreground/60">
        <MdErrorOutline className="h-8 w-8 text-rose-500" />
        <p className="text-sm">No se pudo cargar el detalle del crédito</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <CreditoDetalleHeader credito={data.credito} />
      <RetirosHistorialTable
        retiros={data.retiros_disponibles}
        cantidad={data.cantidad_retiros}
        total={data.total_disponible}
      />
    </div>
  )
}
