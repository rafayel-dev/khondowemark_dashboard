import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'

export function EmptyState({ message, icon: Icon = Inbox }: { message: string; icon?: LucideIcon }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-black/[0.02] px-6 py-8 text-center">
      <Icon size={32} className="text-text-soft" />
      <p className="max-w-md text-sm text-text-soft">{message}</p>
    </div>
  )
}
