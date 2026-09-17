import { UserCheck, UserX } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAppData } from '@/hooks/useAppData'
import { useToast } from '@/hooks/useToast'

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const showToast = useToast()
  const { users, setUsers } = useAppData()
  const [confirming, setConfirming] = useState(false)

  const person = users.find((row) => row.id === id)

  if (!person) return <Navigate to="/users" replace />

  const isActive = person.status === 'Active'

  function confirmToggle() {
    const nextStatus = isActive ? 'Blocked' : 'Active'
    setUsers((current) => current.map((row) => (row.id === person!.id ? { ...row, status: nextStatus } : row)))
    showToast(`${person!.name} has been ${isActive ? 'blocked' : 'unblocked'}`, isActive ? 'error' : 'success')
    setConfirming(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="User Details" />

      <Avatar name={person.name} src={person.avatar} size={80} />

      <DetailCard title="User Information">
        <div className="flex flex-wrap">
          <InfoField label="Name" value={person.name} />
          <InfoField label="Email Address" value={person.email} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Contact Phone" value={person.phone} />
          <InfoField label="Joined On" value={person.joinedOn} />
        </div>
        <InfoField label="Status" value={<Badge variant={isActive ? 'success' : 'error'}>{person.status}</Badge>} />
      </DetailCard>

      <Button variant={isActive ? 'dangerSolid' : 'primary'} className="h-[50px] w-fit px-6" onClick={() => setConfirming(true)}>
        {isActive ? <UserX size={18} /> : <UserCheck size={18} />}
        {isActive ? 'Block This User' : 'Unblock This User'}
      </Button>

      {confirming && (
        <ConfirmDialog
          title={isActive ? 'Block User!' : 'Unblock User!'}
          description={
            isActive
              ? 'Are you sure you want to block this user? They will lose access to their account immediately.'
              : 'Are you sure you want to unblock this user? They will regain access to their account.'
          }
          confirmLabel={isActive ? 'Block' : 'Unblock'}
          tone={isActive ? 'danger' : 'warning'}
          onCancel={() => setConfirming(false)}
          onConfirm={confirmToggle}
        />
      )}
    </div>
  )
}
