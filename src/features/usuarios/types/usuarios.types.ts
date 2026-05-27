export type RolUsuario = 'admin' | 'cobrador' | 'supervisor' | 'auditor'
export type EstadoUsuario = 'activo' | 'inactivo'

export interface Usuario {
  id: string
  nombre: string
  username?: string
  email: string
  rol: RolUsuario
  estado: EstadoUsuario
  createdAt: string
}
