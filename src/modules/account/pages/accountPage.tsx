import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, LogOut } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserAvatar } from '@/components/common/userAvatar'
import { ROUTES } from '@/lib/routes'
import {
  ROLE_DESCRIPTION,
  ROLE_LABEL,
  ROLE_PERMISSIONS,
  type Permission,
} from '@/lib/rbac'
import { useAuthStore } from '@/stores/useAuthStore'

const PERMISSION_LABEL: Record<Permission, string> = {
  'dashboard.view': 'View dashboard',
  'jobs.view': 'View jobs',
  'jobs.create': 'Create jobs',
  'jobs.edit': 'Edit jobs',
  'candidates.view': 'View candidates',
  'candidates.manage': 'Manage candidates',
  'interviews.view': 'View interviews',
  'interviews.schedule': 'Schedule interviews',
  'scorecards.submit': 'Submit scorecards',
  'offers.view': 'View offers',
  'offers.manage': 'Manage offers',
  'analytics.view': 'View analytics',
  'messages.view': 'Use messages',
  'settings.view': 'Manage settings',
}

export function AccountPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const logout = useAuthStore((s) => s.logout)

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)

  const home =
    !user || user.role === 'applicant' ? ROUTES.careers : ROUTES.dashboard

  const onSave = () => {
    updateProfile({ name, email })
    setSaved(true)
    toast.success('Profile updated')
    setTimeout(() => setSaved(false), 1800)
  }

  const onSignOut = () => {
    logout()
    navigate(ROUTES.login)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link
            to={home}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <Button variant="ghost" size="sm" onClick={onSignOut}>
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 flex items-center gap-4">
          <UserAvatar
            seed={user?.id ?? 'guest'}
            initials={user?.initials ?? 'U'}
            className="size-16"
          />
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold tracking-tight">
                {user?.name ?? 'Guest'}
              </h1>
              {user && (
                <Badge variant="secondary">{ROLE_LABEL[user.role]}</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {user ? ROLE_DESCRIPTION[user.role] : 'Not signed in'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button onClick={onSave} className="self-start">
                {saved ? (
                  <>
                    <Check className="size-4" />
                    Saved
                  </>
                ) : (
                  'Save changes'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your access</CardTitle>
            </CardHeader>
            <CardContent>
              {user && ROLE_PERMISSIONS[user.role].length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {ROLE_PERMISSIONS[user.role].map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm">
                      <Check className="size-4 text-success" />
                      <span className="text-muted-foreground">
                        {PERMISSION_LABEL[p]}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Applicants can browse and apply to open roles on the careers
                  site.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
