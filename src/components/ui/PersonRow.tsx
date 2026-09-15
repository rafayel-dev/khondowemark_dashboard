import { Eye, Pencil, ShieldCheck, ShieldOff } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { IconButton } from '@/components/ui/IconButton'
import { useToast } from '@/hooks/useToast'

export function PersonRow({
  name,
  email,
  phone,
  since,
  active,
  onEdit,
  onView,
  onToggleActive,
}: {
  name: string
  email: string
  phone: string
  since: string
  active: boolean
  onEdit?: () => void
  onView?: () => void
  onToggleActive?: () => void
}) {
  const showToast = useToast()

  return (
    <div className="flex h-[76px] items-center justify-between border-b-[0.5px] border-border p-4">
      <div className="flex w-[200px] items-center gap-2.5">
        <Avatar name={name} />
        <span className="font-medium text-text-soft">{name}</span>
      </div>
      <p className="w-[190px] truncate pl-2.5 text-sm text-text-soft">{email}</p>
      <p className="w-[150px] pl-2.5 text-sm text-text-soft">{phone}</p>
      <p className="w-[100px] pl-2.5 text-sm text-text-soft">{since}</p>
      <div className="w-[110px] pl-2.5">
        <Badge variant={active ? 'success' : 'error'}>{active ? 'Active' : 'Blocked'}</Badge>
      </div>
      <div className="flex items-center gap-2">
        {onView ? (
          <IconButton aria-label="View" variant="brand" onClick={onView}>
            <Eye size={16} />
          </IconButton>
        ) : (
          <IconButton aria-label="Edit" variant="brand" onClick={onEdit ?? (() => showToast(`Editing ${name}`))}>
            <Pencil size={16} />
          </IconButton>
        )}
        <IconButton
          aria-label={active ? 'Block' : 'Unblock'}
          variant={active ? 'error' : 'success'}
          onClick={onToggleActive ?? (() => showToast(`${name} has been ${active ? 'blocked' : 'unblocked'}`, active ? 'error' : 'success'))}
        >
          {active ? <ShieldOff size={16} /> : <ShieldCheck size={16} />}
        </IconButton>
      </div>
    </div>
  )
}
