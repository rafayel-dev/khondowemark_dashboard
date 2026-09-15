import { X } from 'lucide-react'

export function Modal({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <button type="button" aria-label="Close" onClick={onClose} className="fixed inset-0 cursor-default" />
      <div className="relative flex w-full max-w-[440px] flex-col gap-5 rounded-2xl border border-border bg-app p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-text">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="text-text-soft hover:text-text">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
