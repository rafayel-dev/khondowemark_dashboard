import { AlertCircle, Camera, KeyRound, UserCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { DetailCard, InfoField } from '@/components/ui/DetailCard'
import { Input } from '@/components/ui/Input'
import { PageHeader } from '@/components/ui/PageHeader'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { useToast } from '@/hooks/useToast'
import { currentUser } from '@/data/current-user'

const initialProfile = { name: currentUser.name, email: 'robert@junior.com', phone: '+1 919-555-0284', avatar: undefined as string | undefined }

type Mode = 'view' | 'profile' | 'password'

export default function ManageProfile() {
  const showToast = useToast()
  const [profile, setProfile] = useState(initialProfile)
  const [mode, setMode] = useState<Mode>('view')
  const [pendingProfile, setPendingProfile] = useState<typeof initialProfile | null>(null)
  const [confirmingPassword, setConfirmingPassword] = useState(false)

  function confirmProfileUpdate() {
    if (!pendingProfile) return
    setProfile(pendingProfile)
    setPendingProfile(null)
    setMode('view')
    showToast('Profile updated successfully')
  }

  function confirmPasswordUpdate() {
    setConfirmingPassword(false)
    setMode('view')
    showToast('Password updated successfully')
  }

  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Manage Profile" icon={UserCircle} />

      {mode === 'view' && (
        <div className="flex flex-col gap-6">
          <ProfileAvatar avatar={profile.avatar} />

          <DetailCard title="My Information">
            <div className="flex flex-wrap">
              <InfoField label="Full Name" value={profile.name} />
              <InfoField label="Email Address" value={profile.email} />
            </div>
            <InfoField label="Contact Phone" value={profile.phone} />
          </DetailCard>

          <div className="flex gap-2.5">
            <Button className="h-[50px] gap-2.5 px-6" onClick={() => setMode('profile')}>
              <UserCircle size={18} />
              Update Profile
            </Button>
            <Button className="h-[50px] gap-2.5 px-6" onClick={() => setMode('password')}>
              <KeyRound size={18} />
              Update Password
            </Button>
          </div>
        </div>
      )}

      {mode === 'profile' && (
        <div className="flex max-w-[760px] flex-col gap-5 rounded-2xl border border-border p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-text">Update profile</h1>
            <p className="text-sm text-text-soft">Review and update your details as needed.</p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              setPendingProfile({
                ...profile,
                name: String(formData.get('name') ?? profile.name),
                phone: String(formData.get('phone') ?? profile.phone),
              })
            }}
          >
            <ProfileAvatar avatar={profile.avatar} editable onChangeAvatar={(avatar) => setProfile((p) => ({ ...p, avatar }))} />

            <div className="flex flex-wrap gap-4">
              <div className="min-w-[240px] flex-1 basis-[45%]">
                <Input name="name" label="Full Name" defaultValue={profile.name} required />
              </div>
              <div className="min-w-[240px] flex-1 basis-[45%]">
                <Input name="phone" label="Contact Phone" defaultValue={profile.phone} required />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-error" />
              <p className="text-xs italic text-text-soft">
                Email updates are restricted for Admin accounts. To maintain system integrity and security audit logs, changes to administrative email
                addresses must be authorized by the Developer Team.
              </p>
            </div>

            <Button type="submit" className="h-[50px] w-fit px-6">
              Save The Changes
            </Button>
          </form>
        </div>
      )}

      {mode === 'password' && (
        <div className="flex max-w-[760px] flex-col gap-5 rounded-2xl border border-border p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-bold text-text">Update profile</h1>
            <p className="text-sm text-text-soft">Review and update your details as needed.</p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              setConfirmingPassword(true)
            }}
          >
            <PasswordInput name="oldPassword" label="Old Password" required />
            <div className="flex flex-wrap gap-4">
              <div className="min-w-[240px] flex-1 basis-[45%]">
                <PasswordInput name="newPassword" label="New Password" required />
              </div>
              <div className="min-w-[240px] flex-1 basis-[45%]">
                <PasswordInput name="confirmPassword" label="Confirm New Password" required />
              </div>
            </div>

            <Button type="submit" className="h-[50px] w-fit px-6">
              Save The Changes
            </Button>
          </form>
        </div>
      )}

      {pendingProfile && (
        <ConfirmDialog
          title="Save Profile Changes !"
          description="Are you sure you want to update your profile information! Your changes will be applied immediately."
          confirmLabel="Confirm"
          tone="warning"
          onCancel={() => setPendingProfile(null)}
          onConfirm={confirmProfileUpdate}
        />
      )}

      {confirmingPassword && (
        <ConfirmDialog
          title="Change Password !"
          description="Are you sure you want to update your password! You will need to use the new password the next time you log in."
          confirmLabel="Confirm"
          tone="warning"
          onCancel={() => setConfirmingPassword(false)}
          onConfirm={confirmPasswordUpdate}
        />
      )}
    </div>
  )
}

function ProfileAvatar({
  avatar,
  editable,
  onChangeAvatar,
}: {
  avatar?: string
  editable?: boolean
  onChangeAvatar?: (dataUrl: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file || !onChangeAvatar) return
    const reader = new FileReader()
    reader.onload = () => onChangeAvatar(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="relative flex size-[100px] items-center justify-center rounded-3xl border border-border bg-brand-soft">
      {avatar ? (
        <img src={avatar} alt={currentUser.name} className="size-full rounded-3xl object-cover" />
      ) : (
        <span className="text-3xl font-extrabold italic text-brand">{currentUser.initial}</span>
      )}

      {editable && (
        <>
          <button
            type="button"
            aria-label="Change profile photo"
            onClick={() => inputRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-app bg-success text-app"
          >
            <Camera size={13} />
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </>
      )}
    </div>
  )
}
