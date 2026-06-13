import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  name: string
  email: string
  initials: string
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

const DEMO_USER: AuthUser = {
  name: 'Alex Tran',
  email: 'alex@nexaflow.io',
  initials: 'AT',
}

interface AuthState {
  user: AuthUser | null
  login: (email: string, name?: string) => void
  signup: (name: string, email: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: DEMO_USER,
      login: (email, name) =>
        set({
          user: {
            email,
            name: name ?? nameFromEmail(email),
            initials: initials(name ?? nameFromEmail(email)),
          },
        }),
      signup: (name, email) =>
        set({ user: { name, email, initials: initials(name) } }),
      logout: () => set({ user: null }),
    }),
    { name: 'haxon-recruit-auth', version: 1 },
  ),
)
