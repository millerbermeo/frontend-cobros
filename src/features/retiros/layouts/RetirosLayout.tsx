import type { ReactNode } from 'react'

interface RetirosLayoutProps {
  children?: ReactNode
}

export function RetirosLayout({ children }: RetirosLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
