import { useCallback } from 'react'
import type { AppData, PhaseId, StaffRole, PhaseProgress } from '../types'
import { PHASES } from '../data/phases'
import { loadAppData, saveAppData } from '../utils/storage'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'bhw_career_pathways_v1'

export function useAppState() {
  const [appData, setAppData] = useLocalStorage<AppData>(STORAGE_KEY, loadAppData())

  const update = useCallback(
    (updater: (prev: AppData) => AppData) => {
      setAppData((prev) => {
        const next = updater(prev)
        saveAppData(next)
        return next
      })
    },
    [setAppData],
  )

  const setRole = useCallback(
    (role: StaffRole) => {
      update((prev) => ({ ...prev, currentRole: role }))
    },
    [update],
  )

  const setActivePhase = useCallback(
    (phase: PhaseId | null) => {
      update((prev) => ({ ...prev, activePhase: phase }))
    },
    [update],
  )

  const toggleChecklistItem = useCallback(
    (phaseId: PhaseId, itemId: string) => {
      update((prev) => ({
        ...prev,
        phases: {
          ...prev.phases,
          [phaseId]: {
            ...prev.phases[phaseId],
            checklist: {
              ...prev.phases[phaseId].checklist,
              [itemId]: !prev.phases[phaseId].checklist[itemId],
            },
          },
        },
      }))
    },
    [update],
  )

  const updateDocField = useCallback(
    (phaseId: PhaseId, fieldId: string, value: string) => {
      update((prev) => ({
        ...prev,
        phases: {
          ...prev.phases,
          [phaseId]: {
            ...prev.phases[phaseId],
            docs: {
              ...prev.phases[phaseId].docs,
              [fieldId]: value,
            },
          },
        },
      }))
    },
    [update],
  )

  const getPhaseProgress = useCallback(
    (phaseId: PhaseId): PhaseProgress => {
      const phase = PHASES.find((p) => p.id === phaseId)
      if (!phase) return { completed: 0, total: 0, percent: 0 }
      const total = phase.checklist.length
      const checklistData = appData.phases[phaseId]?.checklist ?? {}
      const completed = phase.checklist.filter((item) => checklistData[item.id]).length
      return {
        completed,
        total,
        percent: total === 0 ? 0 : Math.round((completed / total) * 100),
      }
    },
    [appData.phases],
  )

  const resetPhase = useCallback(
    (phaseId: PhaseId) => {
      update((prev) => ({
        ...prev,
        phases: {
          ...prev.phases,
          [phaseId]: { checklist: {}, docs: {} },
        },
      }))
    },
    [update],
  )

  return {
    appData,
    setRole,
    setActivePhase,
    toggleChecklistItem,
    updateDocField,
    getPhaseProgress,
    resetPhase,
  }
}
