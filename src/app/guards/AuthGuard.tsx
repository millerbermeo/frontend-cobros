import { Outlet } from 'react-router-dom'

// TODO: re-enable when backend auth endpoints are ready
export function AuthGuard() {
  return <Outlet />
}
