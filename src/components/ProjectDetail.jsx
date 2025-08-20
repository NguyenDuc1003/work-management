// KanbanPage.jsx
import KanbanComponent from '../components/ui/kabanui.jsx';

export default function KanbanPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Project Kanban Board</h1>
      <KanbanComponent />
    </div>
  )
}
