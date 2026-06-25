import { authApi } from '../api/auth.api'
import { useAuthStore } from '../store/auth.store'
import type { LoginRequest } from '../types/auth.types'

export const authService = {
  async login(credentials: LoginRequest) {
    const { data } = await authApi.login(credentials)

    console.log(data)
    const user = {
      user_id: data.user_id,
      username: data.username,
      name: data.name,
      rol: data.rol,
      modules: JSON.parse(data.modules) as string[],
    }

    useAuthStore.getState().login(user, data.token)
    return user
  },
}
