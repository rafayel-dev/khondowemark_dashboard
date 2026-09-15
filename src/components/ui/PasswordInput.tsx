import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & { label?: string }

export function PasswordInput({ label, id, className, ...props }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex w-full flex-col gap-[6px]">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
      )}
      <div
        className={cn(
          'flex h-[50px] w-full items-center gap-2 rounded-xl border border-border bg-app px-4 focus-within:border-brand',
          className,
        )}
      >
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="w-full bg-transparent text-sm text-text placeholder:text-text-soft focus:outline-none"
          {...props}
        />
        <button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible((v) => !v)} className="shrink-0 text-text-soft">
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  )
}
