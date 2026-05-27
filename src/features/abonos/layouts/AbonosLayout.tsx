import type { ReactNode } from 'react'

interface AbonosLayoutProps {
  children?: ReactNode
}

export function AbonosLayout({ children }: AbonosLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
