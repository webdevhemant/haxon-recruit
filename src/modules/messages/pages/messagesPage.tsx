import { useMemo, useRef, useState } from 'react'
import { Send } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/common/userAvatar'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  fromMe: boolean
  text: string
  time: string
}

interface Conversation {
  id: string
  name: string
  seed: string
  initials: string
  subtitle: string
  messages: Message[]
}

const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Noah Carter',
    seed: 'c1',
    initials: 'NC',
    subtitle: 'Senior Frontend Engineer · Interview',
    messages: [
      {
        id: 'm1',
        fromMe: false,
        text: 'Hi! Excited about the next round.',
        time: '9:24 AM',
      },
      {
        id: 'm2',
        fromMe: true,
        text: 'Great to hear, Noah! Does Thursday 2pm work for the system design round?',
        time: '9:31 AM',
      },
      {
        id: 'm3',
        fromMe: false,
        text: 'Thursday works perfectly. Thank you!',
        time: '9:33 AM',
      },
    ],
  },
  {
    id: 'c2',
    name: 'Priya Nair',
    seed: 'u-recruiter',
    initials: 'PN',
    subtitle: 'Recruiter · Teammate',
    messages: [
      {
        id: 'm1',
        fromMe: false,
        text: 'Can you review the Brand Designer shortlist today?',
        time: 'Yesterday',
      },
      {
        id: 'm2',
        fromMe: true,
        text: 'On it — I’ll move the top 3 to onsite.',
        time: 'Yesterday',
      },
    ],
  },
  {
    id: 'c3',
    name: 'Ethan Rivera',
    seed: 'c92',
    initials: 'ER',
    subtitle: 'Head of Sales · Offer',
    messages: [
      {
        id: 'm1',
        fromMe: true,
        text: 'Hi Ethan, we’ve sent your offer — let us know if you have questions!',
        time: 'Mon',
      },
      {
        id: 'm2',
        fromMe: false,
        text: 'Thank you! Reviewing it with excitement.',
        time: 'Mon',
      },
    ],
  },
]

export function MessagesPage() {
  const [conversations, setConversations] = useState(SEED_CONVERSATIONS)
  const [activeId, setActiveId] = useState(SEED_CONVERSATIONS[0].id)
  const [draft, setDraft] = useState('')
  const endRef = useRef<HTMLDivElement>(null)

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId)!,
    [conversations, activeId],
  )

  const send = () => {
    if (!draft.trim()) return
    const msg: Message = {
      id: `m${Date.now()}`,
      fromMe: true,
      text: draft.trim(),
      time: 'Now',
    }
    setConversations((cs) =>
      cs.map((c) =>
        c.id === activeId ? { ...c, messages: [...c.messages, msg] } : c,
      ),
    )
    setDraft('')
    requestAnimationFrame(() =>
      endRef.current?.scrollIntoView({ behavior: 'smooth' }),
    )
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight">
        Messages
      </h1>

      <Card className="grid h-[calc(100vh-12rem)] grid-cols-1 overflow-hidden md:grid-cols-[300px_1fr]">
        {/* conversation list */}
        <div className="hidden flex-col border-r border-border md:flex">
          <div className="border-b border-border px-4 py-3 text-sm font-semibold">
            Conversations
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((c) => {
              const last = c.messages[c.messages.length - 1]
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    'flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-secondary',
                    c.id === activeId && 'bg-secondary',
                  )}
                >
                  <UserAvatar
                    seed={c.seed}
                    initials={c.initials}
                    className="size-9"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {last.text}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* thread */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <UserAvatar
              seed={active.seed}
              initials={active.initials}
              className="size-9"
            />
            <div>
              <p className="text-sm font-semibold">{active.name}</p>
              <p className="text-xs text-muted-foreground">{active.subtitle}</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {active.messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  'flex',
                  m.fromMe ? 'justify-end' : 'justify-start',
                )}
              >
                <div
                  className={cn(
                    'max-w-[75%] rounded-2xl px-3.5 py-2 text-sm',
                    m.fromMe
                      ? 'rounded-br-sm bg-primary text-primary-foreground'
                      : 'rounded-bl-sm bg-secondary',
                  )}
                >
                  <p>{m.text}</p>
                  <p
                    className={cn(
                      'mt-1 text-[10px]',
                      m.fromMe
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground',
                    )}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
            className="flex items-center gap-2 border-t border-border p-3"
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message…"
            />
            <Button type="submit" size="icon" disabled={!draft.trim()}>
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
