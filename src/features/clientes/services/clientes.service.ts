import api from '@/lib/axios'
import { config } from '@/config'
import type {
  Cliente,
  CreateClienteResponse,
  CustomersParams,
  CustomersResponse,
} from '../types/clientes.types'
import type { ClienteFormValues } from '../schemas/cliente.schema'

/**
 * El backend guarda url_source_of_income como ruta absoluta del servidor
 * (/var/www/html/back/create/document_customer/<archivo>) o como URL externa.
 * Devuelve un enlace abierto en el navegador, o null si no aplica.
 */
export function customerFileUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw
  const name = raw.split('/').pop()
  if (!name) return null
  return `${config.apiUrl}/create/document_customer/${name}`
}

function toFormData(values: ClienteFormValues): FormData {
  const fd = new FormData()
  fd.append('name', values.name)
  fd.append('document', values.document)
  fd.append('address', values.address)
  fd.append('phone', values.phone)
  fd.append('email', values.email ?? '')
  fd.append('recommended', values.recommended ?? '')
  fd.append('additional_phone', values.additional_phone ?? '')
  fd.append('type_work', values.type_work)
  fd.append('employing_entity', values.employing_entity)
  fd.append('source_of_income', values.source_of_income ?? '')

  const fileList = values.url_source_of_income as FileList
  if (fileList?.length) {
    fd.append('url_source_of_income', fileList[0])
  }

  return fd
}

export const clientesService = {
  list: (params: CustomersParams = {}) =>
    api.get<CustomersResponse>('/list/customers.php', { params }),
  getAll: () => api.get<Cliente[]>('/clientes'),
  getById: (id: string) => api.get<Cliente>(`/clientes/${id}`),
  create: (values: ClienteFormValues) =>
    api.post<CreateClienteResponse>('/create/c_customer', toFormData(values), {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  // Misma URL/método (POST) con id + _method=PUT. Si no hay archivo nuevo, se conserva el anterior.
  update: (id: number | string, values: ClienteFormValues) => {
    const fd = toFormData(values)
    fd.append('id', String(id))
    fd.append('_method', 'PUT')
    return api.post<CreateClienteResponse>('/create/c_customer', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  delete: (id: string) => api.delete(`/clientes/${id}`),
}
