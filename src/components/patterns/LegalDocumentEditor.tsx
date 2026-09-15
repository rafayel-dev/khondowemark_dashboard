import { Bold, ChevronDown, Italic, Link2, List, ListOrdered, Quote, Redo2, Strikethrough, Underline, Undo2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'
import type { LegalDocument } from '@/data/legalDocuments'

const toolbarButtons: { icon: LucideIcon; command: string; value?: string; label: string }[] = [
  { icon: Undo2, command: 'undo', label: 'Undo' },
  { icon: Redo2, command: 'redo', label: 'Redo' },
  { icon: Bold, command: 'bold', label: 'Bold' },
  { icon: Italic, command: 'italic', label: 'Italic' },
  { icon: Underline, command: 'underline', label: 'Underline' },
  { icon: Strikethrough, command: 'strikeThrough', label: 'Strikethrough' },
  { icon: List, command: 'insertUnorderedList', label: 'Bulleted list' },
  { icon: ListOrdered, command: 'insertOrderedList', label: 'Numbered list' },
  { icon: Quote, command: 'formatBlock', value: 'blockquote', label: 'Quote' },
]

const BLOCK_OPTIONS = [
  { label: 'Normal text', value: 'p' },
  { label: 'Heading', value: 'h2' },
  { label: 'Subheading', value: 'h3' },
]

function formatToday() {
  return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function LegalDocumentEditor({ doc, onSave }: { doc: LegalDocument; onSave: (next: LegalDocument) => void }) {
  const showToast = useToast()
  const editorRef = useRef<HTMLDivElement>(null)
  const blockMenuRef = useRef<HTMLDivElement>(null)
  const [blockType, setBlockType] = useState('p')
  const [blockMenuOpen, setBlockMenuOpen] = useState(false)

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = doc.content
  }, [doc.content])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (blockMenuRef.current && !blockMenuRef.current.contains(event.target as Node)) setBlockMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function exec(command: string, value?: string) {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
  }

  function handleLink() {
    const url = window.prompt('Enter a URL')
    if (url) exec('createLink', url)
  }

  function handleSave() {
    if (!editorRef.current) return
    onSave({ ...doc, content: editorRef.current.innerHTML, lastUpdated: formatToday() })
    showToast(`${doc.title} saved successfully`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-brand-soft px-4 py-2">
          {toolbarButtons.map(({ icon: Icon, command, value, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => exec(command, value)}
              className="flex size-7 items-center justify-center rounded text-text-soft hover:bg-black/5"
            >
              <Icon size={16} />
            </button>
          ))}
          <button
            type="button"
            aria-label="Insert link"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleLink}
            className="flex size-7 items-center justify-center rounded text-text-soft hover:bg-black/5"
          >
            <Link2 size={16} />
          </button>

          <div ref={blockMenuRef} className="relative ml-2">
            <button
              type="button"
              onClick={() => setBlockMenuOpen((open) => !open)}
              className="flex items-center gap-1 rounded px-2 py-1 text-sm text-text hover:bg-black/5"
            >
              {BLOCK_OPTIONS.find((option) => option.value === blockType)?.label}
              <ChevronDown size={14} />
            </button>
            {blockMenuOpen && (
              <div className="absolute left-0 top-[calc(100%+4px)] z-20 w-[140px] overflow-hidden rounded-lg border border-border bg-app shadow-lg">
                {BLOCK_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      exec('formatBlock', option.value)
                      setBlockType(option.value)
                      setBlockMenuOpen(false)
                    }}
                    className="flex w-full px-3 py-2 text-left text-sm text-text hover:bg-brand-soft"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 px-4 py-4">
          <h2 className="font-bold text-text">{doc.title}</h2>
          <p className="text-sm font-bold text-text">Last Updated: {doc.lastUpdated}</p>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="min-h-[300px] text-sm text-text-soft outline-none [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:italic [&_h2]:font-bold [&_h2]:text-text [&_h3]:font-bold [&_h3]:text-text [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_strong]:font-bold [&_strong]:text-text [&_ul]:list-disc [&_ul]:pl-5"
          />
        </div>
      </div>

      <Button className="h-[50px] w-fit px-6" onClick={handleSave}>
        Save Changes
      </Button>
    </div>
  )
}
