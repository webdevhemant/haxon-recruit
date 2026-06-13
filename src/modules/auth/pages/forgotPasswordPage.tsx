import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, MailCheck } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/lib/routes'
import { AuthFormShell } from '../components/authFormShell'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <AuthFormShell
        title="Check your inbox"
        subtitle={`We sent a password reset link to ${email}.`}
        footer={
          <Link
            to={ROUTES.login}
            className="inline-flex items-center gap-1.5 font-medium text-primary"
          >
            <ArrowLeft className="size-3.5" />
            Back to sign in
          </Link>
        }
      >
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-10 text-center">
          <span className="flex size-11 items-center justify-center rounded-xl bg-success/10 text-success">
            <MailCheck className="size-5" />
          </span>
          <p className="max-w-xs text-sm text-muted-foreground">
            Didn’t get the email? Check your spam folder or{' '}
            <button
              type="button"
              className="font-medium text-primary"
              onClick={() => setSent(false)}
            >
              try another address
            </button>
            .
          </p>
        </div>
      </AuthFormShell>
    )
  }

  return (
    <AuthFormShell
      title="Forgot password?"
      subtitle="Enter your email and we’ll send you a reset link."
      footer={
        <Link
          to={ROUTES.login}
          className="inline-flex items-center gap-1.5 font-medium text-primary"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </form>
    </AuthFormShell>
  )
}
