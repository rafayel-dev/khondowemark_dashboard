import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function PageHeader({
  title,
  subtitle,
  action,
  showBack = true,
}: {
  title: string
  subtitle?: string
  action?: React.ReactNode
  showBack?: boolean
}) {
  const navigate = useNavigate()

  return (
    <div className="mb-4 flex h-8 items-center justify-between">
      <div className="flex items-center gap-1.5">
        {showBack && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => navigate(-1)}
            className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border text-text-soft"
          >
            <ChevronLeft size={12} />
          </button>
        )}
        <h1 className="text-base font-semibold capitalize text-text-soft">{title}</h1>
        {subtitle && <span className="text-sm text-text-soft">— {subtitle}</span>}
      </div>
      {action}
    </div>
  )
}
