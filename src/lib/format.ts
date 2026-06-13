export const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

export const formatSalaryRange = (min: number, max: number) =>
  `${formatCompactCurrency(min)}–${formatCompactCurrency(max)}`

export const formatCompactCurrency = (n: number) => `$${Math.round(n / 1000)}k`

export const daysAgoLabel = (days: number) => {
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  return `${Math.floor(days / 30)}mo ago`
}

export const fromNow = (iso: string) => {
  const diffMs = new Date(iso).getTime() - Date.now()
  const diffDays = Math.round(diffMs / 86400000)
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays > 0) return `in ${diffDays}d`
  return `${Math.abs(diffDays)}d ago`
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

export const RECOMMENDATION_LABEL: Record<string, string> = {
  strong_yes: 'Strong Yes',
  yes: 'Yes',
  no: 'No',
  strong_no: 'Strong No',
}
