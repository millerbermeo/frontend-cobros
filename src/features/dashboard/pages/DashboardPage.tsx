import { useCurrentUser } from '@/features/auth/hooks/useAuth'

export function DashboardPage() {
  const user = useCurrentUser()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted">
        Bienvenido, <span className="font-medium text-foreground">{user?.name ?? 'usuario'}</span>.
      </p>
    </div>
  )
}
