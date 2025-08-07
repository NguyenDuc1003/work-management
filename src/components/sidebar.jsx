import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Building2,
  Users,
  FolderKanban,
  CheckSquare,
  Settings,
  ChevronDown,
  ChevronRight,
  Plus,
  MessageCircle,
  User,
  Shield,
} from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { Badge } from "./ui/badge"
import { useThrottle } from "../hooks/useDebounce"

export function Sidebar({
  activeView,
  selectedDepartment,
  setSelectedDepartment,
  selectedTeam,
  setSelectedTeam,
}) {
  const [expandedDepts, setExpandedDepts] = useState(["tech", "marketing"])
  const navigate = useNavigate()
  const location = useLocation()

  const departments = [
    {
      id: "tech",
      name: "Công nghệ",
      teams: [
        { id: "frontend", name: "Frontend", members: 5 },
        { id: "backend", name: "Backend", members: 4 },
        { id: "mobile", name: "Mobile", members: 3 },
      ],
    },
    {
      id: "marketing",
      name: "Marketing",
      teams: [
        { id: "digital", name: "Digital Marketing", members: 3 },
        { id: "content", name: "Content", members: 2 },
      ],
    },
    {
      id: "sales",
      name: "Kinh doanh",
      teams: [
        { id: "b2b", name: "B2B Sales", members: 4 },
        { id: "b2c", name: "B2C Sales", members: 3 },
      ],
    },
  ]

  const menuItems = [
    { id: "tasks", label: "Công việc", icon: CheckSquare, path: "/app/tasks" },
    { id: "personal", label: "Việc cá nhân", icon: User, path: "/app/personal" },
    { id: "demo", label: "Việc cá nhân cần làm", icon: User, path: "/app/personalDemo" },
    { id: "projects", label: "Dự án", icon: FolderKanban, path: "/app/projects" },
    { id: "chat", label: "Chat", icon: MessageCircle, path: "/app/chat" },
    { id: "employees", label: "Nhân viên", icon: Users, path: "/app/employees" },
    { id: "departments", label: "Phòng ban", icon: Building2, path: "/app/departments" },
    { id: "role-permission", label: "Phân quyền", icon: Shield, path: "/app/role-permission" },
    { id: "settings", label: "Cài đặt", icon: Settings, path: "/app/settings" },
  ]

  const toggleDepartment = (deptId) => {
    setExpandedDepts((prev) => (prev.includes(deptId) ? prev.filter((id) => id !== deptId) : [...prev, deptId]))
  }

  // Throttle navigation để tránh click nhanh và page overlap
  const throttledNavigate = useThrottle((path) => {
    if (location.pathname !== path) {
      navigate(path)
    }
  }, 500) // Tăng lên 500ms để đảm bảo page isolation

  const handleMenuClick = (item) => {
    throttledNavigate(item.path)
  }

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">TakaIT</h1>
            <p className="text-sm text-muted-foreground">Quản lý công việc</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={location.pathname === item.path ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => handleMenuClick(item)}
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">PHÒNG BAN & NHÓM</h3>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <div className="space-y-1">
            <Button
              variant={selectedDepartment === "all" ? "secondary" : "ghost"}
              className="w-full justify-start text-sm"
              onClick={() => {
                setSelectedDepartment("all")
                setSelectedTeam("all")
              }}
            >
              Tất cả phòng ban
            </Button>

            {departments.map((dept) => (
              <div key={dept.id}>
                <Collapsible open={expandedDepts.includes(dept.id)} onOpenChange={() => toggleDepartment(dept.id)}>
                  <div className="flex items-center">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="flex-1 justify-start text-sm p-2">
                        {expandedDepts.includes(dept.id) ? (
                          <ChevronDown className="w-3 h-3 mr-1" />
                        ) : (
                          <ChevronRight className="w-3 h-3 mr-1" />
                        )}
                        {dept.name}
                      </Button>
                    </CollapsibleTrigger>
                    <Button
                      size="sm"
                      variant={selectedDepartment === dept.id ? "secondary" : "ghost"}
                      className="h-8 px-2"
                      onClick={() => {
                        setSelectedDepartment(dept.id)
                        setSelectedTeam("all")
                      }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {dept.teams.reduce((acc, team) => acc + team.members, 0)}
                      </Badge>
                    </Button>
                  </div>
                  <CollapsibleContent className="ml-4 space-y-1">
                    {dept.teams.map((team) => (
                      <Button
                        key={team.id}
                        variant={selectedTeam === team.id ? "secondary" : "ghost"}
                        className="w-full justify-between text-sm py-1 h-8"
                        onClick={() => {
                          setSelectedDepartment(dept.id)
                          setSelectedTeam(team.id)
                        }}
                      >
                        <span>{team.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {team.members}
                        </Badge>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
