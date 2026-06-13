import { Star, UserPlus } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Screening',
    count: 28,
    accent: '#7b6cff',
    cards: [
      { name: 'Olivia Patel', role: 'Brand Designer', initials: 'OP' },
      { name: 'Liam Nguyen', role: 'Staff Engineer', initials: 'LN' },
    ],
  },
  {
    title: 'Interview',
    count: 24,
    accent: '#3bd6ff',
    cards: [
      { name: 'Ethan Rivera', role: 'Head of Sales', initials: 'ER' },
      { name: 'Amara Cohen', role: 'Product Manager', initials: 'AC' },
    ],
  },
]

export function HeroMock() {
  return (
    <div className="lp-float relative">
      <div className="rounded-2xl border border-white/10 bg-[#0c0c11] shadow-[0_50px_120px_-30px_rgba(123,108,255,0.55)]">
        {/* window bar */}
        <div className="border-white/6 flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="bg-white/12 size-2.5 rounded-full" />
            <span className="bg-white/12 size-2.5 rounded-full" />
            <span className="bg-white/12 size-2.5 rounded-full" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            Senior Frontend Engineer
          </span>
          <span className="rounded-md bg-[#b7ff3b]/15 px-2 py-0.5 text-[10px] font-semibold text-[#b7ff3b]">
            Open
          </span>
        </div>

        {/* spotlight candidate */}
        <div className="border-white/6 flex items-center gap-3 border-b px-4 py-3.5">
          <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7b6cff] to-[#b7ff3b] text-xs font-bold text-black">
            NC
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white/90">
              Noah Carter
            </p>
            <p className="truncate text-xs text-white/45">
              Senior Frontend · LinkedIn
            </p>
          </div>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="size-3.5 fill-[#b7ff3b] text-[#b7ff3b]"
              />
            ))}
            <Star className="size-3.5 text-white/20" />
          </div>
        </div>

        {/* mini kanban */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {COLUMNS.map((col) => (
            <div key={col.title} className="rounded-xl bg-white/[0.02] p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-semibold text-white/70">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: col.accent }}
                  />
                  {col.title}
                </span>
                <span className="text-[10px] text-white/35">{col.count}</span>
              </div>
              <div className="flex flex-col gap-2">
                {col.cards.map((c) => (
                  <div
                    key={c.name}
                    className="border-white/6 rounded-lg border bg-[#131319] p-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-white/8 flex size-7 items-center justify-center rounded-full text-[10px] font-semibold text-white/80">
                        {c.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-white/90">
                          {c.name}
                        </p>
                        <p className="truncate text-[10px] text-white/40">
                          {c.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* footer stat strip */}
        <div className="divide-white/6 border-white/6 grid grid-cols-3 divide-x border-t">
          {[
            ['23d', 'Time to hire'],
            ['82%', 'Offer accept'],
            ['12.5%', 'Apply → hire'],
          ].map(([v, l]) => (
            <div key={l} className="px-3 py-3 text-center">
              <p className="font-display text-base font-bold text-white">{v}</p>
              <p className="text-[10px] uppercase tracking-wide text-white/35">
                {l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* floating accent chip */}
      <div className="absolute -bottom-5 -right-3 hidden items-center gap-2.5 rounded-xl border border-white/10 bg-[#0c0c11] px-3.5 py-2.5 shadow-2xl md:flex">
        <span className="flex size-8 items-center justify-center rounded-lg bg-[#b7ff3b]/15 text-[#b7ff3b]">
          <UserPlus className="size-4" />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] uppercase tracking-wide text-white/40">
            New applicants
          </p>
          <p className="text-xs font-semibold text-white/90">+12 this week</p>
        </div>
      </div>
    </div>
  )
}
