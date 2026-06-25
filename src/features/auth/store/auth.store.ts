import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { setAuthToken } from '@/lib/axios'
import type { User } from '../types/auth.types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        setAuthToken(token)
        set({ user, token, isAuthenticated: true })
      },

      logout: () => {
        setAuthToken(null)
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-store',
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          setAuthToken(state.token)
        }
      },
    }
  )
)
