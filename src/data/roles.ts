import type { StaffRole } from '../types'

export const STAFF_ROLES: { value: StaffRole; label: string }[] = [
  { value: 'job_coach',             label: 'Job Coach' },
  { value: 'job_developer',         label: 'Job Developer' },
  { value: 'employment_specialist', label: 'Employment Specialist' },
  { value: 'director_employment',   label: 'Director of Employment Services' },
  { value: 'isc_case_manager',      label: 'ISC Case Manager' },
  { value: 'other',                 label: 'Other' },
]

export function getRoleLabel(role: StaffRole): string {
  return STAFF_ROLES.find((r) => r.value === role)?.label ?? 'Unknown Role'
}
