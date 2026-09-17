import { Clock } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { PersonRow } from '@/components/ui/PersonRow'
import { ThumbnailRow } from '@/components/ui/ThumbnailRow'
import { disputeStatusVariant } from '@/data/disputes'
import { useAppData } from '@/hooks/useAppData'
import { useToast } from '@/hooks/useToast'

export default function DisputeDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const showToast = useToast()
  const { disputes, setDisputes } = useAppData()
  const dispute = disputes.find((row) => row.id === id)

  if (!dispute) return <Navigate to="/disputes" replace />

  const isResolved = dispute.status === 'Resolved'
  const canRequestResponse = dispute.providerResponseState === 'none'

  function requestProviderResponse() {
    setDisputes((current) => current.map((row) => (row.id === dispute!.id ? { ...row, providerResponseState: 'waiting' } : row)))
    showToast(`Response requested from ${dispute!.provider.name}`)

    setTimeout(() => {
      setDisputes((current) =>
        current.map((row) =>
          row.id === dispute!.id
            ? {
                ...row,
                providerResponseState: 'responded',
                providerResponse: {
                  respondedOn: 'Just now',
                  evidence: ['response-1.jpg'],
                  message: 'I have reviewed the issue raised by the customer and attached supporting evidence for the admin team.',
                },
              }
            : row,
        ),
      )
      showToast(`${dispute!.provider.name} has responded to the dispute`)
    }, 4000)
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Disputes Details" />
      <div className="flex flex-col gap-6">
        <DetailCard title="User Information">
          <PersonRow {...dispute.customer} onView={() => navigate(`/users/${dispute.userId}`)} />
        </DetailCard>

        <DetailCard title="Provider Information">
          <PersonRow {...dispute.provider} onView={() => navigate(`/providers/${dispute.providerId}`)} />
        </DetailCard>

        <DetailCard title="Service Overview">
          <div className="flex flex-wrap">
            <InfoField label="Category" value={dispute.category} />
            <InfoField label="Status" value={<Badge variant="success">{dispute.serviceStatus}</Badge>} />
            <InfoField label="Date & Time" value={dispute.date} />
            <InfoField label="Service Area" value={dispute.serviceArea} />
            <InfoField label="Amount" value={dispute.amount} />
            <InfoField label="Payment On" value={dispute.paymentMethod} />
          </div>
          <InfoField label="Details" value={dispute.details} />
        </DetailCard>

        <DetailCard title="User Dispute Request Details">
          <div className="flex flex-wrap">
            <InfoField label="Status" value={<Badge variant={disputeStatusVariant[dispute.status]}>{dispute.status}</Badge>} />
            <InfoField label="Requested On" value={dispute.date} />
            <InfoField label="Issue Type" value={dispute.issueType} />
          </div>
          <InfoField label="Customer Message" value={dispute.customerMessage} />
          <InfoField label="Evidence" value={<ThumbnailRow count={dispute.evidence.length} />} />
        </DetailCard>

        {dispute.providerResponseState !== 'none' && (
          <DetailCard title="Provider Response">
            {dispute.providerResponseState === 'waiting' || !dispute.providerResponse ? (
              <div className="p-4">
                <EmptyState icon={Clock} message="Waiting for the provider to respond to this dispute." />
              </div>
            ) : (
              <>
                <InfoField label="Responded On" value={dispute.providerResponse.respondedOn} />
                <InfoField label="Evidence" value={<ThumbnailRow count={dispute.providerResponse.evidence.length} />} />
                <InfoField label="Provider Message" value={dispute.providerResponse.message} />
              </>
            )}
          </DetailCard>
        )}

        {isResolved && dispute.resolution && (
          <DetailCard title="Dispute Action Details">
            <div className="flex flex-wrap">
              <InfoField label="Actioned On" value={dispute.resolution.actionedOn} />
              <InfoField label="Resolution Type" value={dispute.resolution.type} />
              {dispute.resolution.type === 'Full Refund' && <InfoField label="Refund To" value={dispute.resolution.refundTo} />}
              {dispute.resolution.type === 'Partial Refund' && (
                <>
                  <InfoField label="User Refund Amount" value={dispute.resolution.userRefundAmount} />
                  <InfoField label="Provider Payout Amount" value={dispute.resolution.providerPayoutAmount} />
                </>
              )}
            </div>
            <InfoField label="User Resolution Note" value={dispute.resolution.userNote} />
            <InfoField label="Provider Resolution Note" value={dispute.resolution.providerNote} />
          </DetailCard>
        )}

        {!isResolved && (
          <div className="flex gap-2.5">
            {canRequestResponse && (
              <Button variant="outline" className="h-[50px] px-6" onClick={requestProviderResponse}>
                Request Provider Response
              </Button>
            )}
            <Button className="h-[50px] px-6" onClick={() => navigate(`/disputes/${dispute.id}/resolve`)}>
              Resolve Dispute
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
