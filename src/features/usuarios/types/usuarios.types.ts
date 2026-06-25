export interface Usuario {
  id: number
  name: string
  username: string
  rol: string
  state: number // 1 = activo, 0 = inactivo
}

export interface ListUsersResponse {
  success: boolean
  data: Usuario[]
  roles: string[]
  pagination: {
    total: number
    per_page: number
    current_page: number
    last_page: number
  }
}
