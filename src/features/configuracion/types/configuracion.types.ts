export interface ConfiguracionGeneral {
  nombreEmpresa: string
  ruc: string
  telefono: string
  email: string
  direccion: string
  logo?: string
}

export interface ConfiguracionCredito {
  tasaInteresMinima: number
  tasaInteresMaxima: number
  montoMinimo: number
  montoMaximo: number
  plazoMinimo: number
  plazoMaximo: number
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: string
  activo: boolean
  createdAt: string
}
