import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { DetailCard } from '@/components/ui/DetailCard'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import type { ResolutionType } from '@/data/disputes'
import { useAppData } from '@/hooks/useAppData'
import { useToast } from '@/hooks/useToast'

const RESOLUTION_OPTIONS: ResolutionType[] = ['Full Refund', 'Partial Refund', 'No Refund']
const REFUND_TO_OPTIONS = ['User', 'Provider'] as const

export default function DisputeResolve() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const showToast = useToast()
  const { disputes, setDisputes } = useAppData()
  const dispute = disputes.find((row) => row.id === id)

  const [resolutionType, setResolutionType] = useState<ResolutionType>('Full Refund')
  const [refundTo, setRefundTo] = useState<'User' | 'Provider'>('User')
  const [userRefundAmount, setUserRefundAmount] = useState('')
  const [providerPayoutAmount, setProviderPayoutAmount] = useState('')
  const [userNote, setUserNote] = useState('')
  const [providerNote, setProviderNote] = useState('')

  if (!dispute) return <Navigate to="/disputes" replace />

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setDisputes((current) =>
      current.map((row) =>
        row.id === dispute!.id
          ? {
              ...row,
              status: 'Resolved',
              resolution: {
                actionedOn: 'Just now',
                type: resolutionType,
                refundTo: resolutionType === 'Full Refund' ? refundTo : undefined,
                userRefundAmount: resolutionType === 'Partial Refund' ? userRefundAmount : undefined,
                providerPayoutAmount: resolutionType === 'Partial Refund' ? providerPayoutAmount : undefined,
                userNote,
                providerNote,
              },
            }
          : row,
      ),
    )
    showToast('Dispute marked as resolved', 'success')
    navigate(`/disputes/${dispute!.id}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Resolve Dispute" subtitle="Submit your response to close this case" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <DetailCard title="Resolution">
          <div className="flex flex-col gap-4 p-4">
            <Select label="Select Resolution" options={RESOLUTION_OPTIONS} value={resolutionType} onChange={setResolutionType} />

            {resolutionType === 'Full Refund' && <Select label="Refund To" options={REFUND_TO_OPTIONS} value={refundTo} onChange={setRefundTo} />}

            {resolutionType === 'Partial Refund' && (
              <div className="flex flex-wrap gap-4">
                <Input
                  label="User Refund Amount"
                  placeholder="e.g. ZMW 100.00"
                  value={userRefundAmount}
                  onChange={(e) => setUserRefundAmount(e.target.value)}
                  required
                />
                <Input
                  label="Provider Payout Amount"
                  placeholder="e.g. ZMW 120.00"
                  value={providerPayoutAmount}
                  onChange={(e) => setProviderPayoutAmount(e.target.value)}
                  required
                />
              </div>
            )}

            <Textarea
              label="User Resolution Note"
              rows={3}
              placeholder="Note visible to the customer"
              value={userNote}
              onChange={(e) => setUserNote(e.target.value)}
              required
            />
            <Textarea
              label="Provider Resolution Note"
              rows={3}
              placeholder="Note visible to the provider"
              value={providerNote}
              onChange={(e) => setProviderNote(e.target.value)}
              required
            />
          </div>
        </DetailCard>

        <Button type="submit" className="h-[50px] w-fit px-6">
          Resolve Dispute
        </Button>
      </form>
    </div>
  )
}
