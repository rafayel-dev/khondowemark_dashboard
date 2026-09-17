import { AlertTriangle, Bell, Briefcase, ShieldCheck, UserPlus } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { PageHeader } from '@/components/ui/PageHeader'
import { useToast } from '@/hooks/useToast'
import { notifications as initialNotifications } from '@/data/notifications'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  user: UserPlus,
  provider: Briefcase,
  dispute: AlertTriangle,
  verification: ShieldCheck,
}

function iconFor(title: string) {
  const key = Object.keys(icons).find((k) => title.toLowerCase().includes(k))
  return icons[key ?? 'user']
}

export default function Notifications() {
  const showToast = useToast()
  const [notifications, setNotifications] = useState(initialNotifications)
  const hasUnread = notifications.some((item) => !item.read)

  function markAllAsRead() {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })))
    showToast('All notifications marked as read')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Notifications"
        icon={Bell}
        action={
          <Button
            variant="ghost"
            disabled={!hasUnread}
            onClick={markAllAsRead}
            className="h-9 rounded-full px-4 text-xs"
          >
            Mark all as read
          </Button>
        }
      />

      <div className="flex flex-col gap-3.5">
        {notifications.map((item) => {
          const Icon = iconFor(item.title)
          return (
            <div
              key={item.id}
              className={cn('flex items-center gap-2.5 rounded-xl p-4', item.read ? 'bg-black/[0.04]' : 'bg-brand-soft')}
            >
              <div className="flex size-11 shrink-0 items-center justify-center rounded-[11px] bg-brand">
                <Icon size={22} className="text-app" />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <p className="text-base font-bold text-text">{item.title}</p>
                <p className="text-[15px] font-medium text-text-soft">{item.message}</p>
              </div>
              <span className="text-[10px] font-semibold lowercase text-text">{item.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
