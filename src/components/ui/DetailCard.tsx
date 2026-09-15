export function DetailCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="w-full rounded-xl border border-border bg-black/[0.01]">
      <div className="flex h-[52px] items-center border-b border-border px-4">
        <h3 className="text-lg font-bold italic text-text-soft">{title}</h3>
      </div>
      <div className="flex flex-col">{children}</div>
    </div>
  )
}

export function InfoField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex min-w-[240px] flex-1 basis-[45%] flex-col gap-1 p-4">
      <p className="text-sm font-semibold italic text-text-soft">{label}</p>
      <div className="mt-1 text-base font-semibold text-text">{value}</div>
    </div>
  )
}
