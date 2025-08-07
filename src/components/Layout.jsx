import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { PageTransition } from './PageTransition'

export default function Layout() {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedTeam, setSelectedTeam] = useState("all")
  const location = useLocation()

  // Get current active view from URL
  const activeView = location.pathname.replace('/', '') || 'tasks'

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        activeView={activeView}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        selectedTeam={selectedTeam}
        setSelectedTeam={setSelectedTeam}
      />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          <PageTransition>
            <Outlet context={{
              selectedDepartment,
              setSelectedDepartment,
              selectedTeam,
              setSelectedTeam
            }} />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
