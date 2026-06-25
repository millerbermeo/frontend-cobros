import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { useAuthStore } from '../store/auth.store'
import { alert } from '@/shared/utils/alert'
import type { LoginRequest } from '../types/auth.types'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: () => {
      navigate('/', { replace: true })
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  return useCallback(() => {
    alert.confirm('¿Cerrar sesión?', {
      text: 'Tendrás que volver a iniciar sesión para acceder.',
      confirmText: 'Sí, salir',
      cancelText: 'Cancelar',
      onConfirm: () => {
        logout()
        navigate('/auth/login', { replace: true })
      },
    })
  }, [logout, navigate])
}

export function useCurrentUser() {
  return useAuthStore((s) => s.user)
}

export function useUserModules() {
  return useAuthStore((s) => s.user?.modules ?? [])
}
