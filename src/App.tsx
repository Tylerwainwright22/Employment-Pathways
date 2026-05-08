import { useAppState } from './hooks/useAppState'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './components/dashboard/Dashboard'
import { PhaseView } from './components/phase/PhaseView'
import { PHASES } from './data/phases'

export function App() {
  const {
    appData,
    setRole,
    setActivePhase,
    toggleChecklistItem,
    updateDocField,
    getPhaseProgress,
  } = useAppState()

  const activePhase = appData.activePhase
    ? PHASES.find((p) => p.id === appData.activePhase)
    : null

  return (
    <AppShell currentRole={appData.currentRole} onRoleChange={setRole}>
      {activePhase ? (
        <PhaseView
          key={activePhase.id}
          phase={activePhase}
          phaseData={appData.phases[activePhase.id]}
          progress={getPhaseProgress(activePhase.id)}
          currentRole={appData.currentRole}
          onBack={() => setActivePhase(null)}
          onToggleChecklist={toggleChecklistItem}
          onUpdateDoc={updateDocField}
        />
      ) : (
        <Dashboard
          key="dashboard"
          getPhaseProgress={getPhaseProgress}
          onSelectPhase={setActivePhase}
        />
      )}
    </AppShell>
  )
}
