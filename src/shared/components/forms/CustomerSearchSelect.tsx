import { useRef } from 'react'
import AsyncSelect from 'react-select/async'
import api from '@/lib/axios'

export interface CustomerSearchResult {
  id: number
  text: string
  name: string
  document: string
}

interface CustomerOption {
  value: number
  label: string
  name: string
  document: string
}

interface CustomerSearchSelectProps {
  onSelect: (cliente: { name: string; document: string }) => void
  placeholder?: string
}

/**
 * Buscador asíncrono de clientes por nombre/documento
 * (GET /list/search_customer.php). Componente transversal reutilizable.
 */
export function CustomerSearchSelect({ onSelect, placeholder }: CustomerSearchSelectProps) {
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const loadOptions = (input: string): Promise<CustomerOption[]> =>
    new Promise((resolve) => {
      if (timer.current) clearTimeout(timer.current)
      if (input.trim().length < 2) return resolve([])
      timer.current = setTimeout(async () => {
        try {
          const { data } = await api.get<{ results: CustomerSearchResult[] }>('/list/search_customer.php', {
            params: { term: input.trim() },
          })
          resolve(data.results.map((r) => ({ value: r.id, label: r.text, name: r.name, document: r.document })))
        } catch {
          resolve([])
        }
      }, 350)
    })

  return (
    <AsyncSelect<CustomerOption>
      cacheOptions
      loadOptions={loadOptions}
      onChange={(opt) => opt && onSelect({ name: opt.name, document: opt.document })}
      placeholder={placeholder ?? 'Escribe nombre o documento...'}
      noOptionsMessage={({ inputValue }) =>
        inputValue.trim().length < 2 ? 'Escribe al menos 2 caracteres' : 'Sin resultados'
      }
      loadingMessage={() => 'Buscando...'}
      classNamePrefix="react-select"
      isClearable
    />
  )
}
