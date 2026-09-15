import { ShieldCheck } from 'lucide-react'
import { LegalDocumentEditor } from '@/components/patterns/LegalDocumentEditor'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAppData } from '@/hooks/useAppData'

export default function PrivacyPolicy() {
  const { privacyDocument, setPrivacyDocument } = useAppData()

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Privacy Policy" icon={ShieldCheck} />
      <LegalDocumentEditor doc={privacyDocument} onSave={setPrivacyDocument} />
    </div>
  )
}
