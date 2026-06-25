import { Navigate, Outlet } from 'react-router-dom'
import { MdAccountBalanceWallet, MdCheckCircle } from 'react-icons/md'
import { useAuthStore } from '@/features/auth/store/auth.store'

const FEATURES = [
  'Gestión integral de clientes',
  'Control de cobranza automatizado',
  'Reportes y análisis en tiempo real',
]

export function AuthLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen flex">
      {/* ── Left decorative panel ── */}
      <div
        className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col justify-between p-12"
        style={{ background: 'linear-gradient(145deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)' }}
      >
        {/* Background blobs */}
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-20 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
          style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}
        />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <MdAccountBalanceWallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-white text-xl font-bold tracking-tight">Cobros</span>
        </div>

        {/* Headline */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Gestiona tus cobros{' '}
            <span className="text-white/70">con total control</span>
          </h2>
          <p className="text-white/60 text-base mb-10 max-w-xs leading-relaxed">
            Plataforma todo-en-uno para la administración de créditos, contratos y cobranza.
          </p>

          <div className="flex flex-col gap-3">
            {FEATURES.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3"
              >
                <MdCheckCircle className="w-4 h-4 text-white/80 shrink-0" />
                <span className="text-sm text-white/90 font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p className="relative z-10 text-white/30 text-xs">
          © {new Date().getFullYear()} Cobros. Todos los derechos reservados.
        </p>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background px-6 py-12">
        {/* Mobile brand header */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <MdAccountBalanceWallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">Cobros</span>
        </div>

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
