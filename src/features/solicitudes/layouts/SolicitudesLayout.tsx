import type { ReactNode } from 'react'

interface SolicitudesLayoutProps {
  children?: ReactNode
}

export function SolicitudesLayout({ children }: SolicitudesLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
