import { useState } from 'react'
import { Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SettingsTabs } from '../components/settingsTabs'

interface Template {
  id: string
  name: string
  subject: string
  body: string
}

const TEMPLATES: Template[] = [
  {
    id: 't1',
    name: 'Application received',
    subject: 'Thanks for applying to {{job}}',
    body: 'Hi {{first_name}},\n\nThanks for applying to the {{job}} role at {{company}}. Our team is reviewing your application and we’ll be in touch soon.\n\nBest,\n{{recruiter}}',
  },
  {
    id: 't2',
    name: 'Interview invite',
    subject: 'Interview for {{job}} at {{company}}',
    body: 'Hi {{first_name}},\n\nWe’d love to invite you to a {{stage}} interview for the {{job}} role. Please pick a time that works using the link below.\n\nTalk soon,\n{{recruiter}}',
  },
  {
    id: 't3',
    name: 'Offer sent',
    subject: 'Your offer from {{company}}',
    body: 'Hi {{first_name}},\n\nWe’re thrilled to extend you an offer for the {{job}} role. Please review the attached letter — we can’t wait to have you on the team.\n\n{{recruiter}}',
  },
  {
    id: 't4',
    name: 'Rejection',
    subject: 'Update on your {{job}} application',
    body: 'Hi {{first_name}},\n\nThank you for taking the time to apply. After careful review we’ve decided not to move forward at this time. We wish you the very best.\n\n{{recruiter}}',
  },
]

const VARIABLES = ['first_name', 'job', 'company', 'recruiter', 'stage']

export function EmailTemplatesPage() {
  const [selectedId, setSelectedId] = useState(TEMPLATES[0].id)
  const selected = TEMPLATES.find((t) => t.id === selectedId)!
  const [subject, setSubject] = useState(selected.subject)
  const [body, setBody] = useState(selected.body)

  const select = (t: Template) => {
    setSelectedId(t.id)
    setSubject(t.subject)
    setBody(t.body)
  }

  return (
    <div>
      <SettingsTabs />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <Card className="h-fit p-2">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => select(t)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                t.id === selectedId
                  ? 'bg-secondary font-medium'
                  : 'text-muted-foreground hover:bg-secondary/60',
              )}
            >
              <Mail className="size-4 shrink-0" />
              {t.name}
            </button>
          ))}
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="body">Body</Label>
              <Textarea
                id="body"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="font-mono text-xs"
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs text-muted-foreground">
                Available variables (click to insert)
              </p>
              <div className="flex flex-wrap gap-1.5">
                {VARIABLES.map((v) => (
                  <button
                    key={v}
                    onClick={() => setBody((b) => `${b}{{${v}}}`)}
                    className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                  >
                    {`{{${v}}}`}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Preview</Button>
              <Button>Save template</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
