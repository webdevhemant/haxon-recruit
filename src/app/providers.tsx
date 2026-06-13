import type { ReactNode } from 'react'
import { Toaster } from 'sonner'

import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      {children}
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast:
              'group rounded-lg border border-border bg-card text-card-foreground shadow-lg',
            description: 'text-muted-foreground',
            actionButton: 'bg-primary text-primary-foreground',
          },
        }}
      />
    </TooltipProvider>
  )
}
