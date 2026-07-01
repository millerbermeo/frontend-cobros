import { Button } from '@heroui/react'
import { MdDescription, MdArticle, MdVisibility, MdDownload } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import type { Contrato, EstadoContrato } from '../types/contratos.types'

const ESTADO_CONFIG: Record<EstadoContrato, string> = {
  firmado:   'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-500/15',
  generado:  'text-sky-700     bg-sky-100     dark:text-sky-300     dark:bg-sky-500/15',
  pendiente: 'text-amber-700   bg-amber-100   dark:text-amber-300   dark:bg-amber-500/15',
}

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

interface ContratoCardProps {
  contrato: Contrato
  onGenerar: (tipo: 'Letra' | 'Pagaré', c: Contrato) => void
  onVer: (c: Contrato) => void
  onDescargar: (c: Contrato) => void
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-foreground/50">{label}</p>
      <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
    </div>
  )
}

export function ContratoCard({ contrato, onGenerar, onVer, onDescargar }: ContratoCardProps) {
  const { cliente, numero, monto, tasa, plazo, fechaFirma, estado } = contrato

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">{cliente}</h3>
          <p className="text-sm text-foreground/50 mt-0.5">Contrato #{numero}</p>
        </div>
        <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-md capitalize', ESTADO_CONFIG[estado])}>
          {estado}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Metric label="Monto Aprobado" value={currency.format(monto)} />
        <Metric label="Tasa Mensual" value={`${tasa}%`} />
        <Metric label="Plazo" value={`${plazo} meses`} />
        <Metric label="Fecha de Firma" value={fechaFirma} />
      </div>

      <div className="my-4 border-t border-border" />

      <p className="text-sm text-foreground/60 mb-3">Documentos disponibles:</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" className="gap-1.5" onPress={() => onGenerar('Letra', contrato)}>
          <MdDescription className="h-4 w-4" />
          Generar Letra
        </Button>
        <Button
          variant="primary"
          className="gap-1.5 bg-violet-600! hover:bg-violet-700!"
          onPress={() => onGenerar('Pagaré', contrato)}
        >
          <MdArticle className="h-4 w-4" />
          Generar Pagaré
        </Button>
        <Button variant="outline" className="gap-1.5" onPress={() => onVer(contrato)}>
          <MdVisibility className="h-4 w-4" />
          Ver Documentos
        </Button>
        <Button variant="outline" className="gap-1.5" onPress={() => onDescargar(contrato)}>
          <MdDownload className="h-4 w-4" />
          Descargar Todo
        </Button>
      </div>
    </div>
  )
}
