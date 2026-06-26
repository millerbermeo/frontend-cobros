import Cookies from 'js-cookie'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { setAuthToken } from '@/lib/axios'
import { decrypt, encrypt } from '@/lib/crypto'
import type { User } from '../types/auth.types'

const cookieStorage = createJSONStorage(() => ({
  getItem: (name: string) => {
    const raw = Cookies.get(name)
    if (!raw) return null
    return decrypt(raw)
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, encrypt(value), { expires: 7, secure: true, sameSite: 'strict' })
  },
  removeItem: (name: string) => Cookies.remove(name),
}))

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
      storage: cookieStorage,
      onRehydrateStorage: () => (state) => {
        setAuthToken(state?.token ?? null)
      },
    }
  )
)

// Sincroniza sesión entre pestañas: si otra pestaña escribe 'auth-store'
// (login/logout), esta re-lee storage y actualiza user/token/axios.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'auth-store') {
      void useAuthStore.persist.rehydrate()
    }
  })
}
