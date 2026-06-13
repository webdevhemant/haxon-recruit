import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthFormShell } from '../components/authFormShell'
import { AuthField } from '../components/authField'
import { SocialButtons } from '../components/socialButtons'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(1, 'Enter your password'),
})

type LoginValues = z.infer<typeof schema>

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'alex@nexaflow.io', password: '' },
  })

  const onSubmit = (values: LoginValues) => {
    login(values.email)
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <AuthField
          id="email"
          label="Email"
          icon={Mail}
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-medium leading-none">Password</span>
            <Link
              to={ROUTES.forgotPassword}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <AuthField
            id="password"
            label=""
            icon={Lock}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        <Button type="submit" className="mt-1 w-full" disabled={isSubmitting}>
          Sign in
        </Button>
      </form>
    </AuthFormShell>
  )
}
