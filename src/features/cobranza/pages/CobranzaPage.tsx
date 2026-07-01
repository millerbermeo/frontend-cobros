import { CobranzaCard } from '../components/CobranzaCard'
import { MOCK_COBRANZA } from '../data/cobranza.mock'

export function CobranzaPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Cobranza</h1>
        <p className="text-sm text-foreground/50 mt-0.5">Control de pagos e intereses generados</p>
      </div>

      <div className="flex flex-col gap-4">
        {MOCK_COBRANZA.map((c) => (
          <CobranzaCard key={c.id} credito={c} />
        ))}
      </div>
    </div>
  )
}
