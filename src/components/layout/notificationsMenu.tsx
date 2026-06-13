import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  CalendarClock,
  ClipboardCheck,
  PartyPopper,
  UserPlus,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/routes'

interface Note {
  id: string
  icon: LucideIcon
  tone: string
  text: string
  time: string
  to: string
}

const NOTES: Note[] = [
  {
    id: 'n1',
    icon: UserPlus,
    tone: 'bg-primary/10 text-primary',
    text: '3 new applicants for Senior Frontend Engineer',
    time: '12m ago',
    to: ROUTES.candidates,
  },
  {
    id: 'n2',
    icon: CalendarClock,
    tone: 'bg-warning/10 text-warning',
    text: 'Interview with Lena Voss starts in 30 minutes',
    time: '28m ago',
    to: ROUTES.interviews,
  },
  {
    id: 'n3',
    icon: ClipboardCheck,
    tone: 'bg-success/10 text-success',
    text: 'James Okoro submitted a scorecard',
    time: '1h ago',
    to: ROUTES.candidates,
  },
  {
    id: 'n4',
    icon: PartyPopper,
    tone: 'bg-success/10 text-success',
    text: 'Esme Okafor accepted their offer',
    time: '3h ago',
    to: ROUTES.offers,
  },
]

export function NotificationsMenu() {
  const [unread, setUnread] = useState(NOTES.length)
  const [open, setOpen] = useState(false)

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (o) setUnread(0)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <p className="text-sm font-semibold">Notifications</p>
          <button
            className="text-xs text-primary hover:underline"
            onClick={() => setUnread(0)}
          >
            Mark all read
          </button>
        </div>
        <div className="flex max-h-96 flex-col overflow-y-auto">
          {NOTES.map((n) => (
            <Link
              key={n.id}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-secondary"
            >
              <span
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full',
                  n.tone,
                )}
              >
                <n.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-sm leading-snug">{n.text}</p>
                <p className="text-xs text-muted-foreground">{n.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
