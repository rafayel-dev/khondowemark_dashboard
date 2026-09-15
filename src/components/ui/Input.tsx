import { cn } from '@/lib/utils'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string }

export function Input({ label, id, className, ...props }: InputProps) {
  return (
    <div className="flex w-full flex-col gap-[6px]">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'h-[50px] w-full rounded-xl border border-border bg-app px-4 text-sm text-text placeholder:text-text-soft focus:border-brand focus:outline-none',
          className,
        )}
        {...props}
      />
    </div>
  )
}
