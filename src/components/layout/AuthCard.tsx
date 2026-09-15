import { cn } from '@/lib/utils'

export function AuthCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-app p-6">
      <div className={cn('flex w-full max-w-[700px] flex-col gap-8 rounded-3xl border border-border p-8', className)}>
        {children}
      </div>
    </div>
  )
}
