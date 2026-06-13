import { Link } from 'react-router-dom'

import { ROUTES } from '@/lib/routes'

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Dashboard', to: ROUTES.dashboard },
      { label: 'Jobs', to: ROUTES.jobs },
      { label: 'Candidates', to: ROUTES.candidates },
      { label: 'Analytics', to: ROUTES.analytics },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Careers', to: ROUTES.careers },
      { label: 'Job board', to: ROUTES.careersJobs },
      { label: 'Offers', to: ROUTES.offers },
      { label: 'Settings', to: ROUTES.settingsTeam },
    ],
  },
]

export function LandingFooter() {
  return (
    <footer className="border-white/8 relative border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-16 md:grid-cols-4">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-md bg-[#7b6cff] text-sm text-black">
              H
            </span>
            haxon<span className="-ml-2 text-[#7b6cff]">.</span>recruit
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/40">
            A full-featured recruiting platform — 9 modules, 24 pages, zero
            backend dependencies.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/35">
              {col.title}
            </p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-white/8 border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/30 sm:flex-row">
          <span>Haxon Recruit — a product demo.</span>
          <span>9 modules · 24 pages · 180+ features · 0 backend deps</span>
        </div>
      </div>
    </footer>
  )
}
