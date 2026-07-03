import { useRef } from 'react'
import AsyncSelect from 'react-select/async'
import { MdAdd } from 'react-icons/md'
import { solicitudesService } from '../services/solicitudes.service'

interface ClienteOption {
  value: number
  label: string
  name: string
  document: string
}

interface ClienteSearchSelectProps {
  onSelect: (cliente: { name: string; document: string }) => void
  onAddNew: () => void
}

/**
 * Buscador asíncrono de clientes por nombre/documento
 * (GET /list/search_customer.php). Al elegir, rellena nombre y documento del form.
 */
export function ClienteSearchSelect({ onSelect, onAddNew }: ClienteSearchSelectProps) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const loadOptions = (input: string): Promise<ClienteOption[]> =>
    new Promise((resolve) => {
      if (timer.current) clearTimeout(timer.current)
      if (input.trim().length < 2) return resolve([])
      timer.current = setTimeout(async () => {
        try {
          const { data } = await solicitudesService.searchCustomers(input.trim())
          resolve(
            data.results.map((r) => ({ value: r.id, label: r.text, name: r.name, document: r.document })),
          )
        } catch {
          resolve([])
        }
      }, 350)
    })

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-foreground">Buscar cliente existente</label>
      <div className="flex items-center gap-2">
        <div className="flex-1 min-w-0">
          <AsyncSelect<ClienteOption>
            cacheOptions
            loadOptions={loadOptions}
            onChange={(opt) => opt && onSelect({ name: opt.name, document: opt.document })}
            placeholder="Escribe nombre o documento..."
            noOptionsMessage={({ inputValue }) =>
              inputValue.trim().length < 2 ? 'Escribe al menos 2 caracteres' : 'Sin resultados'
            }
            loadingMessage={() => 'Buscando...'}
            classNamePrefix="react-select"
            isClearable
          />
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
