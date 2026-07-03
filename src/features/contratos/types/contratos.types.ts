/** Solicitud de crédito devuelta por GET /list/credit_application.php */
export interface CreditApplication {
  id: number
  name: string
  document: string
  type_credit: string
  requested_amount: number
  rate: string
  term: number
  warranty: string
  archive_document: string
  archive_payment_stub: string
  archive_other: string
  state: string
  archive_1?: string | null
  archive_2?: string | null
  archive_3?: string | null
  creation_date?: string | null
  cutoff_date?: string | null
  signature_date?: string | null
}

export interface Pagination {
  total: number | string
  per_page: number
  current_page: number
  last_page: number
}

export interface CreditApplicationsResponse {
  success: boolean
  data: CreditApplication[] | CreditApplication
  pagination?: Pagination
}

export interface CreditApplicationsParams {
  page?: number
  per_page?: number
  document?: string
  name?: string
  state?: string
}
