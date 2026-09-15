import { BadgeAlert } from 'lucide-react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  confirmVariant = 'primary',
  tone = 'warning',
  onCancel,
  onConfirm,
}: {
  title: string
  description: string
  confirmLabel: string
  confirmVariant?: 'dangerSolid' | 'successSolid' | 'primary'
  tone?: 'warning' | 'danger'
  onCancel: () => void
  onConfirm: () => void
}) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">
      <button type="button" aria-label="Close" onClick={onCancel} className="fixed inset-0 cursor-default" />
      <div className="relative flex w-full max-w-[400px] flex-col items-center gap-5 rounded-2xl border border-border bg-app p-6 text-center">
        <BadgeAlert
          size={72}
          strokeWidth={1.5}
          stroke="white"
          fill="currentColor"
          className={tone === 'danger' ? 'text-error' : 'text-warning'}
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold italic text-text">{title}</h2>
          <p className="text-sm text-text-soft">{description}</p>
        </div>
        <div className="flex w-full gap-2.5">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant={confirmVariant} className="flex-1" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
