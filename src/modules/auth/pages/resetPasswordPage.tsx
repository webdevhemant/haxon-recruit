import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/lib/routes'
import { AuthFormShell } from '../components/authFormShell'

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [done, setDone] = useState(false)

  const mismatch = confirm.length > 0 && password !== confirm

  if (done) {
    return (
      <AuthFormShell
        title="Password updated"
        subtitle="Your password has been reset successfully."
      >
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-success/10 text-success">
            <CheckCircle2 className="size-6" />
          </span>
          <Button onClick={() => navigate(ROUTES.login)} className="w-full">
            Continue to sign in
          </Button>
        </div>
      </AuthFormShell>
    )
  }

  return (
    <AuthFormShell
      title="Set a new password"
      subtitle="Choose a strong password you don’t use elsewhere."
      footer={
        <Link to={ROUTES.login} className="font-medium text-primary">
          Back to sign in
        </Link>
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!mismatch) setDone(true)
        }}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">New password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter password"
          />
          {mismatch && (
            <p className="text-xs text-destructive">Passwords don’t match.</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={mismatch}>
          Reset password
        </Button>
      </form>
    </AuthFormShell>
  )
}
