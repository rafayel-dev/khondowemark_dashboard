import { cn } from '@/lib/utils'

const variants = {
  success: 'bg-success-soft text-success',
  error: 'bg-error-soft text-error',
  warning: 'bg-warning-soft text-warning',
  info: 'bg-blue-500/20 text-blue-500',
  purple: 'bg-violet-500/20 text-violet-500',
  neutral: 'bg-black/5 text-text-soft',
} as const

export function Badge({
  children,
  variant = 'neutral',
  className,
}: {
  children: React.ReactNode
  variant?: keyof typeof variants
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-[5px] text-xs font-medium italic capitalize',
        variants[variant],
        className,
      )}
    >
      <span className="size-[5px] shrink-0 rounded-full bg-current" />
      {children}
    </span>
  )
}
