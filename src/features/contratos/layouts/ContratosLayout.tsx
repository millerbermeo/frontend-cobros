import type { ReactNode } from 'react'

interface ContratosLayoutProps {
  children?: ReactNode
}

export function ContratosLayout({ children }: ContratosLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
