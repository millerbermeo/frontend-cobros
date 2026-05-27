import type { ReactNode } from 'react'

interface AprobacionesLayoutProps {
  children?: ReactNode
}

export function AprobacionesLayout({ children }: AprobacionesLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
