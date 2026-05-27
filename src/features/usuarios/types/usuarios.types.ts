export type RolUsuario = 'admin' | 'cobrador' | 'supervisor' | 'auditor'
export type EstadoUsuario = 'activo' | 'inactivo'

export interface Usuario {
  id: string
  nombre: string
  apellido: string
  email: string
  rol: RolUsuario
  estado: EstadoUsuario
  createdAt: string
}

export interface CreateUsuarioDto {
  nombre: string
  apellido: string
  email: string
  rol: RolUsuario
  password: string
}

export interface UpdateUsuarioDto {
  nombre?: string
  apellido?: string
  email?: string
  rol?: RolUsuario
  estado?: EstadoUsuario
}
