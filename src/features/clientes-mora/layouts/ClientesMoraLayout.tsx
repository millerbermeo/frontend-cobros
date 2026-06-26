import type { ReactNode } from 'react'

interface ClientesMoraLayoutProps {
  children?: ReactNode
}

export function ClientesMoraLayout({ children }: ClientesMoraLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
