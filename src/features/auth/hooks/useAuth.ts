import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { useAuthStore } from '../store/auth.store'
import type { LoginCredentials } from '../types/auth.types'

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: () => {
      navigate('/', { replace: true })
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      navigate('/auth/login', { replace: true })
    },
  })
}

export function useCurrentUser() {
  return useAuthStore((s) => s.user)
}
