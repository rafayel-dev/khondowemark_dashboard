import { cn } from '@/lib/utils'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }

export function Textarea({ label, id, className, ...props }: TextareaProps) {
  return (
    <div className="flex w-full flex-col gap-[6px]">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full resize-none rounded-xl border border-border bg-app px-4 py-3 text-sm text-text placeholder:text-text-soft focus:border-brand focus:outline-none',
          className,
        )}
        {...props}
      />
    </div>
  )
}
