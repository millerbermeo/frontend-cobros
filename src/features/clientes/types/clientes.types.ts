export type TipoIdentificacion =
  | 'cedula'
  | 'cedula_extranjeria'
  | 'pasaporte'
  | 'nit'
  | 'tarjeta_identidad'

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
