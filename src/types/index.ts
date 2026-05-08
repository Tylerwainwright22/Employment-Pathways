export type PhaseId =
  | 'phase_1'
  | 'phase_2'
  | 'phase_3'
  | 'phase_4'
  | 'phase_5'
  | 'phase_6'

export type StaffRole =
  | 'job_coach'
  | 'job_developer'
  | 'employment_specialist'
  | 'director_employment'
  | 'isc_case_manager'
  | 'other'

export interface ChecklistItem {
  id: string
  label: string
  group?: string
}

export interface DocField {
  id: string
  label: string
  type: 'textarea' | 'text'
  placeholder: string
  rows?: number
}

export interface PhaseDefinition {
  id: PhaseId
  index: number
  label: string
  shortLabel: string
  timeline: string
  colorIndex: number
  lucideIcon: string
  checklist: ChecklistItem[]
  docs: DocField[]
}

export interface PhaseData {
  checklist: Record<string, boolean>
  docs: Record<string, string>
}

export interface AppData {
  version: number
  currentRole: StaffRole
  activePhase: PhaseId | null
  phases: Record<PhaseId, PhaseData>
}

export interface PhaseProgress {
  completed: number
  total: number
  percent: number
}
