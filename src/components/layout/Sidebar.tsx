import { LogOut } from 'lucide-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.svg'
import nchitoIcon from '@/assets/nchito.svg'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { cn } from '@/lib/utils'
import { navItems } from './nav-items'

interface SidebarProps {
  collapsed?: boolean
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const navigate = useNavigate()
  const [confirmingLogout, setConfirmingLogout] = useState(false)

  return (
    <aside
      className={cn(
        'no-scrollbar flex h-full shrink-0 flex-col gap-3 overflow-y-auto border-r-[0.5px] border-border bg-app transition-all duration-300',
        collapsed ? 'w-22 items-center p-4' : 'w-65 p-5'
      )}
    >
      <div
        className={cn(
          'flex h-18 shrink-0 items-center justify-center rounded-xl bg-black/1 transition-all',
          collapsed ? 'w-full px-2' : 'w-full px-5 py-1.5'
        )}
      >
        <img
          src={collapsed ? nchitoIcon : logo}
          alt="Nchito"
          className={cn('transition-all', collapsed ? 'h-8 w-8 object-contain' : 'h-8 w-auto')}
        />
      </div>

      <nav className="flex flex-1 flex-col justify-between w-full">
        <ul className={cn('flex flex-col gap-1', collapsed && 'items-center')}>
          {navItems.map(({ label, to, icon: Icon }) => (
            <li key={to} className={cn(collapsed && 'flex justify-center w-full')}>
              <NavLink
                to={to}
                end={to === '/'}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  cn(
                    'flex h-12 items-center rounded-[10px] text-[15px] font-semibold capitalize transition-all',
                    collapsed ? 'w-12 justify-center px-0' : 'w-53 gap-2.5 px-4',
                    isActive ? 'bg-brand text-app' : 'text-text hover:bg-brand-soft',
                  )
                }
              >
                <Icon size={20} strokeWidth={2} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={cn(collapsed && 'flex justify-center w-full')}>
        <button
          type="button"
          title={collapsed ? 'Log Out' : undefined}
          onClick={() => setConfirmingLogout(true)}
          className={cn(
            'flex h-12 shrink-0 cursor-pointer items-center rounded-xl border border-error bg-[#FFF5F5] text-error transition-all hover:bg-[#FDE8E8]',
            collapsed
              ? 'w-12 justify-center px-0'
              : 'w-53 gap-3.5 px-5 text-[16px] font-semibold italic',
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>

      {confirmingLogout && (
        <ConfirmDialog
          title="Confirm Log out !"
          description="You will need to re-authenticate to access the Admin dashboard again"
          confirmLabel="Confirm"
          tone="warning"
          onCancel={() => setConfirmingLogout(false)}
          onConfirm={() => {
            localStorage.removeItem('isAuthenticated')
            navigate('/login')
          }}
        />
      )}
    </aside>
  )
}
