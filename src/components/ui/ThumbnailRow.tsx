import { FileImage } from 'lucide-react'

export function ThumbnailRow({ count = 2 }: { count?: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex h-11 w-16 items-center justify-center rounded-lg border border-border bg-black/[0.03]">
          <FileImage size={18} className="text-text-soft" />
        </div>
      ))}
    </div>
  )
}
