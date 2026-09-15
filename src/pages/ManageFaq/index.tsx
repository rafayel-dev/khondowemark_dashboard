import { MessageCircleQuestion, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Modal } from '@/components/ui/Modal'
import { PageHeader } from '@/components/ui/PageHeader'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/hooks/useToast'
import { type Faq, faqs as initialFaqs } from '@/data/faqs'

export default function ManageFaq() {
  const showToast = useToast()
  const [faqs, setFaqs] = useState(initialFaqs)
  const [editingFaq, setEditingFaq] = useState<Faq | 'new' | null>(null)

  function deleteFaq(faq: Faq) {
    setFaqs((current) => current.filter((item) => item.id !== faq.id))
    showToast('FAQ deleted', 'error')
  }

  function saveFaq(faq: Faq) {
    setFaqs((current) => {
      const exists = current.some((item) => item.id === faq.id)
      return exists ? current.map((item) => (item.id === faq.id ? faq : item)) : [faq, ...current]
    })
    setEditingFaq(null)
    showToast('FAQ saved successfully')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Manage FAQ"
        icon={MessageCircleQuestion}
        action={
          <button
            type="button"
            onClick={() => setEditingFaq('new')}
            className="flex h-11 items-center gap-1.5 rounded-xl bg-brand px-6 text-sm font-semibold text-app"
          >
            <Plus size={16} />
            Add New
          </button>
        }
      />

      <div className="flex flex-col gap-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="flex flex-col gap-2.5 rounded-2xl border border-brand-soft bg-black/[0.01] p-4">
            <div className="flex items-center justify-between gap-2.5">
              <p className="flex-1 text-base font-semibold text-text">{faq.question}</p>
              <div className="flex items-center gap-2.5">
                <IconButton aria-label="Edit FAQ" variant="brand" className="bg-blue-500/15 text-blue-500" onClick={() => setEditingFaq(faq)}>
                  <Pencil size={16} />
                </IconButton>
                <IconButton aria-label="Delete FAQ" variant="error" onClick={() => deleteFaq(faq)}>
                  <Trash2 size={16} />
                </IconButton>
              </div>
            </div>
            <div className="h-px w-full bg-brand-soft" />
            <p className="text-sm italic text-text-soft">{faq.answer}</p>
          </div>
        ))}
        {faqs.length === 0 && <p className="p-6 text-center text-sm text-text-soft">No FAQs yet.</p>}
      </div>

      {editingFaq && (
        <EditFaqModal
          faq={editingFaq === 'new' ? { id: crypto.randomUUID(), question: '', answer: '' } : editingFaq}
          onClose={() => setEditingFaq(null)}
          onSave={saveFaq}
        />
      )}
    </div>
  )
}

function EditFaqModal({ faq, onClose, onSave }: { faq: Faq; onClose: () => void; onSave: (faq: Faq) => void }) {
  const [form, setForm] = useState(faq)

  return (
    <Modal title={faq.question ? 'Edit FAQ' : 'Add FAQ'} onClose={onClose}>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          onSave(form)
        }}
      >
        <Textarea label="Question" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required rows={2} />
        <Textarea label="Answer" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required rows={3} />
        <div className="flex gap-2.5">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  )
}
