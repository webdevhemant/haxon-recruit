# Haxon Recruit

A full-featured recruiting platform (ATS) demo built entirely on **dummy data** — no
backend, no real auth, no APIs. It combines the best ideas from Ashby, Greenhouse and
Lever into one cohesive, fast, and beautifully designed product, powered by an
internally-consistent seeded dataset that persists to `localStorage`.

> Built as a portfolio piece. Everything is interactive and stateful, but runs 100%
> in the browser.

## Highlights

- **9 modules · 24+ routes**, from a marketing landing page to a deep admin back office.
- **Drag-and-drop pipeline** (dnd-kit), candidate profiles, scorecards, offers.
- **Analytics suite** with funnel, DEI and source reports (Recharts).
- **Role-based access control** with a built-in role switcher (see below).
- **Mock auth** (login / signup / forgot / reset) with a persisted current user.
- **Camera-based "Join call"** mock, profile photos, scroll/page animations.

## Tech stack

| Area        | Choice                                            |
| ----------- | ------------------------------------------------- |
| Framework   | Vite + React 19 + TypeScript                      |
| Styling     | Tailwind CSS v3 + shadcn/ui + design tokens       |
| State       | Zustand (+ `persist` to localStorage)             |
| Routing     | React Router v7 (lazy-loaded, code-split routes)  |
| Charts      | Recharts                                          |
| Drag & drop | @dnd-kit                                           |
| Forms       | React Hook Form + Zod                             |
| Motion      | Motion (Framer Motion)                            |
| Icons       | lucide-react                                      |

## Getting started

Requires **Node 22+** and **pnpm**.

```bash
pnpm install
pnpm dev        # start the dev server
pnpm build      # type-check + production build
pnpm format     # prettier
```

## Role-based access control (RBAC)

The app ships with five roles. Use the **avatar menu (top-right) → "Switch role (demo)"**
to instantly sign in as a named user for each role and watch the navigation, actions and
accessible routes change.

| Role              | Demo user      | Can do                                                                 |
| ----------------- | -------------- | --------------------------------------------------------------------- |
| **Admin**         | Alex Tran      | Everything, including org **Settings**.                               |
| **Recruiter**     | Priya Nair     | Full pipeline (jobs, candidates, interviews, offers, analytics). No settings. |
| **Hiring Manager**| James Okoro    | Review candidates, interviews and offers; no job creation/edit, no offer management, no settings. |
| **Interviewer**   | Elena Vasquez  | Dashboard, view candidates, view interviews, submit scorecards only. |
| **Applicant**     | Jordan Blake   | Only the public **Careers** site — redirected away from the internal app. |

Permissions are defined in [`src/lib/rbac.ts`](src/lib/rbac.ts) and enforced in three places:

1. **Navigation** — the sidebar only shows sections the role can access.
2. **Actions** — buttons (New job, Edit, Schedule, offer actions, candidate stage moves…)
   are hidden or disabled per permission. Table action menus stay visible but disable the
   options a role can't perform.
3. **Routes** — `AppLayout` redirects to an allowed page if a role opens a restricted URL,
   and sends applicants to the careers site.

## Project structure

```
src/
  app/               # router + global providers
  components/
    ui/              # shadcn primitives (kebab-case, library convention)
    common/          # shared building blocks (PageHeader, StatCard, UserAvatar, …)
    layout/          # app shell: sidebar, topbar, layouts
  hooks/             # usePermissions, …
  lib/               # types, rbac, routes, formatters, seed data
  modules/           # feature modules (landing, auth, dashboard, jobs,
                     # candidates, interviews, offers, analytics, careers, settings)
  stores/            # zustand stores (data + auth) and selectors
```

Authored files use **camelCase**; shadcn `components/ui/*` keep their kebab-case names.

## Seeded data

A deterministic generator ([`src/lib/data`](src/lib/data)) creates a consistent world:
Nexaflow Inc., 18 jobs, ~120 candidates, 45 interviews, scorecards, 8 offers and a 10-person
team — the same people appear across jobs, pipelines, scorecards and offers. Mutations
persist to `localStorage`; clearing storage resets to the seed.
