import api from '@/lib/axios'
import { config } from '@/config'
import type {
  CreateCreditApplicationResponse,
  CreditApplicationsParams,
  CreditApplicationsResponse,
} from '../types/solicitudes.types'
import type { SolicitudFormValues } from '../schemas/solicitud.schema'

/**
 * El backend guarda los archivos como ruta absoluta del servidor
 * (/var/www/html/back/create/document_credit/<archivo>). Devuelve un enlace
 * abierto en el navegador, o null si no aplica.
 */
export function creditFileUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  if (/^https?:\/\//i.test(raw)) return raw
  const name = raw.split('/').pop()
  if (!name) return null
  return `${config.apiUrl}/create/document_credit/${name}`
}

function appendFile(fd: FormData, key: string, value: unknown): void {
  const list = value as FileList | null
  if (list?.length) fd.append(key, list[0])
}

function toFormData(values: SolicitudFormValues): FormData {
  const fd = new FormData()
  fd.append('name', values.name)
  fd.append('document', values.document)
  fd.append('type_credit', values.type_credit)
  fd.append('requested_amount', values.requested_amount)
  fd.append('rate', values.rate)
  fd.append('term', values.term)
  fd.append('warranty', values.warranty ?? '')
  fd.append('state', values.state)
  appendFile(fd, 'archive_document', values.archive_document)
  appendFile(fd, 'archive_payment_stub', values.archive_payment_stub)
  appendFile(fd, 'archive_other', values.archive_other)
  return fd
}

export const solicitudesService = {
  list: (params: CreditApplicationsParams = {}) =>
    api.get<CreditApplicationsResponse>('/list/credit_application.php', { params }),
  create: (values: SolicitudFormValues) =>
    api.post<CreateCreditApplicationResponse>('/create/c_credit_application.php', toFormData(values), {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  // Misma URL/método (POST) con id + _method=PUT. Si no hay archivo nuevo, se conserva el anterior.
  update: (id: number | string, values: SolicitudFormValues) => {
    const fd = toFormData(values)
    fd.append('id', String(id))
    fd.append('_method', 'PUT')
    return api.post<CreateCreditApplicationResponse>('/create/c_credit_application.php', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
