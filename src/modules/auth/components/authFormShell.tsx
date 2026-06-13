import type { ReactNode } from 'react'

interface AuthFormShellProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthFormShell({
  title,
  subtitle,
  children,
  footer,
}: AuthFormShellProps) {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-tight">
        {title}
      </h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-7">{children}</div>
      {footer && (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {footer}
        </p>
      )}
    </div>
  )
}
