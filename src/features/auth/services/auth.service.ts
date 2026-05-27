import { authApi } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'
import type { LoginCredentials } from '../types/auth.types'

export const authService = {
  async login(credentials: LoginCredentials) {
    const { data } = await authApi.login(credentials)
    useAuthStore.getState().login(data.user, data.token)
    return data
  },

  async logout() {
    try {
      await authApi.logout()
    } finally {
      useAuthStore.getState().logout()
    }
  },
}
