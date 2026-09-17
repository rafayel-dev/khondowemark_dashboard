import { Clock, Eye, Inbox, ShieldAlert, Tag, UserCheck, UserX } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { ThumbnailRow } from '@/components/ui/ThumbnailRow'
import { useToast } from '@/hooks/useToast'
import type { VerificationStatus } from '@/data/providers'
import { useAppData } from '@/hooks/useAppData'

const verificationVariant: Record<VerificationStatus, 'warning' | 'success' | 'error'> = {
  Pending: 'warning',
  Verified: 'success',
  Rejected: 'error',
}

const servicesEmptyMessage: Record<VerificationStatus, string> = {
  Pending: 'This provider’s account is still pending verification. Their services will appear here once the verification process is completed.',
  Rejected: 'This provider’s verification was not approved. Their services cannot be listed until the verification issue is resolved.',
  Verified: 'This provider has not added any services yet.',
}

export default function ProviderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const showToast = useToast()
  const { providers, setProviders } = useAppData()
  const [confirming, setConfirming] = useState(false)

  const provider = providers.find((row) => row.id === id)

  if (!provider) return <Navigate to="/providers" replace />

  const isActive = provider.status === 'Active'

  function confirmToggle() {
    const nextStatus = isActive ? 'Blocked' : 'Active'
    setProviders((current) => current.map((row) => (row.id === provider!.id ? { ...row, status: nextStatus } : row)))
    showToast(`${provider!.name} has been ${isActive ? 'blocked' : 'unblocked'}`, isActive ? 'error' : 'success')
    setConfirming(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Provider Details" />

      <Avatar name={provider.name} src={provider.avatar} size={80} />

      <DetailCard title="Provider Information">
        <div className="flex flex-wrap">
          <InfoField label="Name" value={provider.name} />
          <InfoField label="Email Address" value={provider.email} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Contact Phone" value={provider.phone} />
          <InfoField label="Joined On" value={provider.joinedOn} />
        </div>
        <InfoField label="Status" value={<Badge variant={isActive ? 'success' : 'error'}>{provider.status}</Badge>} />
      </DetailCard>

      <DetailCard title="Verification Details">
        <div className="flex flex-wrap">
          <InfoField label="Identification Type" value={provider.verification.idType} />
          <InfoField label="Uploaded ID" value={<ThumbnailRow />} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Submitted On" value={provider.verification.submittedOn} />
          <InfoField
            label="Status"
            value={<Badge variant={verificationVariant[provider.verification.status]}>{provider.verification.status}</Badge>}
          />
        </div>
      </DetailCard>

      <DetailCard title="Services">
        {provider.services.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={provider.verification.status === 'Rejected' ? ShieldAlert : Inbox}
              message={servicesEmptyMessage[provider.verification.status]}
            />
          </div>
        ) : (
          <div className="flex flex-col">
            {provider.services.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => navigate(`/providers/${provider.id}/services/${service.id}`)}
                className="flex items-center gap-4 border-b-[0.5px] border-border p-4 text-left last:border-b-0 hover:bg-black/[0.02]"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-soft">
                  <Tag size={18} className="text-brand" />
                </div>
                <p className="w-[180px] font-semibold text-text">{service.name}</p>
                <p className="w-[120px] text-sm text-text-soft">{service.price}</p>
                <div className="flex w-[100px] items-center gap-1.5 text-sm text-text-soft">
                  <Clock size={14} />
                  {service.duration}
                </div>
                <span className="ml-auto flex size-8 items-center justify-center rounded-lg bg-success/10 text-success">
                  <Eye size={16} />
                </span>
              </button>
            ))}
          </div>
        )}
      </DetailCard>

      <Button variant={isActive ? 'dangerSolid' : 'successSolid'} className="h-[50px] w-fit px-6" onClick={() => setConfirming(true)}>
        {isActive ? <UserX size={18} /> : <UserCheck size={18} />}
        {isActive ? 'Block this Provider' : 'Unblock this Provider'}
      </Button>

      {confirming && (
        <ConfirmDialog
          title={isActive ? 'Block User!' : 'Unblock User!'}
          description={
            isActive
              ? 'Are you sure you want to block this provider? They will lose access to their account immediately.'
              : 'Are you sure you want to unblock this provider? They will regain access to their account.'
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
