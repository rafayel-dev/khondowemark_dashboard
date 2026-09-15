import { Pencil, Percent, TrendingUp, Wallet } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DataTable } from '@/components/ui/DataTable'
import { FilterDropdown } from '@/components/ui/FilterDropdown'
import { IconButton } from '@/components/ui/IconButton'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { PageHeader } from '@/components/ui/PageHeader'
import { Pagination } from '@/components/ui/Pagination'
import { earnings, earningsStatusVariant, earningsSummary, PERIOD_OPTIONS, platformFee as initialPlatformFee } from '@/data/earnings'
import { useToast } from '@/hooks/useToast'
import { usePaginatedList } from '@/hooks/usePaginatedList'

export default function Earnings() {
  const showToast = useToast()
  const { page, setPage, totalPages, pageData } = usePaginatedList(earnings, () => true, 8)

  const [period, setPeriod] = useState<(typeof PERIOD_OPTIONS)[number]>('Today')
  const [platformFee, setPlatformFee] = useState(initialPlatformFee)
  const [editingFee, setEditingFee] = useState(false)
  const [pendingFee, setPendingFee] = useState<number | null>(null)

  function confirmFeeUpdate() {
    if (pendingFee === null) return
    setPlatformFee({ percentage: pendingFee, lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) })
    showToast('Platform fee updated successfully')
    setPendingFee(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Earnings" icon={Wallet} />

      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <div className="flex flex-col gap-2.5 rounded-xl border border-border">
          <div className="flex h-[52px] items-center border-b border-border px-4">
            <h2 className="text-base font-bold italic text-text">Platform Fees</h2>
          </div>
          <div className="flex items-center gap-2.5 p-4">
            <div className="flex size-13 items-center justify-center rounded-lg bg-brand-soft">
              <Percent size={20} className="text-brand" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-lg font-bold text-text">{platformFee.percentage}%</p>
              <p className="text-xs font-medium text-text-soft">Last updated: {platformFee.lastUpdated}</p>
            </div>
            <IconButton aria-label="Edit platform fee" variant="brand" onClick={() => setEditingFee(true)}>
              <Pencil size={16} />
            </IconButton>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-black/[0.01]">
          <div className="flex h-[52px] items-center gap-10 border-b border-border px-4">
            <h2 className="flex-1 text-base font-bold italic text-text">Earnings Matrix</h2>
            <FilterDropdown label={period} value={period} options={PERIOD_OPTIONS} onChange={setPeriod} />
          </div>

          <div className="flex items-center gap-2.5 p-4">
            <div className="flex size-13 items-center justify-center rounded-lg bg-brand-soft">
              <Wallet size={20} className="text-brand" />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <p className="text-[15px] font-semibold italic text-text-soft">Showing Earnings for {period}</p>
              <p className="text-base font-extrabold italic text-brand">{earningsSummary.total}</p>
            </div>
            <div className="flex items-center gap-1 text-success">
              <TrendingUp size={14} />
              <span className="text-xs font-semibold">{earningsSummary.change}</span>
            </div>
            <p className="text-xs font-medium capitalize text-text-soft">Higher than yesterday</p>
          </div>
        </div>
      </div>

      <DataTable
        keyField={(row) => row.id}
        data={pageData}
        columns={[
          { header: 'SL', width: '50px', render: (row) => row.id },
          { header: 'Date & Time', width: '150px', render: (row) => row.dateTime },
          { header: 'Paid Out', width: '150px', render: (row) => row.method },
          {
            header: 'Status',
            width: '120px',
            render: (row) => <Badge variant={earningsStatusVariant[row.status]}>{row.status}</Badge>,
          },
          { header: 'Amount', width: '100px', render: (row) => row.amount },
        ]}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {editingFee && (
        <Modal title="Update Platform Fee" onClose={() => setEditingFee(false)}>
          <p className="-mt-2 text-sm text-text-soft">Adjust the platform fee percentage for eligible bookings.</p>
          <form
            className="mt-4 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              const value = Number(new FormData(e.currentTarget).get('fee'))
              setEditingFee(false)
              setPendingFee(value)
            }}
          >
            <Input
              name="fee"
              type="number"
              min={0}
              max={100}
              step="0.1"
              label="Platform Fee (%)"
              placeholder="Enter a percentage between 0% and 100%."
              defaultValue={platformFee.percentage}
              required
            />
            <div className="flex gap-2.5">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setEditingFee(false)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {pendingFee !== null && (
        <ConfirmDialog
          title="Update Platform Fee!"
          description={`Are you sure you want to update the platform fee to ${pendingFee}%! This change will apply to eligible bookings going forward.`}
          confirmLabel="Confirm"
          confirmVariant="primary"
          onCancel={() => setPendingFee(null)}
          onConfirm={confirmFeeUpdate}
        />
      )}
    </div>
  )
}
