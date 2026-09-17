import { Tag } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { PageHeader } from '@/components/ui/PageHeader'
import { PersonRow } from '@/components/ui/PersonRow'
import { bookingStatusVariant, bookings } from '@/data/bookings'
import { serviceCategories } from '@/data/serviceCategories'

export default function BookingDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const booking = bookings.find((row) => row.id === id)

  if (!booking) return <Navigate to="/bookings" replace />

  const category = serviceCategories.find((row) => row.name === booking.service)
  const CategoryIcon = category?.icon ?? Tag

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Booking Details" />

      <DetailCard title="Provider Information">
        <PersonRow {...booking.provider} onView={() => navigate(`/providers/${booking.providerId}`)} />
      </DetailCard>

      <DetailCard title="User Information">
        <PersonRow {...booking.customer} onView={() => navigate(`/users/${booking.customerId}`)} />
      </DetailCard>

      <DetailCard title="Service Overview">
        <div className="flex flex-wrap">
          <div className="flex min-w-[240px] flex-1 basis-[45%] items-center gap-3 p-4">
            <div className={`flex size-10 items-center justify-center rounded-[11px] ${category?.bg ?? 'bg-brand-soft'}`}>
              <CategoryIcon size={20} className={category?.color ?? 'text-brand'} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold italic text-text-soft">Category</p>
              <p className="text-base font-semibold text-text">{booking.service}</p>
            </div>
          </div>
          <InfoField label="Status" value={<Badge variant={bookingStatusVariant[booking.status]}>{booking.status}</Badge>} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Date & Time" value={booking.schedule} />
          <InfoField label="Service Area" value={booking.serviceArea} />
        </div>
        <InfoField label="Details" value={booking.details} />
      </DetailCard>

      <DetailCard title="Payment Info Overview">
        <div className="flex flex-wrap">
          <InfoField label="Total Paid by Customer" value={booking.payment.totalPaid} />
          <InfoField label="Payment On" value={booking.payment.paymentOn} />
        </div>
        <div className="flex flex-wrap">
          <InfoField label="Nchito Platform Fee" value={booking.payment.platformFee} />
          <InfoField label="Provider Receives" value={booking.payment.providerReceives} />
        </div>
      </DetailCard>
    </div>
  )
}
