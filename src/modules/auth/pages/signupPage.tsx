import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Lock, Mail, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import { useAuthStore } from '@/stores/useAuthStore'
import { AuthFormShell } from '../components/authFormShell'
import { AuthField } from '../components/authField'
import { SocialButtons } from '../components/socialButtons'

const schema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type SignupValues = z.infer<typeof schema>

export function SignupPage() {
  const navigate = useNavigate()
  const signup = useAuthStore((s) => s.signup)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(schema) })

  const onSubmit = (values: SignupValues) => {
    signup(values.name, values.email)
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <AuthField
          id="name"
          label="Full name"
          icon={User}
          placeholder="Jordan Lee"
          error={errors.name?.message}
          {...register('name')}
        />
        <AuthField
          id="email"
          label="Work email"
          icon={Mail}
          type="email"
          placeholder="you@company.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <AuthField
          id="password"
          label="Password"
          icon={Lock}
          type="password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" className="mt-1 w-full" disabled={isSubmitting}>
          Create account
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </AuthFormShell>
  )
}
