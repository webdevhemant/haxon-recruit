import { Link, Outlet } from 'react-router-dom'
import { ArrowUpRight, Star } from 'lucide-react'

import { BrandMark } from '@/components/common/brandMark'
import { ROUTES } from '@/lib/routes'

const STATS = [
  { value: '23d', label: 'Time to hire' },
  { value: '82%', label: 'Offer accept' },
  { value: '12.5%', label: 'Apply → hire' },
]

function Logo({ light }: { light?: boolean }) {
  return (
    <Link
      to={ROUTES.landing}
      className={`flex items-center gap-2 font-display text-lg font-extrabold tracking-tight ${
        light ? 'text-white' : ''
      }`}
    >
      <BrandMark />
      haxon<span className="text-[#7b6cff]">.</span>recruit
    </Link>
  )
}

export function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* brand panel */}
      <div className="relative hidden overflow-hidden bg-[#08080a] p-10 lg:flex lg:items-center lg:justify-center">
        <div
          className="pointer-events-none absolute -right-40 -top-40 size-[480px] rounded-full opacity-40 blur-[130px]"
          style={{ background: '#7b6cff' }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage:
              'radial-gradient(ellipse 70% 60% at 30% 20%,#000 30%,transparent 75%)',
          }}
        />

        <div className="absolute left-10 top-10">
          <Logo light />
        </div>

        <div className="relative w-full max-w-md">
          <h2 className="max-w-md font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-white">
            The hiring OS your whole team will love.
          </h2>

          {/* testimonial card */}
          <div className="mt-8 max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-3.5 fill-[#b7ff3b] text-[#b7ff3b]"
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              “We replaced three tools with Haxon and cut our time-to-hire by
              nearly half. The first ATS our hiring managers actually enjoy.”
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-[#7b6cff] text-xs font-bold text-white">
                MH
              </span>
              <div className="text-xs">
                <p className="font-semibold text-white/90">Maya Hartwell</p>
                <p className="text-white/40">Head of Talent, Nexaflow</p>
              </div>
            </div>
          </div>

          <dl className="mt-8 grid max-w-md grid-cols-3 gap-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-xl font-bold text-white">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-[11px] uppercase tracking-wide text-white/35">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <Link
          to={ROUTES.landing}
          className="absolute bottom-10 left-10 inline-flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/70"
        >
          Back to homepage
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* form panel */}
      <div className="flex flex-col bg-background px-6 py-8">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm py-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
