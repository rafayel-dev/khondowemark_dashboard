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
import { bookingStatusVariant, bookings } from '@/data/bookings'
import { usePaginatedList } from '@/hooks/usePaginatedList'

const STATUS_OPTIONS = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled', 'Rejected', 'Disputed'] as const

export default function Bookings() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>('All')

  const filtered = statusFilter === 'All' ? bookings : bookings.filter((row) => row.status === statusFilter)

  const { search, setSearch, page, setPage, totalPages, pageData } = usePaginatedList(filtered, (row, query) =>
    row.customer.name.toLowerCase().includes(query.toLowerCase()) || row.provider.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Bookings"
        action={
          <ListToolbar
            search={search}
            onSearchChange={setSearch}
            filterLabel="Filter by Status"
            filterValue={statusFilter}
            filterOptions={STATUS_OPTIONS}
            onFilterChange={(val) => setStatusFilter(val)}
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
          { header: 'Service', width: '110px', render: (row) => row.service },
          { header: 'Date & Time', width: '140px', render: (row) => row.schedule },
          { header: 'Amount', width: '90px', render: (row) => row.amount },
          {
            header: 'Status',
            width: '110px',
            render: (row) => <Badge variant={bookingStatusVariant[row.status]}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            width: '70px',
            render: (row) => (
              <IconButton aria-label="View booking" variant="success" onClick={() => navigate(`/bookings/${row.id}`)}>
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
