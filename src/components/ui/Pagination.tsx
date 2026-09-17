import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  return (
    <div className="flex h-12 items-center justify-center gap-2 rounded-b-xl bg-brand-soft px-2.5 py-5">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex size-[34px] cursor-pointer items-center justify-center rounded-[7px] bg-brand text-app disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={14} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onPageChange(n)}
          className={cn(
            'flex size-[34px] cursor-pointer items-center justify-center rounded-[7px] text-sm',
            n === page ? 'border border-brand bg-brand-soft text-brand' : 'text-text-soft',
          )}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex size-[34px] cursor-pointer items-center justify-center rounded-[7px] bg-brand text-app disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  )
}
