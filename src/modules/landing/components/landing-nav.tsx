import { Link } from 'react-router-dom'

import { ROUTES } from '@/lib/routes'

const LINKS = [
  { label: 'Modules', href: '#modules' },
  { label: 'Metrics', href: '#metrics' },
  { label: 'Pricing', href: '#pricing' },
]

export function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-[#08080a]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight"
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-[#7b6cff] text-sm text-black">
            H
          </span>
          haxon<span className="-ml-2 text-[#7b6cff]">.</span>recruit
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/50 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={ROUTES.careers}
            className="hidden rounded-md px-4 py-2 text-sm text-white/60 transition-colors hover:text-white sm:block"
          >
            Careers
          </Link>
          <Link
            to={ROUTES.dashboard}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            Open app
          </Link>
        </div>
      </div>
    </header>
  )
}
