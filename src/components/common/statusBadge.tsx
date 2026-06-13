import { Badge, type BadgeProps } from '@/components/ui/badge'

type Variant = BadgeProps['variant']

const JOB_MAP: Record<string, { label: string; variant: Variant }> = {
  draft: { label: 'Draft', variant: 'secondary' },
  open: { label: 'Open', variant: 'success' },
  paused: { label: 'Paused', variant: 'warning' },
  closed: { label: 'Closed', variant: 'outline' },
}

const OFFER_MAP: Record<string, { label: string; variant: Variant }> = {
  pending: { label: 'Pending', variant: 'warning' },
  sent: { label: 'Sent', variant: 'default' },
  accepted: { label: 'Accepted', variant: 'success' },
  declined: { label: 'Declined', variant: 'destructive' },
  expired: { label: 'Expired', variant: 'outline' },
}

const INTERVIEW_MAP: Record<string, { label: string; variant: Variant }> = {
  confirmed: { label: 'Confirmed', variant: 'success' },
  pending: { label: 'Pending', variant: 'warning' },
  completed: { label: 'Completed', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
}

const REC_MAP: Record<string, { label: string; variant: Variant }> = {
  strong_yes: { label: 'Strong Yes', variant: 'success' },
  yes: { label: 'Yes', variant: 'success' },
  no: { label: 'No', variant: 'destructive' },
  strong_no: { label: 'Strong No', variant: 'destructive' },
}

const MAPS = {
  job: JOB_MAP,
  offer: OFFER_MAP,
  interview: INTERVIEW_MAP,
  recommendation: REC_MAP,
}

interface StatusBadgeProps {
  kind: keyof typeof MAPS
  value: string
}

export function StatusBadge({ kind, value }: StatusBadgeProps) {
  const entry = MAPS[kind][value]
  if (!entry) return <Badge variant="secondary">{value}</Badge>
  return <Badge variant={entry.variant}>{entry.label}</Badge>
}
