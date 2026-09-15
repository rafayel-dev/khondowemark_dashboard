import { Bell, PanelLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { currentUser } from '@/data/current-user'

export function Topbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <header className="flex h-18 shrink-0 items-center border-b-[0.5px] border-border px-5 py-2.5">
      <div className="flex flex-1 items-center justify-between">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border-[0.7px] border-app bg-brand text-app transition-all hover:opacity-90 active:scale-95"
        >
          <PanelLeft size={20} />
        </button>

        <div className="flex items-center gap-3">
          <Link
            to="/notifications"
            className="flex size-9.5 items-center justify-center rounded-[9px] border border-app bg-brand text-app"
          >
            <Bell size={18} />
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft">
              <span className="font-['DM_Sans:ExtraBold_Italic'] text-[15px] font-extrabold italic text-brand">
                {currentUser.initial}
              </span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <p className="text-xs font-semibold text-text-soft">{currentUser.name}</p>
              <div className="flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1">
                <span className="size-1 rounded-full bg-success" />
                <span className="text-[10px] font-medium italic text-success">{currentUser.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
