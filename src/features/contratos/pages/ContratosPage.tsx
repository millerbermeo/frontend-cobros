import { alert } from '@/shared/utils/alert'
import { ContratoCard } from '../components/ContratoCard'
import { DocumentosInfo } from '../components/DocumentosInfo'
import { MOCK_CONTRATOS } from '../data/contratos.mock'
import type { Contrato } from '../types/contratos.types'

export function ContratosPage() {
  const handleGenerar = (tipo: 'Letra' | 'Pagaré', c: Contrato) => {
    alert.loading(`Generando ${tipo}...`)
    setTimeout(() => {
      alert.closeLoading()
      alert.toast(`${tipo} generada para ${c.cliente}`)
    }, 800)
  }

  const handleVer = (c: Contrato) => {
    alert.toast(`Abriendo documentos de ${c.cliente}`)
  }

  const handleDescargar = (c: Contrato) => {
    alert.toast(`Descargando documentos del contrato #${c.numero}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Contratos</h1>
        <p className="text-sm text-foreground/50 mt-0.5">Gestión y generación de documentos legales</p>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_CONTRATOS.map((c) => (
          <ContratoCard
            key={c.id}
            contrato={c}
            onGenerar={handleGenerar}
            onVer={handleVer}
            onDescargar={handleDescargar}
          />
        ))}
      </div>

      <DocumentosInfo />
    </div>
  )
}
