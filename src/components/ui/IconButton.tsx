import { cn } from '@/lib/utils'

const variants = {
  brand: 'bg-brand text-app',
  success: 'bg-success/10 text-success',
  error: 'bg-error/10 text-error',
} as const

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  'aria-label': string
}

export function IconButton({ variant = 'brand', className, children, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={cn('flex size-8 cursor-pointer items-center justify-center rounded-lg', variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
