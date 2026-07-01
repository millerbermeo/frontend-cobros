import { useState } from 'react'
import { alert } from '@/shared/utils/alert'
import { AprobacionCard } from '../components/AprobacionCard'
import { APPROVAL_STEPS, MOCK_APROBACIONES } from '../data/aprobaciones.mock'
import type { Aprobacion } from '../types/aprobaciones.types'

const TOTAL_STEPS = APPROVAL_STEPS.length

export function AprobacionesPage() {
  const [aprobaciones, setAprobaciones] = useState<Aprobacion[]>(MOCK_APROBACIONES)

  const handleApprove = (id: string) => {
    setAprobaciones((prev) =>
      prev.map((a) => {
        if (a.id !== id) return a
        const completados = Math.min(a.completados + 1, TOTAL_STEPS)
        const terminado = completados >= TOTAL_STEPS
        alert.toast(terminado ? 'Crédito aprobado' : `Paso completado: ${APPROVAL_STEPS[completados - 1]}`)
        return { ...a, completados, estado: terminado ? 'aprobado' : 'validacion' }
      }),
    )
  }

  const handleReject = (id: string) => {
    setAprobaciones((prev) =>
      prev.map((a) => (a.id === id ? { ...a, estado: 'rechazado' } : a)),
    )
    alert.toast('Solicitud rechazada', 'error')
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Proceso de Aprobación</h1>
        <p className="text-sm text-foreground/50 mt-0.5">Gestión del flujo de aprobación de créditos</p>
      </div>

      <div className="flex flex-col gap-4">
        {aprobaciones.map((a) => (
          <AprobacionCard key={a.id} aprobacion={a} onApprove={handleApprove} onReject={handleReject} />
        ))}
      </div>
    </div>
  )
}
