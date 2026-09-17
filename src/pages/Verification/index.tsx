import { Eye } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { IconButton } from '@/components/ui/IconButton'
import { ListToolbar } from '@/components/ui/ListToolbar'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import { verificationStatusVariant } from '@/data/verification'
import { useAppData } from '@/hooks/useAppData'
import { usePaginatedList } from '@/hooks/usePaginatedList'

const STATUS_OPTIONS = ['All', 'Pending', 'Verified', 'Rejected'] as const

export default function Verification() {
  const navigate = useNavigate()
  const { verificationRequests } = useAppData()
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>('All')

  const filtered = statusFilter === 'All' ? verificationRequests : verificationRequests.filter((row) => row.status === statusFilter)

  const { search, setSearch, page, setPage, totalPages, pageData } = usePaginatedList(filtered, (row, query) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Verification / KYC"
        action={
          <ListToolbar
            search={search}
            onSearchChange={setSearch}
            filterLabel="Filter by Status"
            filterValue={statusFilter}
            filterOptions={STATUS_OPTIONS}
            onFilterChange={setStatusFilter}
          />
        }
      />

      <DataTable
        keyField={(row) => row.id}
        data={pageData}
        columns={[
          {
            header: 'Job Seeker Name',
            width: '200px',
            render: (row) => (
              <div className="flex items-center gap-2.5">
                <Avatar name={row.name} />
                <span className="font-medium text-text-soft">{row.name}</span>
              </div>
            ),
          },
          { header: 'Verification Type', width: '220px', render: (row) => row.type },
          { header: 'Requested On', width: '120px', render: (row) => row.requestedOn },
          {
            header: 'Status',
            width: '100px',
            render: (row) => <Badge variant={verificationStatusVariant[row.status]}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            width: '70px',
            render: (row) => (
              <IconButton aria-label="Review request" variant="success" onClick={() => navigate(`/verification/${row.id}`)}>
                <Eye size={16} />
              </IconButton>
            ),
          },
        ]}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
