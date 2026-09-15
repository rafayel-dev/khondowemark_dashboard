import { AlertTriangle, Eye } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { IconButton } from '@/components/ui/IconButton'
import { ListToolbar } from '@/components/ui/ListToolbar'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import { disputeStatusVariant } from '@/data/disputes'
import { useAppData } from '@/hooks/useAppData'
import { usePaginatedList } from '@/hooks/usePaginatedList'

const STATUS_OPTIONS = ['All', 'In Review', 'Response Required', 'Resolved'] as const

export default function Disputes() {
  const navigate = useNavigate()
  const { disputes } = useAppData()
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>('All')

  const filtered = statusFilter === 'All' ? disputes : disputes.filter((row) => row.status === statusFilter)

  const { search, setSearch, page, setPage, totalPages, pageData } = usePaginatedList(filtered, (row, query) =>
    row.customer.name.toLowerCase().includes(query.toLowerCase()) || row.provider.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Disputes"
        icon={AlertTriangle}
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
            header: 'Customer',
            width: '180px',
            render: (row) => (
              <div className="flex items-center gap-2.5">
                <Avatar name={row.customer.name} />
                <span className="font-medium text-text-soft">{row.customer.name}</span>
              </div>
            ),
          },
          {
            header: 'Provider',
            width: '180px',
            render: (row) => (
              <div className="flex items-center gap-2.5">
                <Avatar name={row.provider.name} />
                <span className="font-medium text-text-soft">{row.provider.name}</span>
              </div>
            ),
          },
          { header: 'Service', width: '110px', render: (row) => row.category },
          { header: 'Date', width: '140px', render: (row) => row.date },
          {
            header: 'Status',
            width: '150px',
            render: (row) => <Badge variant={disputeStatusVariant[row.status]}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            width: '70px',
            render: (row) => (
              <IconButton aria-label="View dispute" variant="success" onClick={() => navigate(`/disputes/${row.id}`)}>
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
