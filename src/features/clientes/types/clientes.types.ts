export type TipoIdentificacion =
  | 'cedula'
  | 'cedula_extranjeria'
  | 'pasaporte'
  | 'nit'
  | 'tarjeta_identidad'

export interface CreateClienteResponse {
  success: boolean
  message: string
  id: number
}

/** Cliente tal cual lo devuelve el backend (GET /list/customers.php) */
export interface Customer {
  id: number
  name: string
  document: string
  address: string
  phone: string
  email: string
  recommended: string
  additional_phone: string
  type_work: string
  employing_entity: string
  source_of_income: string
  url_source_of_income: string
}

export interface Pagination {
  total: number | string
  per_page: number
  current_page: number
  last_page: number
}

export interface CustomersResponse {
  success: boolean
  /** Array en el listado; objeto único cuando el filtro por document acierta */
  data: Customer[] | Customer
  pagination?: Pagination
}

export interface CustomersParams {
  page?: number
  per_page?: number
  document?: string
  name?: string
}

export interface Cliente {
  id: string
  nombre: string
  apellidos: string
  tipoIdentificacion: TipoIdentificacion
  numeroIdentificacion: string
  direccion: string
  telefono: string
  correo?: string
  recomendadoPor?: string
  telefonoAdicional?: string
  tipoTrabajo: string
  entidadTrabajo: string
  fuenteIngresos?: string
  createdAt: string
}
