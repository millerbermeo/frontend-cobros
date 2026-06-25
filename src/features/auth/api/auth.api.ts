import api from '@/lib/axios'
import type { LoginApiResponse, LoginRequest } from '../types/auth.types'

export const authApi = {
  login: (credentials: LoginRequest) =>
    api.post<LoginApiResponse>('/token', credentials),
}
