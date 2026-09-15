import { ScrollText } from 'lucide-react'
import { LegalDocumentEditor } from '@/components/patterns/LegalDocumentEditor'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAppData } from '@/hooks/useAppData'

export default function Terms() {
  const { termsDocument, setTermsDocument } = useAppData()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Terms & Conditions" icon={ScrollText} />
      <LegalDocumentEditor doc={termsDocument} onSave={setTermsDocument} />
    </div>
  )
}
