import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { useToast } from '@/hooks/useToast'

const initialInfo = {
  companyName: 'Nchito',
  businessType: 'Online Service Marketplace Platform',
  country: 'Zambia',
  contactEmail: 'support@nchito.com',
  contactPhone: '+260 97 123 4567',
  website: 'www.Nchito.com',
}

const fields: { key: keyof typeof initialInfo; label: string }[] = [
  { key: 'companyName', label: 'Company Name' },
  { key: 'businessType', label: 'Business Type' },
  { key: 'country', label: 'Country' },
  { key: 'contactEmail', label: 'Contact Email' },
  { key: 'contactPhone', label: 'Contact Phone' },
  { key: 'website', label: 'Official Website' },
]

export default function LegalCompany() {
  const showToast = useToast()
  const [info, setInfo] = useState(initialInfo)
  const [editing, setEditing] = useState(false)
  const [pendingInfo, setPendingInfo] = useState<typeof initialInfo | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const next = { ...info }
    for (const field of fields) next[field.key] = String(formData.get(field.key) ?? info[field.key])
    setPendingInfo(next)
  }

  function confirmUpdate() {
    if (!pendingInfo) return
    setInfo(pendingInfo)
    setPendingInfo(null)
    setEditing(false)
    showToast('Company info updated successfully')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Legal & Company" />

      {editing ? (
        <div className="flex max-w-[760px] flex-col gap-5 rounded-2xl border border-border p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-text">Update Legal & Company Info</h1>
            <p className="text-sm text-text-soft">Manage and update your official company details.</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-4">
              {fields.map((field) => (
                <div key={field.key} className="min-w-[240px] flex-1 basis-[45%]">
                  <Input name={field.key} label={field.label} defaultValue={info[field.key]} required />
                </div>
              ))}
            </div>

            <Button type="submit" className="h-[50px] w-fit px-6">
              Save The Changes
            </Button>
          </form>
        </div>
      ) : (
        <>
          <DetailCard title="Legal & Company Information">
            <div className="flex flex-wrap">
              {fields.map((field) => (
                <InfoField key={field.key} label={field.label} value={info[field.key]} />
              ))}
            </div>
          </DetailCard>

          <Button className="h-[50px] w-fit px-6" onClick={() => setEditing(true)}>
            Update Info
          </Button>
        </>
      )}

      {pendingInfo && (
        <ConfirmDialog
          title="Update Information !"
          description="Are you sure you want to save these changes! The updated details will be reflected immediately on your platform profile."
          confirmLabel="Confirm"
          tone="warning"
          onCancel={() => setPendingInfo(null)}
          onConfirm={confirmUpdate}
        />
      )}
    </div>
  )
}
