import { z } from 'zod'
import type { CreditoActivo } from '../types/abonos.types'

export const TIPO_ABONO_OPTIONS = [
  { label: 'Solo Interés', value: 'interes' },
  { label: 'Solo Capital', value: 'capital' },
  { label: 'Interés y Capital', value: 'ambos' },
] as const

const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })

/** Valida un campo de monto contra su máximo disponible (dato del endpoint). */
function validarMonto(
  raw: string | undefined,
  max: number,
  path: string,
  ctx: z.RefinementCtx,
) {
  const monto = Number(raw)
  if (!raw || monto <= 0) {
    ctx.addIssue({ code: 'custom', path: [path], message: 'El monto debe ser mayor a 0' })
    return
  }
  if (max <= 0) {
    ctx.addIssue({ code: 'custom', path: [path], message: 'No hay saldo disponible para este tipo' })
    return
  }
  if (monto > max) {
    ctx.addIssue({ code: 'custom', path: [path], message: `El monto no puede superar ${currency.format(max)}` })
  }
}

/** Crea el schema con los máximos del crédito (interés y capital pendientes). */
export function createAbonoSchema(credito: CreditoActivo) {
  return z
    .object({
      tipo: z.enum(['interes', 'capital', 'ambos'], { message: 'Selecciona el tipo' }),
      monto: z.string().optional(),
      montoInteres: z.string().optional(),
      montoCapital: z.string().optional(),
      notas: z.string().optional(),
    })
    .superRefine((val, ctx) => {
      if (val.tipo === 'ambos') {
        validarMonto(val.montoInteres, credito.outstanding_interest, 'montoInteres', ctx)
        validarMonto(val.montoCapital, credito.outstanding_principal, 'montoCapital', ctx)
      } else {
        const max = val.tipo === 'capital' ? credito.outstanding_principal : credito.outstanding_interest
        validarMonto(val.monto, max, 'monto', ctx)
      }
    })
}

export type AbonoFormValues = z.infer<ReturnType<typeof createAbonoSchema>>
