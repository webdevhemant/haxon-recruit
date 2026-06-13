export type Role =
  | 'admin'
  | 'recruiter'
  | 'hiring_manager'
  | 'interviewer'
  | 'applicant'

export type Permission =
  | 'dashboard.view'
  | 'jobs.view'
  | 'jobs.create'
  | 'jobs.edit'
  | 'candidates.view'
  | 'candidates.manage'
  | 'interviews.view'
  | 'interviews.schedule'
  | 'scorecards.submit'
  | 'offers.view'
  | 'offers.manage'
  | 'analytics.view'
  | 'messages.view'
  | 'settings.view'

export const ROLE_LABEL: Record<Role, string> = {
  admin: 'Admin',
  recruiter: 'Recruiter',
  hiring_manager: 'Hiring Manager',
  interviewer: 'Interviewer',
  applicant: 'Applicant',
}

export const ROLE_DESCRIPTION: Record<Role, string> = {
  admin: 'Full access to every module and settings.',
  recruiter: 'Runs the pipeline end to end, minus org settings.',
  hiring_manager: 'Reviews candidates and offers for their reqs.',
  interviewer: 'Interviews candidates and submits scorecards.',
  applicant: 'Sees only the public careers site.',
}

const ALL: Permission[] = [
  'dashboard.view',
  'jobs.view',
  'jobs.create',
  'jobs.edit',
  'candidates.view',
  'candidates.manage',
  'interviews.view',
  'interviews.schedule',
  'scorecards.submit',
  'offers.view',
  'offers.manage',
  'analytics.view',
  'messages.view',
  'settings.view',
]

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ALL,
  recruiter: [
    'dashboard.view',
    'jobs.view',
    'jobs.create',
    'jobs.edit',
    'candidates.view',
    'candidates.manage',
    'interviews.view',
    'interviews.schedule',
    'scorecards.submit',
    'offers.view',
    'offers.manage',
    'analytics.view',
    'messages.view',
  ],
  hiring_manager: [
    'dashboard.view',
    'jobs.view',
    'candidates.view',
    'candidates.manage',
    'interviews.view',
    'interviews.schedule',
    'scorecards.submit',
    'offers.view',
    'analytics.view',
    'messages.view',
  ],
  interviewer: [
    'dashboard.view',
    'candidates.view',
    'interviews.view',
    'scorecards.submit',
    'messages.view',
  ],
  applicant: [],
}

export const can = (role: Role, permission: Permission): boolean =>
  ROLE_PERMISSIONS[role].includes(permission)
