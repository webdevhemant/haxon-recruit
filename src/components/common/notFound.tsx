import { ArrowLeft, LayoutDashboard } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'

export function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#08080a] px-6 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 size-[460px] -translate-x-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ background: '#7b6cff' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 40%,#000 30%,transparent 75%)',
        }}
      />

      <div className="relative">
        <p className="bg-gradient-to-b from-white to-white/30 bg-clip-text font-display text-[7rem] font-extrabold leading-none tracking-tighter text-transparent sm:text-[9rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-white">
          This page slipped through the pipeline.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
          The page you’re looking for doesn’t exist, was moved, or is still in
          the build plan. Let’s get you back on track.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link to={ROUTES.dashboard}>
              <LayoutDashboard className="size-4" />
              Go to dashboard
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white"
          >
            <Link to={ROUTES.landing}>
              <ArrowLeft className="size-4" />
              Back to homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
