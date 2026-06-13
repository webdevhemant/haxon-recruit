import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Role } from '@/lib/rbac'

export interface AuthUser {
  id: string
  name: string
  email: string
  initials: string
  role: Role
}

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || 'U'

const nameFromEmail = (email: string) => {
  const handle = email.split('@')[0] ?? 'there'
  return handle
    .split(/[._-]+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ')
}

/** Named demo users — one per role — powering the role switcher. */
export const DEMO_USERS: AuthUser[] = [
  {
    id: 'u-admin',
    name: 'Alex Tran',
    email: 'alex@nexaflow.io',
    initials: 'AT',
    role: 'admin',
  },
  {
    id: 'u-recruiter',
    name: 'Priya Nair',
    email: 'priya@nexaflow.io',
    initials: 'PN',
    role: 'recruiter',
  },
  {
    id: 'u-manager',
    name: 'James Okoro',
    email: 'james@nexaflow.io',
    initials: 'JO',
    role: 'hiring_manager',
  },
  {
    id: 'u-interviewer',
    name: 'Elena Vasquez',
    email: 'elena@nexaflow.io',
    initials: 'EV',
    role: 'interviewer',
  },
  {
    id: 'u-applicant',
    name: 'Jordan Blake',
    email: 'jordan@example.com',
    initials: 'JB',
    role: 'applicant',
  },
]

const ADMIN = DEMO_USERS[0]

interface AuthState {
  user: AuthUser | null
  login: (email: string, name?: string) => void
  signup: (name: string, email: string) => void
  loginAs: (userId: string) => void
  updateProfile: (changes: { name: string; email: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: ADMIN,
      login: (email, name) =>
        set({
          user: {
            id: 'u-admin',
            email,
            name: name ?? nameFromEmail(email),
            initials: initials(name ?? nameFromEmail(email)),
            role: 'admin',
          },
        }),
      signup: (name, email) =>
        set({
          user: {
            id: 'u-applicant',
            name,
            email,
            initials: initials(name),
            role: 'applicant',
          },
        }),
      loginAs: (userId) =>
        set({ user: DEMO_USERS.find((u) => u.id === userId) ?? ADMIN }),
      updateProfile: ({ name, email }) =>
        set((s) =>
          s.user
            ? {
                user: {
                  ...s.user,
                  name,
                  email,
                  initials: initials(name),
                },
              }
            : s,
        ),
      logout: () => set({ user: null }),
    }),
    { name: 'haxon-recruit-auth', version: 2 },
  ),
)
