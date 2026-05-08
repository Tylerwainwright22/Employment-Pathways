import type { AppData, PhaseId, StaffRole } from '../types'
import { PHASES } from '../data/phases'

export const STORAGE_KEY = 'bhw_career_pathways_v1'
export const SCHEMA_VERSION = 1

function buildEmptyPhaseData() {
  return { checklist: {}, docs: {} }
}

export function buildDefaultAppData(): AppData {
  const phases = {} as AppData['phases']
  for (const phase of PHASES) {
    phases[phase.id as PhaseId] = buildEmptyPhaseData()
  }
  return {
    version: SCHEMA_VERSION,
    currentRole: 'job_coach' as StaffRole,
    activePhase: null,
    phases,
  }
}

export function migrateData(raw: unknown): AppData {
  const defaults = buildDefaultAppData()

  if (!raw || typeof raw !== 'object') return defaults

  const data = raw as Partial<AppData>

  // Ensure all phases exist (handles adding new phases in future updates)
  const phases = { ...defaults.phases, ...(data.phases ?? {}) }

  return {
    version: SCHEMA_VERSION,
    currentRole: (data.currentRole as StaffRole) ?? defaults.currentRole,
    activePhase: (data.activePhase as PhaseId | null) ?? null,
    phases,
  }
}

export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return buildDefaultAppData()
    return migrateData(JSON.parse(raw))
  } catch {
    return buildDefaultAppData()
  }
}

export function saveAppData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage can throw when storage is full — fail silently
  }
}
