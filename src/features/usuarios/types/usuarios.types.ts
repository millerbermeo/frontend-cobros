export type RolUsuario = 'Administrador' | 'Supervisor' | 'Cobrador' | 'Auditor'

export interface Usuario {
  id: number
  name: string
  username: string
  pass?: string
  rol: RolUsuario
  state: number // 1 = activo, 0 = inactivo
}
