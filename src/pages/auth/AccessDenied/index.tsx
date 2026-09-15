import { Lock, Monitor } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthCard } from '@/components/layout/AuthCard'
import { Button } from '@/components/ui/Button'

export default function AccessDenied() {
  return (
    <AuthCard className="max-w-125 items-center gap-5 text-center">
      <div className="relative flex size-15 items-center justify-center rounded-[14px] bg-error-soft">
        <Monitor size={36} className="text-error" />
        <div className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-error-soft">
          <Lock size={14} className="text-error" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5">
        <h1 className="text-2xl font-bold italic text-text">Account Access Denied !</h1>
        <p className="text-[15px] font-medium leading-[1.3] text-text-soft">
          Unfortunately, your admin credentials are blocked or invalid.
          <br />
          Please contact the developer team for assistance.
        </p>
      </div>

      <Link to="/login" className="w-full">
        <Button className="h-12.5 w-full">Go Back Login</Button>
      </Link>
    </AuthCard>
  )
}
