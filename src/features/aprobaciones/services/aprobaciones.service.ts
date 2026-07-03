import api from '@/lib/axios'
import type {
  ApproveCreditResponse,
  CreditApplicationsParams,
  CreditApplicationsResponse,
  UpdateCreditResponse,
  UpdateCreditPayload,
  UploadDocumentsResponse,
} from '../types/aprobaciones.types'
import type { DocsAprobacionValues } from '../schemas/aprobacion.schema'

function toDocsFormData(id: number, values: DocsAprobacionValues): FormData {
  const fd = new FormData()
  fd.append('id', String(id))
  const entries: [string, FileList | null | undefined][] = [
    ['archive_1', values.archive_1],
    ['archive_2', values.archive_2],
    ['archive_3', values.archive_3],
  ]
  for (const [key, list] of entries) {
    if (list?.length) fd.append(key, list[0])
  }
  return fd
}

export const aprobacionesService = {
  list: (params: CreditApplicationsParams = {}) =>
    api.get<CreditApplicationsResponse>('/list/credit_application.php', { params }),
  // PUT con body JSON: id + campos a actualizar (tasa, plazo, estado).
  update: (payload: UpdateCreditPayload) =>
    api.put<UpdateCreditResponse>('/create/update_credit_application.php', payload),
  // form-data: id + archive_1 (obligatorio), archive_2, archive_3 (opcionales).
  uploadDocuments: (id: number, values: DocsAprobacionValues) =>
    api.post<UploadDocumentsResponse>('/create/document_credit_application.php', toDocsFormData(id, values), {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  // Aprueba el crédito (cambia estado a Aprobado). form-data: id.
  approveCredit: (id: number) => {
    const fd = new FormData()
    fd.append('id', String(id))
    return api.post<ApproveCreditResponse>('/create/c_approve_credit.php', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
