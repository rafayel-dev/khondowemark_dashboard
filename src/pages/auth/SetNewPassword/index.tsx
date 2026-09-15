import { useNavigate } from 'react-router-dom'
import { AuthCard } from '@/components/layout/AuthCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SetNewPassword() {
  const navigate = useNavigate()

  return (
    <AuthCard>
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-bold text-text">Set New Password</h1>
        <p className="text-base text-text-soft">Create a new password for your account to continue securely.</p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/login')
        }}
      >
        <Input id="password" type="password" label="New Password" placeholder="Enter your new password" required />
        <Input id="confirm-password" type="password" label="Confirm New Password" placeholder="Re-enter your new password" required />
        <Button type="submit" className="h-[50px] w-full">
          Update Password
        </Button>
      </form>
    </AuthCard>
  )
}
