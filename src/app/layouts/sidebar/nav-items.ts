import type { IconType } from 'react-icons'
import {
  MdDashboard,
  MdPeople,
  MdAssignment,
  MdCheckCircle,
  MdDescription,
  MdAccountBalance,
  MdReportProblem,
  MdPayment,
  MdCallMade,
  MdBarChart,
  MdSettings,
} from 'react-icons/md'

export interface NavItemConfig {
  label: string
  icon: IconType
  path: string
  moduleKey: string
  end?: boolean
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Dashboard',              icon: MdDashboard,         path: '/',             moduleKey: 'Dashboard',               end: true },
  { label: 'Clientes',               icon: MdPeople,            path: '/clientes',     moduleKey: 'Clientes'               },
  { label: 'Solicitudes de Crédito', icon: MdAssignment,        path: '/solicitudes',  moduleKey: 'Solicitudes de Crédito' },
  { label: 'Aprobaciones',           icon: MdCheckCircle,       path: '/aprobaciones', moduleKey: 'Aprobaciones'           },
  { label: 'Contratos',              icon: MdDescription,       path: '/contratos',    moduleKey: 'Contratos'              },
  { label: 'Cobranza',               icon: MdAccountBalance,    path: '/cobranza',     moduleKey: 'Cobranza'               },
  { label: 'Clientes en Mora',       icon: MdReportProblem,     path: '/clientes-mora',moduleKey: 'Clientes en Mora'       },
  { label: 'Abonos',                 icon: MdPayment,           path: '/abonos',       moduleKey: 'Abonos'                 },
  { label: 'Retiros',                icon: MdCallMade,          path: '/retiros',      moduleKey: 'Retiros'                },
  { label: 'Reportes',               icon: MdBarChart,          path: '/reportes',     moduleKey: 'Reportes'               },
  { label: 'Configuración',          icon: MdSettings,          path: '/configuracion',moduleKey: 'Configuración'          },
]

export const SIDEBAR_GRADIENT =
  'linear-gradient(145deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)'
