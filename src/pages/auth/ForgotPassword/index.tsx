import { useNavigate } from 'react-router-dom'
import { AuthCard } from '@/components/layout/AuthCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <AuthCard>
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-bold text-text">Forgot Password</h1>
        <p className="text-base text-text-soft">
          Enter your registered email address and we&rsquo;ll send you a verification code to reset your password.
        </p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/verify-otp')
        }}
      >
        <Input id="email" type="email" label="Email Address" placeholder="Enter your email address" required />
        <Button type="submit" className="h-[50px] w-full">
          Send Verification Code
        </Button>
      </form>
    </AuthCard>
  )
}
