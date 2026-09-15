import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthCard } from '@/components/layout/AuthCard'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

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
          navigate('/')
        }}
      >
        <Input id="email" type="email" label="Email Address" placeholder="Enter your email address" required />

        <div className="flex w-full flex-col gap-[6px]">
          <label htmlFor="password" className="text-sm font-medium text-text">
            Password
          </label>
          <div className="flex h-[50px] w-full items-center rounded-xl bg-black/[0.04] px-4">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required
              className="w-full bg-transparent text-sm text-text placeholder:text-text-soft focus:outline-none"
            />
            <button type="button" onClick={() => setShowPassword((v) => !v)} className="text-text-soft">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

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
