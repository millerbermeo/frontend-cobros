import { createBrowserRouter } from 'react-router-dom'
import { AppProviders } from '@/app/providers/AppProviders'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { MainLayout } from '@/app/layouts/MainLayout'
import { AuthGuard } from '@/app/guards/AuthGuard'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage'
import { ClientesPage } from '@/features/clientes/pages/ClientesPage'
import { SolicitudesPage } from '@/features/solicitudes/pages/SolicitudesPage'
import { AprobacionesPage } from '@/features/aprobaciones/pages/AprobacionesPage'
import { ContratosPage } from '@/features/contratos/pages/ContratosPage'
import { CobranzaPage } from '@/features/cobranza/pages/CobranzaPage'
import { ClientesMoraPage } from '@/features/clientes-mora/pages/ClientesMoraPage'
import { AbonosPage } from '@/features/abonos/pages/AbonosPage'
import { RetirosPage } from '@/features/retiros/pages/RetirosPage'
import { ReportesPage } from '@/features/reportes/pages/ReportesPage'
import { ConfiguracionPage } from '@/features/configuracion/pages/ConfiguracionPage'
import { NotFoundPage } from '@/app/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <AppProviders />,
    children: [
      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
        ],
      },
      {
        path: '/',
        element: <AuthGuard />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <DashboardPage /> },
              { path: 'clientes', element: <ClientesPage /> },
              { path: 'solicitudes', element: <SolicitudesPage /> },
              { path: 'aprobaciones', element: <AprobacionesPage /> },
              { path: 'contratos', element: <ContratosPage /> },
              { path: 'cobranza', element: <CobranzaPage /> },
              { path: 'clientes-mora', element: <ClientesMoraPage /> },
              { path: 'abonos', element: <AbonosPage /> },
              { path: 'retiros', element: <RetirosPage /> },
              { path: 'reportes', element: <ReportesPage /> },
              { path: 'configuracion', element: <ConfiguracionPage /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
