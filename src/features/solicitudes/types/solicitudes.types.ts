/** Solicitud de crédito tal cual la devuelve el backend (GET /list/credit_application.php) */
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
}

export interface Pagination {
  total: number | string
  per_page: number
  current_page: number
  last_page: number
}

export interface CreditApplicationsResponse {
  success: boolean
  /** Array en el listado; objeto único cuando el filtro por document acierta */
  data: CreditApplication[] | CreditApplication
  pagination?: Pagination
}

export interface CreditApplicationsParams {
  page?: number
  per_page?: number
  document?: string
  name?: string
}

export interface CreateCreditApplicationResponse {
  success: boolean
  message: string
  id: number
}
