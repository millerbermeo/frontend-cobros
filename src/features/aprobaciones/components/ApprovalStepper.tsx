import { MdCheck, MdPriorityHigh } from 'react-icons/md'
import { cn } from '@/shared/utils/cn'
import { APPROVAL_STEPS } from '../constants'

interface ApprovalStepperProps {
  /** Pasos completados (0..STEPS.length). */
  completados: number
  /** Si el flujo fue rechazado, no hay paso activo. */
  rechazado?: boolean
  /** Navegar al hacer clic en un paso (solo si está habilitado). */
  onSelect?: (index: number) => void
  /** Determina si un paso es navegable. Por defecto todos deshabilitados. */
  isStepEnabled?: (index: number) => boolean
}

type NodeState = 'done' | 'active' | 'pending'

const resolveState = (index: number, completados: number, rechazado: boolean): NodeState => {
  if (index < completados) return 'done'
  if (index === completados && !rechazado) return 'active'
  return 'pending'
}

const NODE_STYLES: Record<NodeState, string> = {
  done:    'bg-emerald-500 text-white border-emerald-500',
  active:  'bg-primary/10 text-primary border-primary',
  pending: 'bg-card text-foreground/30 border-border',
}

export function ApprovalStepper({ completados, rechazado = false, onSelect, isStepEnabled }: ApprovalStepperProps) {
  return (
    <ol className="flex items-start">
      {APPROVAL_STEPS.map((label, index) => {
        const state = resolveState(index, completados, rechazado)
        const isLast = index === APPROVAL_STEPS.length - 1
        const connectorDone = index < completados
        const enabled = !!onSelect && !!isStepEnabled?.(index)

        return (
          <li key={label} className="flex flex-1 flex-col items-center last:flex-none">
            <div className="flex w-full items-center">
              <span className="flex-1">
                {index > 0 && (
                  <span className={cn('block h-0.5 w-full', index <= completados ? 'bg-emerald-500' : 'bg-border')} />
                )}
              </span>
              <button
                type="button"
                disabled={!enabled}
                onClick={() => enabled && onSelect?.(index)}
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  NODE_STYLES[state],
                  enabled ? 'cursor-pointer hover:brightness-95' : 'cursor-default',
                )}
              >
                {state === 'done'
                  ? <MdCheck className="h-4 w-4" />
                  : <MdPriorityHigh className="h-4 w-4" />}
              </button>
              <span className="flex-1">
                {!isLast && (
                  <span className={cn('block h-0.5 w-full', connectorDone ? 'bg-emerald-500' : 'bg-border')} />
                )}
              </span>
            </div>
            <span
              className={cn(
                'mt-2 max-w-32 text-center text-xs',
                state === 'pending' ? 'text-foreground/40' : 'text-foreground/70',
              )}
            >
              {label}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
