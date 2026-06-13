function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-display text-5xl font-extrabold tracking-tight">
        Haxon<span className="text-primary">.</span>Recruit
      </h1>
      <p className="text-muted-foreground">
        Foundation ready — Tailwind + design tokens wired up.
      </p>
      <button className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
        Explore
      </button>
    </div>
  )
}

export default App
