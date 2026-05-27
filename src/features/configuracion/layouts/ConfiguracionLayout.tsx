import type { ReactNode } from 'react'

interface ConfiguracionLayoutProps {
  children?: ReactNode
}

export function ConfiguracionLayout({ children }: ConfiguracionLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
