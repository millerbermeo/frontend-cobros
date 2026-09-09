import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '@/shared/utils/cn'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { CONTENT_MAX_WIDTH, CONTENT_PADDING_X } from './layout.constants'

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-dvh bg-background overflow-hidden">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMobileMenuOpen={() => setMobileOpen(true)} />

        <main
          className={cn(
            CONTENT_PADDING_X,
            'flex-1 overflow-auto py-4 md:py-6 3xl:py-8 bg-gray-50 dark:bg-background'
          )}
        >
          <div className={CONTENT_MAX_WIDTH}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
