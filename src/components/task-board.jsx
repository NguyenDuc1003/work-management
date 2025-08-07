import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Plus, MoreHorizontal, Calendar, AlertCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronDown, ChevronRight } from "lucide-react"

export function TaskBoard() {
  const { selectedDepartment, selectedTeam } = useOutletContext()
  const [expandedGroups, setExpandedGroups] = useState(["todo", "feature"])
  const [newTaskDialog, setNewTaskDialog] = useState(false)

  const taskGroups = [
    {
      id: "todo",
      name: "Cần làm",
      color: "blue",
      tasks: [
        {
          id: "1",
          title: "Thiết kế giao diện đăng nhập",
          status: "working",
          priority: "high",
          dueDate: "2024-01-21",
          assignee: { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
          department: "tech",
          team: "frontend",
          description: "Thiết kế và implement giao diện đăng nhập mới",
        },
        {
          id: "2",
          title: "Tối ưu database query",
          status: "done",
          priority: "medium",
          dueDate: "2024-01-22",
          assignee: { name: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32" },
          department: "tech",
          team: "backend",
          description: "Tối ưu các query chậm trong hệ thống",
        },
        {
          id: "3",
          title: "Viết content blog",
          status: "todo",
          priority: "low",
          dueDate: "2024-01-23",
          assignee: { name: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32" },
          department: "marketing",
          team: "content",
          description: "Viết 3 bài blog về sản phẩm mới",
        },
        {
          id: "4",
          title: "Lập trình chức năng margin",
          status: "expired",
          priority: "high",
          dueDate: "2024-01-19",
          assignee: { name: "Phạm Thị D", avatar: "/placeholder.svg?height=32&width=32" },
          department: "tech",
          team: "backend",
          description: "Lập trình chức năng tính toán margin",
        },
      ],
    },
    {
      id: "feature",
      name: "Tính năng mới",
      color: "green",
      tasks: [],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "working":
        return "bg-orange-500"
      case "done":
        return "bg-green-500"
      case "todo":
        return "bg-gray-500"
      case "expired":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "working":
        return "Đang làm"
      case "done":
        return "Hoàn thành"
      case "todo":
        return "Chờ làm"
      case "expired":
        return "Quá hạn"
      default:
        return "Chờ làm"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  const filteredTasks = (tasks) => {
    return tasks.filter((task) => {
      if (selectedDepartment === "all") return true
      if (selectedTeam === "all") return task.department === selectedDepartment
      return task.department === selectedDepartment && task.team === selectedTeam
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý công việc</h1>
          <p className="text-muted-foreground">
            {selectedDepartment === "all"
              ? "Tất cả phòng ban"
              : selectedTeam === "all"
                ? `Phòng ${selectedDepartment}`
                : `Nhóm ${selectedTeam}`}
          </p>
        </div>
        <Dialog open={newTaskDialog} onOpenChange={setNewTaskDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm công việc
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo công việc mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input id="title" placeholder="Nhập tiêu đề công việc" />
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea id="description" placeholder="Mô tả chi tiết công việc" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Độ ưu tiên</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn độ ưu tiên" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">Cao</SelectItem>
                      <SelectItem value="medium">Trung bình</SelectItem>
                      <SelectItem value="low">Thấp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Hạn hoàn thành</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="assignee">Người thực hiện</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn người thực hiện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Nguyễn Văn A</SelectItem>
                    <SelectItem value="user2">Trần Thị B</SelectItem>
                    <SelectItem value="user3">Lê Văn C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewTaskDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setNewTaskDialog(false)}>Tạo công việc</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {taskGroups.map((group) => {
          const tasks = filteredTasks(group.tasks)
          return (
            <Card key={group.id} className="overflow-hidden">
              <Collapsible open={expandedGroups.includes(group.id)} onOpenChange={() => toggleGroup(group.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {expandedGroups.includes(group.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <div className={`w-1 h-6 bg-${group.color}-500 rounded-full`} />
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <Badge variant="secondary">{tasks.length}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    {tasks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>Chưa có công việc nào</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Thêm công việc
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <Card key={task.id} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-medium">{task.title}</h3>
                                    <AlertCircle className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                                      <span>{getStatusText(task.status)}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <Calendar className="w-3 h-3" />
                                      <span>{task.dueDate}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Avatar className="w-5 h-5">
                                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                                        <AvatarFallback className="text-xs">
                                          {task.assignee.name.charAt(0)}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="text-muted-foreground">{task.assignee.name}</span>
                                    </div>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                    <DropdownMenuItem>Sao chép</DropdownMenuItem>
                                    <DropdownMenuItem>Giao cho người khác</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}

        <Button variant="outline" className="w-full bg-transparent">
          <Plus className="w-4 h-4 mr-2" />
          Thêm nhóm công việc mới
        </Button>
      </div>
    </div>
  )
}

export default TaskBoard
