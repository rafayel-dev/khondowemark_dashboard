import { CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ToastContext, type ToastVariant } from './toast-context'

type ToastItem = { id: number; message: string; variant: ToastVariant }

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  function show(message: string, variant: ToastVariant = 'success') {
    const id = Date.now()
    setToasts((current) => [...current, { id, message, variant }])
    setTimeout(() => setToasts((current) => current.filter((t) => t.id !== id)), 3000)
  }

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5">
        {toasts.map((toast) => {
          const Icon = toast.variant === 'success' ? CheckCircle2 : XCircle
          return (
            <div
              key={toast.id}
              className={cn(
                'flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg',
                toast.variant === 'success' ? 'border-success/30 bg-success-soft text-success' : 'border-error/30 bg-error-soft text-error',
              )}
            >
              <Icon size={18} />
              {toast.message}
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
