import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/lib/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthFormShell } from '../components/authFormShell'
import { SocialButtons } from '../components/socialButtons'

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [email, setEmail] = useState('alex@nexaflow.io')
  const [password, setPassword] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(email)
    navigate(ROUTES.dashboard)
  }

  return (
    <AuthFormShell
      title="Welcome back"
      subtitle="Sign in to your Haxon Recruit workspace."
      footer={
        <>
          New to Haxon?{' '}
          <Link to={ROUTES.signup} className="font-medium text-primary">
            Create an account
          </Link>
        </>
      }
    >
      <SocialButtons />
      <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or continue with email
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to={ROUTES.forgotPassword}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <Button type="submit" className="mt-1 w-full">
          Sign in
        </Button>
      </form>
    </AuthFormShell>
  )
}
