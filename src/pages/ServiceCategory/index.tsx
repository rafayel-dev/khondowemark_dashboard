import { Pencil, Plus, Tags, Trash2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { DataTable } from '@/components/ui/DataTable'
import { IconButton } from '@/components/ui/IconButton'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import { useAppData } from '@/hooks/useAppData'
import { usePaginatedList } from '@/hooks/usePaginatedList'
import { useToast } from '@/hooks/useToast'

export default function ServiceCategory() {
  const showToast = useToast()
  const navigate = useNavigate()
  const { serviceCategories, setServiceCategories } = useAppData()

  const { page, setPage, totalPages, pageData } = usePaginatedList(serviceCategories, () => true, 9)

  function deleteCategory(id: string, name: string) {
    setServiceCategories((current) => current.filter((item) => item.id !== id))
    showToast(`"${name}" category deleted`, 'error')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Service Category"
        icon={Tags}
        action={
          <Link
            to="/service-category/new"
            className="flex h-11 items-center gap-1.5 rounded-xl bg-brand px-6 text-sm font-semibold text-app"
          >
            <Plus size={16} />
            Add New
          </Link>
        }
      />

      <DataTable
        keyField={(row) => row.id}
        data={pageData}
        columns={[
          { header: 'SL', width: '60px', render: (_row, index) => String(index + 1).padStart(2, '0') },
          {
            header: 'Icon',
            width: '80px',
            render: (row) => (
              <div className={`flex size-10 items-center justify-center rounded-[11px] ${row.bg}`}>
                {row.iconUrl ? (
                  <img src={row.iconUrl} alt="" className="size-5 object-contain" />
                ) : row.icon ? (
                  <row.icon size={20} className={row.color} />
                ) : null}
              </div>
            ),
          },
          { header: 'Service Category', width: '200px', render: (row) => row.name },
          {
            header: 'Actions',
            width: '90px',
            render: (row) => (
              <div className="flex items-center gap-2.5">
                <IconButton
                  aria-label="Edit category"
                  variant="brand"
                  className="bg-blue-500/15 text-blue-500"
                  onClick={() => navigate(`/service-category/${row.id}/edit`)}
                >
                  <Pencil size={16} />
                </IconButton>
                <IconButton aria-label="Delete category" variant="error" onClick={() => deleteCategory(row.id, row.name)}>
                  <Trash2 size={16} />
                </IconButton>
              </div>
            ),
          },
        ]}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
