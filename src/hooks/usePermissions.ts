import { can, type Permission, type Role } from '@/lib/rbac'
import { useAuthStore } from '@/stores/useAuthStore'

export function useRole(): Role {
  return useAuthStore((s) => s.user?.role ?? 'applicant')
}

export function usePermissions() {
  const role = useRole()
  return {
    role,
    can: (permission: Permission) => can(role, permission),
  }
}
