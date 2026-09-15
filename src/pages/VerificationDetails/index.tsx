import { ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { PersonRow } from '@/components/ui/PersonRow'
import { ThumbnailRow } from '@/components/ui/ThumbnailRow'
import { useAppData } from '@/hooks/useAppData'
import { useToast } from '@/hooks/useToast'
import { verificationStatusVariant } from '@/data/verification'

type PendingAction = 'Verified' | 'Rejected'

const actionCopy: Record<PendingAction, { title: string; description: string; tone: 'warning' | 'danger'; successMessage: string }> = {
  Verified: {
    title: 'Verify Provider!',
    description: 'Are you sure you want to verify this provider! They will be approved to offer services and receive bookings on Nchito.',
    tone: 'warning',
    successMessage: "'s verification approved",
  },
  Rejected: {
    title: 'Reject Verification!',
    description: "Are you sure you want to reject this provider's verification! They will not be able to offer services until their verification is approved.",
    tone: 'danger',
    successMessage: "'s verification rejected",
  },
}

const revokeCopy = {
  title: 'Revoke Verification!',
  description: "Are you sure you want to revoke this provider's verification! They will no longer be able to offer services or receive new bookings until they are verified again.",
}

export default function VerificationDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const showToast = useToast()
  const { verificationRequests, setVerificationRequests } = useAppData()
  const [pendingAction, setPendingAction] = useState<PendingAction | null>(null)

  const request = verificationRequests.find((row) => row.id === id)

  if (!request) return <Navigate to="/verification" replace />

  const isRevoke = request.status === 'Verified' && pendingAction === 'Rejected'

  function applyStatus(status: PendingAction) {
    setVerificationRequests((current) => current.map((row) => (row.id === request!.id ? { ...row, status } : row)))
    showToast(`${request!.name}${actionCopy[status].successMessage}`, status === 'Verified' ? 'success' : 'error')
    setPendingAction(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Verification / KYC Details" icon={ShieldCheck} />

      <DetailCard title="Provider Information">
        <PersonRow {...request.provider} onView={() => navigate(`/providers/${request.providerId}`)} />
      </DetailCard>

      <DetailCard title="Verification Details">
        <div className="flex flex-wrap">
          <InfoField label="Identification Type" value={request.type} />
          <InfoField label="Uploaded ID" value={<ThumbnailRow />} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Submitted On" value={request.requestedOn} />
          <InfoField label="Status" value={<Badge variant={verificationStatusVariant[request.status]}>{request.status}</Badge>} />
        </div>
      </DetailCard>

      <div className="flex gap-2.5">
        {request.status !== 'Verified' && (
          <Button variant="successSolid" className="h-[50px] px-6" onClick={() => setPendingAction('Verified')}>
            Mark As Verified
          </Button>
        )}
        {request.status !== 'Rejected' && (
          <Button variant="dangerSolid" className="h-[50px] px-6" onClick={() => setPendingAction('Rejected')}>
            {request.status === 'Verified' ? 'Revoke Verification' : 'Reject Verification'}
          </Button>
        )}
      </div>

      {pendingAction && (
        <ConfirmDialog
          title={isRevoke ? revokeCopy.title : actionCopy[pendingAction].title}
          description={isRevoke ? revokeCopy.description : actionCopy[pendingAction].description}
          confirmLabel="Confirm"
          tone={actionCopy[pendingAction].tone}
          onCancel={() => setPendingAction(null)}
          onConfirm={() => applyStatus(pendingAction)}
        />
      )}
    </div>
  )
}
