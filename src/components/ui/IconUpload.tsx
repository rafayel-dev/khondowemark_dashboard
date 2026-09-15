import { ImagePlus } from 'lucide-react'
import { useRef } from 'react'

export function IconUpload({ preview, onSelect }: { preview?: string; onSelect: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onSelect(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-black/[0.04] text-sm text-text-soft"
      >
        <ImagePlus size={16} />
        Upload an SVG icon for this category.
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/svg+xml,image/png,image/jpeg"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {preview && (
        <div className="relative size-14 overflow-hidden rounded-xl border border-border bg-brand-soft">
          <img src={preview} alt="Category icon preview" className="size-full object-contain p-2" />
        </div>
      )}
    </div>
  )
}
