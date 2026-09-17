import { cn } from '@/lib/utils'

const variants = {
  primary: 'bg-brand text-app hover:opacity-90',
  outline: 'border border-border text-text hover:bg-black/5',
  danger: 'border-[1.5px] border-error text-error hover:bg-error-soft',
  dangerSolid: 'bg-error text-app hover:opacity-90',
  successSolid: 'bg-success text-app hover:opacity-90',
  ghost: 'text-brand hover:bg-brand-soft',
} as const

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] px-5 text-sm font-semibold capitalize transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
