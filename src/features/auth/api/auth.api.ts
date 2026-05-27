import api from '@/lib/axios'
import type { AuthResponse, LoginCredentials, User } from '../types/auth.types'

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<AuthResponse>('/auth/login', credentials),

  logout: () =>
    api.post('/auth/logout'),

  me: () =>
    api.get<{ user: User }>('/auth/me'),
}
