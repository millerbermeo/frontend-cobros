export interface User {
  user_id: number
  username: string
  name: string
  rol: string
  modules: string[]
}

export interface LoginRequest {
  username: string
  password: string
}

/** Shape returned directly from POST /back/token */
export interface LoginApiResponse {
  user_id: number
  username: string
  name: string
  rol: string
  modules: string // raw JSON string — parsed before storing
  token: string
}
