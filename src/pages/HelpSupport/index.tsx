import { Eye } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { IconButton } from '@/components/ui/IconButton'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import { ticketStatusVariant } from '@/data/supportTickets'
import { useAppData } from '@/hooks/useAppData'
import { usePaginatedList } from '@/hooks/usePaginatedList'

const STATUS_OPTIONS = ['All', 'To Do', 'In Progress', 'Resolved'] as const

export default function HelpSupport() {
  const navigate = useNavigate()
  const { supportTickets } = useAppData()
  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>('All')

  const filtered = statusFilter === 'All' ? supportTickets : supportTickets.filter((row) => row.status === statusFilter)
  const { page, setPage, totalPages, pageData } = usePaginatedList(filtered, () => true)

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Help & Support"
        action={<FilterDropdown label="Filter by Status" value={statusFilter} options={STATUS_OPTIONS} onChange={setStatusFilter} />}
      />

      <DataTable
        keyField={(row) => row.id}
        data={pageData}
        columns={[
          {
            header: 'Users Info',
            width: '200px',
            render: (row) => (
              <div className="flex items-center gap-2.5">
                <Avatar name={row.requester.name} />
                <div className="flex flex-col">
                  <span className="font-medium text-text-soft">{row.requester.name}</span>
                  <span className="text-xs text-text-soft">{row.requesterRole}</span>
                </div>
              </div>
            ),
          },
          { header: 'Contact Reason', width: '200px', render: (row) => row.reason },
          { header: 'Submitted On', width: '150px', render: (row) => row.submittedOn },
          {
            header: 'Status',
            width: '100px',
            render: (row) => <Badge variant={ticketStatusVariant[row.status]}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            width: '70px',
            render: (row) => (
              <IconButton aria-label="View ticket" variant="success" onClick={() => navigate(`/help-support/${row.id}`)}>
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
