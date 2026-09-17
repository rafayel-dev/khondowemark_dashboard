import { Eye, ShieldCheck, ShieldOff } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DataTable } from '@/components/ui/DataTable'
import { IconButton } from '@/components/ui/IconButton'
import { ListToolbar } from '@/components/ui/ListToolbar'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import type { User } from '@/data/users'
import { usePaginatedList } from '@/hooks/usePaginatedList'
import { useToast } from '@/hooks/useToast'

const STATUS_OPTIONS = ['All', 'Active', 'Blocked'] as const

export function PeopleListPage<T extends User>({
  title,
  basePath,
  data,
  setData,
}: {
  title: string
  basePath: string
  data: T[]
  setData: React.Dispatch<React.SetStateAction<T[]>>
}) {
  const navigate = useNavigate()
  const showToast = useToast()

  const [statusFilter, setStatusFilter] = useState<(typeof STATUS_OPTIONS)[number]>('All')
  const [confirmTarget, setConfirmTarget] = useState<T | null>(null)

  const filtered = statusFilter === 'All' ? data : data.filter((row) => row.status === statusFilter)

  const { search, setSearch, page, setPage, totalPages, pageData } = usePaginatedList(filtered, (row, query) =>
    row.name.toLowerCase().includes(query.toLowerCase()),
  )

  function confirmToggle() {
    if (!confirmTarget) return
    const nextStatus = confirmTarget.status === 'Active' ? 'Blocked' : 'Active'
    setData((current) => current.map((row) => (row.id === confirmTarget.id ? { ...row, status: nextStatus } : row)))
    showToast(`${confirmTarget.name} has been ${nextStatus === 'Blocked' ? 'blocked' : 'unblocked'}`, nextStatus === 'Blocked' ? 'error' : 'success')
    setConfirmTarget(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title={title}
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
            width: '220px',
            render: (row) => (
              <div className="flex items-center gap-2.5">
                <Avatar name={row.name} src={row.avatar} />
                <span className="font-medium text-text-soft">{row.name}</span>
              </div>
            ),
          },
          { header: 'Email', width: '190px', render: (row) => row.email },
          { header: 'Phone', width: '160px', render: (row) => row.phone },
          { header: 'Joined On', width: '120px', render: (row) => row.joinedOn },
          {
            header: 'Status',
            width: '110px',
            render: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'error'}>{row.status}</Badge>,
          },
          {
            header: 'Actions',
            width: '90px',
            render: (row) => (
              <div className="flex items-center gap-2">
                <IconButton aria-label="View details" variant="brand" onClick={() => navigate(`${basePath}/${row.id}`)}>
                  <Eye size={16} />
                </IconButton>
                <IconButton
                  aria-label={row.status === 'Active' ? 'Block' : 'Unblock'}
                  variant={row.status === 'Active' ? 'error' : 'success'}
                  onClick={() => setConfirmTarget(row)}
                >
                  {row.status === 'Active' ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
                </IconButton>
              </div>
            ),
          },
        ]}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {confirmTarget && (
        <ConfirmDialog
          title={confirmTarget.status === 'Active' ? 'Block User!' : 'Unblock User!'}
          description={
            confirmTarget.status === 'Active'
              ? 'Are you sure you want to block this user? They will lose access to their account immediately.'
              : 'Are you sure you want to unblock this user? They will regain access to their account.'
          }
          confirmLabel={confirmTarget.status === 'Active' ? 'Block' : 'Unblock'}
          tone={confirmTarget.status === 'Active' ? 'danger' : 'warning'}
          onCancel={() => setConfirmTarget(null)}
          onConfirm={confirmToggle}
        />
      )}
    </div>
  )
}
