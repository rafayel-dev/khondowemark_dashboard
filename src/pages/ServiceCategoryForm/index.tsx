import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { IconUpload } from '@/components/ui/IconUpload'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { useToast } from '@/hooks/useToast'
import { useAppData } from '@/hooks/useAppData'

export default function ServiceCategoryForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const showToast = useToast()
  const { serviceCategories, setServiceCategories } = useAppData()

  const isEdit = Boolean(id)
  const category = isEdit ? serviceCategories.find((row) => row.id === id) : undefined

  const [name, setName] = useState(category?.name ?? '')
  const [iconUrl, setIconUrl] = useState(category?.iconUrl)

  if (isEdit && !category) return <Navigate to="/service-category" replace />

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (isEdit && category) {
      setServiceCategories((current) =>
        current.map((row) => (row.id === category.id ? { ...row, name, iconUrl: iconUrl ?? row.iconUrl } : row)),
      )
      showToast('Category updated successfully')
    } else {
      setServiceCategories((current) => [
        ...current,
        { id: crypto.randomUUID(), name, iconUrl, color: 'text-brand', bg: 'bg-brand-soft' },
      ])
      showToast('Category added successfully')
    }

    navigate('/service-category')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Service Category" />

      <div className="flex max-w-[600px] flex-col gap-5 rounded-2xl border border-border p-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold text-text">{isEdit ? 'Update Service Category' : 'Add Service Category'}</h1>
          <p className="text-sm text-text-soft">
            {isEdit ? 'Update the category information shown across Nchito.' : 'Create a new service category for providers to offer on Nchito.'}
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[6px]">
            <label className="text-sm font-medium text-text">Category Icon</label>
            <IconUpload preview={iconUrl} onSelect={setIconUrl} />
          </div>

          <Input label="Category Name" placeholder="e.g. Electrical" value={name} onChange={(e) => setName(e.target.value)} required />

          <Button type="submit" className="h-[50px] w-fit px-6">
            {isEdit ? 'Save Changes' : 'Add Category'}
          </Button>
        </form>
      </div>
    </div>
  )
}
