const COLUMNS = [
  {
    title: 'Applied',
    count: 35,
    cards: [
      { name: 'Noah Carter', role: 'Frontend Engineer', tone: 'a' },
      { name: 'Emma Bennett', role: 'Product Manager', tone: 'b' },
    ],
  },
  {
    title: 'Interview',
    count: 24,
    cards: [
      { name: 'Liam Nguyen', role: 'Staff Engineer', tone: 'c' },
      { name: 'Olivia Patel', role: 'Brand Designer', tone: 'a' },
    ],
  },
  {
    title: 'Offer',
    count: 8,
    cards: [{ name: 'Ethan Rivera', role: 'Head of Sales', tone: 'b' }],
  },
]

const TONES: Record<string, string> = {
  a: 'bg-[#7b6cff]',
  b: 'bg-[#b7ff3b]',
  c: 'bg-[#3bd6ff]',
}

export function HeroMock() {
  return (
    <div className="lp-float relative rounded-2xl border border-white/10 bg-[#0d0d11]/90 p-4 shadow-[0_40px_120px_-20px_rgba(123,108,255,0.45)] backdrop-blur">
      <div className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          Senior Frontend Engineer · Pipeline
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {COLUMNS.map((col) => (
          <div key={col.title} className="rounded-lg bg-white/[0.02] p-2.5">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <span className="text-[11px] font-semibold text-white/70">
                {col.title}
              </span>
              <span className="rounded-full bg-white/5 px-1.5 text-[10px] text-white/40">
                {col.count}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {col.cards.map((c) => (
                <div
                  key={c.name}
                  className="rounded-md border border-white/5 bg-[#121218] p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex size-6 items-center justify-center rounded-full text-[9px] font-bold text-black ${TONES[c.tone]}`}
                    >
                      {c.name
                        .split(' ')
                        .map((p) => p[0])
                        .join('')}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-white/90">
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
    </div>
  )
}
