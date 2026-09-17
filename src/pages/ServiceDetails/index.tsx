import { Star, UserCircle } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { useAppData } from '@/hooks/useAppData'

export default function ServiceDetails() {
  const { providerId, serviceId } = useParams<{ providerId: string; serviceId: string }>()
  const navigate = useNavigate()
  const { providers } = useAppData()

  const provider = providers.find((row) => row.id === providerId)
  const service = provider?.services.find((row) => row.id === serviceId)

  if (!provider || !service) return <Navigate to="/providers" replace />

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Service Details" />

      <Avatar name={provider.name} src={provider.avatar} size={80} />

      <DetailCard title="Service Overview">
        <div className="flex flex-wrap">
          <InfoField label="Category" value={service.name} />
          <InfoField label="Price" value={service.price} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Estimated Duration" value={service.duration} />
          <InfoField label="Service Area" value={service.serviceArea} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Completed Jobs" value={service.completedJobs} />
          <InfoField
            label="Rating"
            value={
              <span className="flex items-center gap-1">
                <Star size={14} className="fill-warning text-warning" />
                {service.rating.toFixed(1)}
              </span>
            }
          />
        </div>
      </DetailCard>

      <Button className="h-[50px] w-fit gap-2.5 px-6" onClick={() => navigate(`/providers/${provider.id}`)}>
        <UserCircle size={18} />
        View Provider Profile
      </Button>
    </div>
  )
}
