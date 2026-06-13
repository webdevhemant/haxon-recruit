import { useState } from 'react'
import { UserPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserAvatar } from '@/components/common/userAvatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TEAM } from '@/lib/data/team'
import { daysAgoLabel } from '@/lib/format'
import { SettingsTabs } from '../components/settingsTabs'

const ROLE_VARIANT: Record<string, 'default' | 'secondary' | 'outline'> = {
  Admin: 'default',
  Recruiter: 'secondary',
  Interviewer: 'outline',
  Viewer: 'outline',
}

export function TeamSettingsPage() {
  const [invite, setInvite] = useState('')

  return (
    <div>
      <SettingsTabs />

      <Card className="mb-6 flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <Input
          value={invite}
          onChange={(e) => setInvite(e.target.value)}
          placeholder="teammate@nexaflow.io"
          className="sm:max-w-xs"
        />
        <Button onClick={() => setInvite('')} disabled={!invite}>
          <UserPlus className="size-4" />
          Send invite
        </Button>
        <span className="text-sm text-muted-foreground sm:ml-auto">
          {TEAM.length} members
        </span>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAM.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <UserAvatar
                      seed={m.id}
                      initials={m.initials}
                      className="size-8"
                    />
                    <div>
                      <p className="font-medium leading-tight">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {m.department}
                </TableCell>
                <TableCell>
                  <Badge variant={ROLE_VARIANT[m.role] ?? 'outline'}>
                    {m.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {daysAgoLabel(m.lastActiveDays)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
