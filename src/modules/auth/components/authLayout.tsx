import { Link, Outlet } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'

import { ROUTES } from '@/lib/routes'

const HIGHLIGHTS = [
  'Drag-and-drop candidate pipelines',
  'Structured scorecards & debriefs',
  'Offers, analytics and DEI reporting',
]

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-[#08080a] p-10 lg:flex lg:flex-col lg:justify-between">
        <div
          className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full opacity-40 blur-[120px]"
          style={{ background: '#7b6cff' }}
        />
        <Link
          to={ROUTES.landing}
          className="relative flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-white"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-[#7b6cff] text-sm text-black">
            H
          </span>
          haxon<span className="-ml-2 text-[#7b6cff]">.</span>recruit
        </Link>

        <div className="relative">
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white">
            The hiring OS your
            <br />
            whole team will love.
          </h2>
          <ul className="mt-7 flex flex-col gap-3">
            {HIGHLIGHTS.map((h) => (
              <li
                key={h}
                className="flex items-center gap-2.5 text-sm text-white/60"
              >
                <CheckCircle2 className="size-4 text-[#b7ff3b]" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/30">
          © {new Date().getFullYear()} Haxon Recruit. Demo build.
        </p>
      </div>

      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
