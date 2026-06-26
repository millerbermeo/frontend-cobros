import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppProviders } from '@/app/providers/AppProviders'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { MainLayout } from '@/app/layouts/MainLayout'
import { AuthGuard } from '@/app/guards/AuthGuard'
import { NotFoundPage } from '@/app/pages/NotFoundPage'
import { FullPageSpinner } from '@/shared/components/loaders/Spinner'

const LoginPage         = lazy(() => import('@/features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })))
const DashboardPage     = lazy(() => import('@/features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage })))
const ClientesPage      = lazy(() => import('@/features/clientes/pages/ClientesPage').then(m => ({ default: m.ClientesPage })))
const SolicitudesPage   = lazy(() => import('@/features/solicitudes/pages/SolicitudesPage').then(m => ({ default: m.SolicitudesPage })))
const AprobacionesPage  = lazy(() => import('@/features/aprobaciones/pages/AprobacionesPage').then(m => ({ default: m.AprobacionesPage })))
const ContratosPage     = lazy(() => import('@/features/contratos/pages/ContratosPage').then(m => ({ default: m.ContratosPage })))
const CobranzaPage      = lazy(() => import('@/features/cobranza/pages/CobranzaPage').then(m => ({ default: m.CobranzaPage })))
const ClientesMoraPage  = lazy(() => import('@/features/clientes-mora/pages/ClientesMoraPage').then(m => ({ default: m.ClientesMoraPage })))
const AbonosPage        = lazy(() => import('@/features/abonos/pages/AbonosPage').then(m => ({ default: m.AbonosPage })))
const RetirosPage       = lazy(() => import('@/features/retiros/pages/RetirosPage').then(m => ({ default: m.RetirosPage })))
const ReportesPage      = lazy(() => import('@/features/reportes/pages/ReportesPage').then(m => ({ default: m.ReportesPage })))
const ConfiguracionPage = lazy(() => import('@/features/configuracion/pages/ConfiguracionPage').then(m => ({ default: m.ConfiguracionPage })))

function PageSuspense({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<FullPageSpinner />}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <PageSuspense><LoginPage /></PageSuspense> },
        ],
      },
      {
        path: '/',
        element: <AuthGuard />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true,             element: <PageSuspense><DashboardPage /></PageSuspense> },
              { path: 'clientes',        element: <PageSuspense><ClientesPage /></PageSuspense> },
              { path: 'solicitudes',     element: <PageSuspense><SolicitudesPage /></PageSuspense> },
              { path: 'aprobaciones',    element: <PageSuspense><AprobacionesPage /></PageSuspense> },
              { path: 'contratos',       element: <PageSuspense><ContratosPage /></PageSuspense> },
              { path: 'cobranza',        element: <PageSuspense><CobranzaPage /></PageSuspense> },
              { path: 'clientes-mora',   element: <PageSuspense><ClientesMoraPage /></PageSuspense> },
              { path: 'abonos',          element: <PageSuspense><AbonosPage /></PageSuspense> },
              { path: 'retiros',         element: <PageSuspense><RetirosPage /></PageSuspense> },
              { path: 'reportes',        element: <PageSuspense><ReportesPage /></PageSuspense> },
              { path: 'configuracion',   element: <PageSuspense><ConfiguracionPage /></PageSuspense> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
