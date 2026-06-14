import { useEffect, useState } from 'react'
import { Mail, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { TabFade } from '@/components/common/tabFade'
import { SettingsTabs } from '../components/settingsTabs'

interface Template {
  id: string
  name: string
  subject: string
  body: string
}

const INITIAL: Template[] = [
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
    name: 'Interview reminder',
    subject: 'Reminder: your {{job}} interview is tomorrow',
    body: 'Hi {{first_name}},\n\nJust a friendly reminder about your {{stage}} interview tomorrow. The video link is in your calendar invite. Reach out if anything changes.\n\n{{recruiter}}',
  },
  {
    id: 't4',
    name: 'Offer sent',
    subject: 'Your offer from {{company}}',
    body: 'Hi {{first_name}},\n\nWe’re thrilled to extend you an offer for the {{job}} role. Please review the attached letter — we can’t wait to have you on the team.\n\n{{recruiter}}',
  },
  {
    id: 't5',
    name: 'Reference request',
    subject: 'Quick reference for {{first_name}}',
    body: 'Hi,\n\n{{first_name}} listed you as a reference for the {{job}} role at {{company}}. Would you have 10 minutes this week for a short call?\n\nThank you,\n{{recruiter}}',
  },
  {
    id: 't6',
    name: 'Onboarding welcome',
    subject: 'Welcome to {{company}}, {{first_name}}!',
    body: 'Hi {{first_name}},\n\nWe’re so excited you’re joining us as {{job}}. Here’s everything you need for your first day. Welcome aboard!\n\n{{recruiter}}',
  },
  {
    id: 't7',
    name: 'Rejection',
    subject: 'Update on your {{job}} application',
    body: 'Hi {{first_name}},\n\nThank you for taking the time to apply. After careful review we’ve decided not to move forward at this time. We wish you the very best.\n\n{{recruiter}}',
  },
]

const VARIABLES = ['first_name', 'job', 'company', 'recruiter', 'stage']

const SAMPLE: Record<string, string> = {
  first_name: 'Noah',
  job: 'Senior Frontend Engineer',
  company: 'Nexaflow Inc.',
  recruiter: 'Priya Nair',
  stage: 'system design',
}

const render = (text: string) =>
  text.replace(/\{\{(\w+)\}\}/g, (_, k) => SAMPLE[k] ?? `{{${k}}}`)

export function EmailTemplatesPage() {
  const [templates, setTemplates] = useState(INITIAL)
  const [selectedId, setSelectedId] = useState(INITIAL[0].id)
  const [name, setName] = useState(INITIAL[0].name)
  const [subject, setSubject] = useState(INITIAL[0].subject)
  const [body, setBody] = useState(INITIAL[0].body)
  const [preview, setPreview] = useState(false)

  const selected = templates.find((t) => t.id === selectedId)

  useEffect(() => {
    if (selected) {
      setName(selected.name)
      setSubject(selected.subject)
      setBody(selected.body)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId])

  const save = () => {
    setTemplates((ts) =>
      ts.map((t) => (t.id === selectedId ? { ...t, name, subject, body } : t)),
    )
    toast.success('Template saved')
  }

  const create = () => {
    const id = `t${Date.now()}`
    setTemplates((ts) => [
      ...ts,
      {
        id,
        name: 'Untitled template',
        subject: '',
        body: 'Hi {{first_name}},\n\n',
      },
    ])
    setSelectedId(id)
    toast.success('New template created')
  }

  const remove = (id: string) => {
    const next = templates.filter((t) => t.id !== id)
    setTemplates(next)
    if (id === selectedId && next[0]) setSelectedId(next[0].id)
    toast.success('Template deleted')
  }

  return (
    <div>
      <SettingsTabs />
      <TabFade>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <Card className="h-fit p-2">
            <Button variant="outline" className="mb-2 w-full" onClick={create}>
              <Plus className="size-4" />
              New template
            </Button>
            {templates.map((t) => (
              <div
                key={t.id}
                className={cn(
                  'group flex items-center rounded-lg pr-1 transition-colors',
                  t.id === selectedId
                    ? 'bg-secondary'
                    : 'hover:bg-secondary/60',
                )}
              >
                <button
                  onClick={() => setSelectedId(t.id)}
                  className="flex flex-1 items-center gap-2.5 px-3 py-2.5 text-left text-sm"
                >
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  <span className="truncate">{t.name}</span>
                </button>
                {templates.length > 1 && (
                  <button
                    onClick={() => remove(t.id)}
                    className="rounded p-1.5 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                    aria-label="Delete template"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                )}
              </div>
            ))}
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="tname">Template name</Label>
                <Input
                  id="tname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  Variables (click to insert)
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
                <Button variant="outline" onClick={() => setPreview(true)}>
                  Preview
                </Button>
                <Button onClick={save}>Save template</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabFade>

      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{render(subject) || 'No subject'}</DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-wrap rounded-lg border border-border bg-secondary/30 p-4 text-sm">
            {render(body)}
          </div>
          <p className="text-xs text-muted-foreground">
            Preview uses sample data for variables.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  )
}
