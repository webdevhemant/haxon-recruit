import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/lib/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthFormShell } from '../components/authFormShell'
import { SocialButtons } from '../components/socialButtons'

export function SignupPage() {
  const navigate = useNavigate()
  const signup = useAuthStore((s) => s.signup)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup(name || 'New User', email)
    navigate(ROUTES.dashboard)
  }

  return (
    <AuthFormShell
      title="Create your account"
      subtitle="Start hiring with Haxon Recruit in seconds."
      footer={
        <>
          Already have an account?{' '}
          <Link to={ROUTES.login} className="font-medium text-primary">
            Sign in
          </Link>
        </>
      }
    >
      <SocialButtons />
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or sign up with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jordan Lee"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>
        <Button type="submit" className="mt-1 w-full">
          Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthFormShell>
  )
}
