import type { ReactNode } from 'react'

interface CobranzaLayoutProps {
  children?: ReactNode
}

export function CobranzaLayout({ children }: CobranzaLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
