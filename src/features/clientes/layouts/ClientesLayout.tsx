import type { ReactNode } from 'react'

interface ClientesLayoutProps {
  children?: ReactNode
}

export function ClientesLayout({ children }: ClientesLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
