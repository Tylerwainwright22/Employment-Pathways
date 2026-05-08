import { PhaseHeader } from './PhaseHeader'
import { ChecklistSection } from '../checklist/ChecklistSection'
import { DocSection } from '../documentation/DocSection'
import type { PhaseDefinition, PhaseData, PhaseProgress, PhaseId, StaffRole } from '../../types'

interface PhaseViewProps {
  phase: PhaseDefinition
  phaseData: PhaseData
  progress: PhaseProgress
  currentRole: StaffRole
  onBack: () => void
  onToggleChecklist: (phaseId: PhaseId, itemId: string) => void
  onUpdateDoc: (phaseId: PhaseId, fieldId: string, value: string) => void
}

export function PhaseView({
  phase,
  phaseData,
  progress,
  currentRole,
  onBack,
  onToggleChecklist,
  onUpdateDoc,
}: PhaseViewProps) {
  return (
    <div
      className="animate-fade-in-right"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
    >
      <PhaseHeader phase={phase} progress={progress} onBack={onBack} />

      <ChecklistSection
        items={phase.checklist}
        checkedMap={phaseData.checklist}
        colorIndex={phase.colorIndex}
        phaseId={phase.id}
        onToggle={onToggleChecklist}
      />

      <DocSection
        fields={phase.docs}
        docsMap={phaseData.docs}
        colorIndex={phase.colorIndex}
        phaseId={phase.id}
        currentRole={currentRole}
        onChange={onUpdateDoc}
      />
    </div>
  )
}
