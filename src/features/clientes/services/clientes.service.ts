import api from '@/lib/axios'
import type { Cliente, CreateClienteResponse } from '../types/clientes.types'
import type { ClienteFormValues } from '../schemas/cliente.schema'

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
  getAll: () => api.get<Cliente[]>('/clientes'),
  getById: (id: string) => api.get<Cliente>(`/clientes/${id}`),
  create: (values: ClienteFormValues) =>
    api.post<CreateClienteResponse>('/create/c_customer', toFormData(values), {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, data: Partial<Cliente>) => api.put<Cliente>(`/clientes/${id}`, data),
  delete: (id: string) => api.delete(`/clientes/${id}`),
}
