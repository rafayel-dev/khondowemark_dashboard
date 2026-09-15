import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthCard } from '@/components/layout/AuthCard'
import { Button } from '@/components/ui/Button'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

export default function VerifyOtp() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const timeLabel = `00:${String(secondsLeft).padStart(2, '0')}`

  function updateDigit(index: number, value: string) {
    if (!/^\d?$/.test(value)) return
    const next = [...otp]
    next[index] = value
    setOtp(next)
    if (value && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus()
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Backspace' || otp[index] || index === 0) return
    e.preventDefault()
    const next = [...otp]
    next[index - 1] = ''
    setOtp(next)
    inputs.current[index - 1]?.focus()
  }

  return (
    <AuthCard>
      <div className="flex flex-col gap-4">
        <h1 className="text-[32px] font-bold text-text">Verify Your OTP</h1>
        <p className="text-base text-text-soft">Enter the 6-digit verification code sent to your registered email address.</p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          navigate('/set-new-password')
        }}
      >
        <div className="flex justify-between gap-2.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputs.current[index] = el
              }}
              value={digit}
              onChange={(e) => updateDigit(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onFocus={(e) => e.target.select()}
              maxLength={1}
              inputMode="numeric"
              className="h-[56px] w-[48px] rounded-xl bg-black/[0.04] text-center text-lg font-semibold text-text focus:outline-none focus:ring-2 focus:ring-brand"
            />
          ))}
        </div>

        <p className="text-sm text-text-soft">
          Didn&rsquo;t receive the code?{' '}
          {secondsLeft > 0 ? (
            <span>
              Resend in <span className="font-semibold text-text">{timeLabel}</span>
            </span>
          ) : (
            <button type="button" onClick={() => setSecondsLeft(RESEND_SECONDS)} className="font-semibold text-brand">
              Resend
            </button>
          )}
        </p>

        <Button type="submit" className="h-[50px] w-full">
          Verify Code
        </Button>
      </form>
    </AuthCard>
  )
}
