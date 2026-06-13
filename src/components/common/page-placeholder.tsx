import { Construction } from 'lucide-react'

interface PagePlaceholderProps {
  title: string
  description?: string
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Construction className="size-6" />
      </div>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        {description ?? 'This page is part of the build plan and coming soon.'}
      </p>
    </div>
  )
}
