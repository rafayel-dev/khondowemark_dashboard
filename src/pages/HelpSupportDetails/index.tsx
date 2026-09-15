import { LifeBuoy } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { PersonRow } from '@/components/ui/PersonRow'
import { ticketStatusVariant } from '@/data/supportTickets'
import { useAppData } from '@/hooks/useAppData'
import { useToast } from '@/hooks/useToast'

export default function HelpSupportDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const showToast = useToast()
  const { supportTickets, setSupportTickets } = useAppData()
  const [confirming, setConfirming] = useState(false)
  const ticket = supportTickets.find((row) => row.id === id)

  if (!ticket) return <Navigate to="/help-support" replace />

  const isResolved = ticket.status === 'Resolved'

  function markAsResolved() {
    setSupportTickets((current) => current.map((row) => (row.id === ticket!.id ? { ...row, status: 'Resolved' } : row)))
    showToast('Ticket marked as resolved')
    setConfirming(false)
    navigate('/help-support')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Help & Support Details" icon={LifeBuoy} />

      <div className="flex flex-col gap-6">
        <DetailCard title="Help & support requested by">
          <PersonRow
            {...ticket.requester}
            onView={() => navigate(ticket.requesterRole === 'Provider' ? `/providers/${ticket.requesterId}` : `/users/${ticket.requesterId}`)}
          />
        </DetailCard>

        <DetailCard title="Help & support Information">
          <div className="flex flex-wrap">
            <InfoField label="Contact Reason" value={ticket.reason} />
            <InfoField label="Status" value={<Badge variant={ticketStatusVariant[ticket.status]}>{ticket.status}</Badge>} />
          </div>
          <InfoField label="Submitted On" value={ticket.submittedOn} />
          <InfoField label="Description" value={ticket.description} />
        </DetailCard>

        {isResolved ? (
          <div className="flex h-[50px] w-fit items-center justify-center rounded-[10px] bg-success px-6 text-sm font-semibold capitalize text-app">
            Resolved
          </div>
        ) : (
          <Button className="h-[50px] w-fit px-6" onClick={() => setConfirming(true)}>
            Mark as Solved
          </Button>
        )}
      </div>

      {confirming && (
        <ConfirmDialog
          title="Mark As Resolved !"
          description="Are you sure you want to mark this Help & Support request as resolved! Once you do, there's no going back!"
          confirmLabel="Confirm"
          tone="warning"
          onCancel={() => setConfirming(false)}
          onConfirm={markAsResolved}
        />
      )}
    </div>
  )
}
