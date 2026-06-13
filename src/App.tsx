import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Badge>v1.0 blueprint</Badge>
      <h1 className="font-display text-5xl font-extrabold tracking-tight">
        Haxon<span className="text-primary">.</span>Recruit
      </h1>
      <p className="text-muted-foreground">
        Foundation ready — Tailwind, design tokens, and shadcn/ui wired up.
      </p>
      <Button size="lg">Explore</Button>
    </div>
  )
}

export default App
