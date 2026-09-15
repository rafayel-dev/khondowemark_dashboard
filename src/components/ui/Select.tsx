import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label?: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative flex w-full flex-col gap-[6px]">
      {label && <span className="text-sm font-medium text-text">{label}</span>}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-[50px] w-full items-center justify-between rounded-xl border border-border bg-app px-4 text-sm text-text focus:border-brand focus:outline-none"
      >
        {value}
        <ChevronDown size={16} className={cn('text-text-soft transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-[calc(100%+6px)] z-20 w-full overflow-hidden rounded-xl border border-border bg-app shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-text hover:bg-brand-soft"
            >
              {option}
              {value === option && <Check size={14} className="text-brand" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
