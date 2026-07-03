import { MdAdd } from 'react-icons/md'
import { CustomerSearchSelect } from '@/shared/components/forms'

interface ClienteSearchSelectProps {
  onSelect: (cliente: { name: string; document: string }) => void
  onAddNew: () => void
}

/**
 * Buscador de cliente + botón para registrar uno nuevo. Envuelve el
 * `CustomerSearchSelect` compartido con el contexto de la solicitud.
 */
export function ClienteSearchSelect({ onSelect, onAddNew }: ClienteSearchSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-foreground">Buscar cliente existente</label>
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <CustomerSearchSelect onSelect={onSelect} />
        </div>
        <button
          type="button"
          onClick={onAddNew}
          title="Registrar nuevo cliente"
          aria-label="Registrar nuevo cliente"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white transition-colors hover:bg-emerald-700"
        >
          <MdAdd className="h-5 w-5" />
        </button>
      </div>
      <p className="text-xs text-foreground/40">
        Selecciona un cliente para autocompletar, o llena los campos manualmente.
      </p>
    </div>
  )
}
