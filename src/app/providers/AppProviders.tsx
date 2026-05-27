import { Outlet, useNavigate } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryClient } from '@/lib/react-query'
import { setupResponseInterceptor } from '@/lib/axios'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { GlobalModal } from '@/shared/components/GlobalModal'

export function AppProviders() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)

  useEffect(() => {
    setupResponseInterceptor(() => {
      logout()
      navigate('/auth/login', { replace: true })
    })
  }, [logout, navigate])

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <GlobalModal />
    </QueryClientProvider>
  )
}
