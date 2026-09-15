import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setMobileOpen((prev) => !prev)
    } else {
      setCollapsed((prev) => !prev)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-app">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 transition-all duration-300 lg:static lg:h-full',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <Sidebar collapsed={collapsed} />
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col">
        <Topbar onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-5 py-2.5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
