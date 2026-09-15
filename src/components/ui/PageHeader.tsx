import type { LucideIcon } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'

export function PageHeader({
  title,
  subtitle,
  icon: Icon = LayoutGrid,
  action,
}: {
  title: string
  subtitle?: string
  icon?: LucideIcon
  action?: React.ReactNode
}) {
  return (
    <div className="mb-4 flex h-8 items-center justify-between">
      <div className="flex items-center gap-1.5">
        <Icon size={20} className="text-text-soft" />
        <h1 className="text-base font-semibold capitalize text-text-soft">{title}</h1>
        {subtitle && <span className="text-sm text-text-soft">— {subtitle}</span>}
      </div>
      {action}
    </div>
  )
}
