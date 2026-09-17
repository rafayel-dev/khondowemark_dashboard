import {
  AlertTriangle,
  Briefcase,
  Eye,
  LayoutDashboard,
  ShieldCheck,
  ShieldOff,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DataTable } from '@/components/ui/DataTable'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { IconButton } from '@/components/ui/IconButton'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { activityFeed, dashboardStats } from '@/data/dashboard'
import type { User } from '@/data/users'
import { useAppData } from '@/hooks/useAppData'
import { useToast } from '@/hooks/useToast'

const icons: Record<string, LucideIcon> = {
  users: Users,
  briefcase: Briefcase,
  alert: AlertTriangle,
  shield: ShieldCheck,
  'user-plus': UserPlus,
}

const TIMEFRAME_OPTIONS = ['Today', 'This Week', 'This Month'] as const

export default function Dashboard() {
  const navigate = useNavigate()
  const showToast = useToast()
  const { users, setUsers } = useAppData()
  const [confirmTarget, setConfirmTarget] = useState<User | null>(null)
  const [timeframe, setTimeframe] = useState<(typeof TIMEFRAME_OPTIONS)[number]>('Today')
  const recentUsers = users.slice(0, 2)

  function confirmToggle() {
    if (!confirmTarget) return
    const nextStatus = confirmTarget.status === 'Active' ? 'Blocked' : 'Active'
    setUsers((current) => current.map((row) => (row.id === confirmTarget.id ? { ...row, status: nextStatus } : row)))
    showToast(`${confirmTarget.name} has been ${nextStatus === 'Blocked' ? 'blocked' : 'unblocked'}`, nextStatus === 'Blocked' ? 'error' : 'success')
    setConfirmTarget(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Dashboard" icon={LayoutDashboard} />

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} icon={icons[stat.icon]} />
        ))}
      </div>

      <div className="flex flex-col gap-2.5 rounded-xl border border-border">
        <div className="flex h-[52px] items-center gap-10 border-b border-border px-4">
          <h2 className="flex-1 text-lg font-bold text-text">Showing activity for {timeframe.toLowerCase()}</h2>
          <FilterDropdown
            label="Select timeframe"
            value={timeframe}
            options={TIMEFRAME_OPTIONS}
            onChange={(val) => setTimeframe(val)}
          />
        </div>

        <div className="flex flex-col pb-2.5">
          {activityFeed.map((item) => {
            const Icon = icons[item.icon]
            const TrendIcon = item.trend === 'up' ? TrendingUp : TrendingDown
            return (
              <div key={item.label} className="flex items-center gap-2.5 rounded-[10px] p-4">
                <div className="flex size-11 items-center justify-center rounded-[11px] bg-brand">
                  <Icon size={24} className="text-app" />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-[15px] font-bold capitalize text-text-soft">{item.label}</p>
                  <p className="text-base font-bold text-brand">{item.value}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className={item.trend === 'up' ? 'flex items-center gap-1 text-success' : 'flex items-center gap-1 text-error'}>
                    <TrendIcon size={14} />
                    <span className="text-xs font-semibold">{item.change}</span>
                  </div>
                  <p className="text-xs font-semibold capitalize text-text-soft">
                    {item.trend === 'up' ? 'Higher than yesterday' : 'Lower than yesterday'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex h-8 items-center justify-between px-2.5">
          <h2 className="text-lg font-bold capitalize text-text">Recently Joined Users</h2>
          <Link to="/users" className="text-sm font-bold text-brand">
            View All
          </Link>
        </div>

        <DataTable
          keyField={(row) => row.id}
          data={recentUsers}
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
                  <IconButton aria-label="View user" variant="brand" onClick={() => navigate(`/users/${row.id}`)}>
                    <Eye size={16} />
                  </IconButton>
                  <IconButton
                    aria-label={row.status === 'Active' ? 'Block user' : 'Unblock user'}
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
      </div>

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
