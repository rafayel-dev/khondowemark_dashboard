export function Avatar({ src, name, size = 40 }: { src?: string; name: string; size?: number }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-brand-soft font-semibold text-brand ${size >= 64 ? 'text-2xl' : 'text-sm'}`}
      style={{ width: size, height: size }}
    >
      {initials}
    </div>
  )
}
