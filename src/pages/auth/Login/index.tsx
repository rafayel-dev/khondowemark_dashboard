import { Link, useNavigate } from 'react-router-dom'
import { AuthCard } from '@/components/layout/AuthCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/ui/PasswordInput'

export default function Login() {
  const navigate = useNavigate()

  return (
    <AuthCard>
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-bold text-text">
          Login to <span className="text-success">Nchito</span> Admin Account
        </h1>
        <p className="text-base text-text-soft">Please enter your email and password to continue</p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          localStorage.setItem('isAuthenticated', 'true')
          navigate('/')
        }}
      >
        <Input id="email" type="email" label="Email Address" placeholder="Enter your email address" required />

        <PasswordInput id="password" label="Password" placeholder="Enter your password" required />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-[5px] text-[15px] font-medium text-text-soft">
            <input type="checkbox" className="size-[14px] accent-brand" />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-base font-semibold text-brand">
            Forgot password!
          </Link>
        </div>

        <Button type="submit" className="h-[50px] w-full">
          Log In
        </Button>
      </form>
    </AuthCard>
  )
}
