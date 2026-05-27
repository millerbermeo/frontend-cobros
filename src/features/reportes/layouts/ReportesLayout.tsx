import type { ReactNode } from 'react'

interface ReportesLayoutProps {
  children?: ReactNode
}

export function ReportesLayout({ children }: ReportesLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
