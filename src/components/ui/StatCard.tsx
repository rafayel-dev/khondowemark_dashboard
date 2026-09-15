import type { LucideIcon } from 'lucide-react'

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | number
  icon: LucideIcon
}) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-8 rounded-3xl bg-black/[0.04] p-6">
      <p className="text-[22px] font-bold capitalize text-text">{label}</p>
      <div className="flex items-center justify-between">
        <p className="font-['DM_Sans:ExtraBold_Italic'] text-[32px] font-extrabold italic text-brand">{value}</p>
        <div className="flex size-10 items-center justify-center rounded-[10px] bg-brand-soft">
          <Icon size={24} className="text-brand" strokeWidth={2} />
        </div>
      </div>
    </div>
  )
}
