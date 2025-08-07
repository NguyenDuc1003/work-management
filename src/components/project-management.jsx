

import { useState } from "react"
import { Plus, Calendar, BarChart3, CheckCircle2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Progress } from "./ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { withLoading } from "./LoadingWrapper"

function ProjectManagementBase() {
  const [newProjectDialog, setNewProjectDialog] = useState(false)

  const projects = [
    {
      id: "1",
      name: "Hệ thống quản lý nhân sự",
      description: "Phát triển hệ thống quản lý nhân sự toàn diện cho công ty",
      status: "in-progress",
      priority: "high",
      progress: 65,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      department: "Công nghệ",
      manager: { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
      team: [
        { name: "Trần Thị B", role: "Frontend Dev", avatar: "/placeholder.svg?height=24&width=24" },
        { name: "Lê Văn C", role: "Backend Dev", avatar: "/placeholder.svg?height=24&width=24" },
        { name: "Phạm Thị D", role: "UI/UX Designer", avatar: "/placeholder.svg?height=24&width=24" },
      ],
      tasks: { total: 45, completed: 29, inProgress: 12, pending: 4 },
    },
    {
      id: "2",
      name: "Chiến dịch marketing Q1",
      description: "Triển khai chiến dịch marketing tổng thể cho quý 1",
      status: "planning",
      priority: "medium",
      progress: 25,
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      department: "Marketing",
      manager: { name: "Hoàng Thị E", avatar: "/placeholder.svg?height=32&width=32" },
      team: [
        { name: "Vũ Văn F", role: "Digital Marketing", avatar: "/placeholder.svg?height=24&width=24" },
        { name: "Đỗ Thị G", role: "Content Writer", avatar: "/placeholder.svg?height=24&width=24" },
      ],
      tasks: { total: 30, completed: 8, inProgress: 15, pending: 7 },
    },
    {
      id: "3",
      name: "Mở rộng thị trường miền Nam",
      description: "Kế hoạch mở rộng kinh doanh tại các tỉnh miền Nam",
      status: "completed",
      priority: "high",
      progress: 100,
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      department: "Kinh doanh",
      manager: { name: "Lý Thị I", avatar: "/placeholder.svg?height=32&width=32" },
      team: [
        { name: "Cao Văn J", role: "Sales Manager", avatar: "/placeholder.svg?height=24&width=24" },
        { name: "Đinh Thị K", role: "Business Dev", avatar: "/placeholder.svg?height=24&width=24" },
      ],
      tasks: { total: 25, completed: 25, inProgress: 0, pending: 0 },
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "planning":
        return "bg-yellow-500"
      case "on-hold":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "in-progress":
        return "Đang thực hiện"
      case "planning":
        return "Lên kế hoạch"
      case "on-hold":
        return "Tạm dừng"
      default:
        return "Không xác định"
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

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "Cao"
      case "medium":
        return "Trung bình"
      case "low":
        return "Thấp"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý dự án</h1>
          <p className="text-muted-foreground">Theo dõi và quản lý các dự án của công ty</p>
        </div>
        <Dialog open={newProjectDialog} onOpenChange={setNewProjectDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo dự án
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tạo dự án mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectName">Tên dự án</Label>
                  <Input id="projectName" placeholder="Nhập tên dự án" />
                </div>
                <div>
                  <Label htmlFor="department">Phòng ban</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phòng ban" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Công nghệ</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Kinh doanh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Mô tả dự án</Label>
                <Textarea id="description" placeholder="Mô tả chi tiết về dự án" />
              </div>
              <div className="grid grid-cols-3 gap-4">
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
                  <Label htmlFor="startDate">Ngày bắt đầu</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="endDate">Ngày kết thúc</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="manager">Quản lý dự án</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn quản lý dự án" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Nguyễn Văn A</SelectItem>
                    <SelectItem value="user2">Trần Thị B</SelectItem>
                    <SelectItem value="user3">Lê Văn C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewProjectDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setNewProjectDialog(false)}>Tạo dự án</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="in-progress">Đang thực hiện</TabsTrigger>
          <TabsTrigger value="planning">Lên kế hoạch</TabsTrigger>
          <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                      <Badge variant="outline" className={getPriorityColor(project.priority)}>
                        {getPriorityText(project.priority)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>{getStatusText(project.status)}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BarChart3 className="w-3 h-3" />
                      <span>{project.department}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={project.manager.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{project.manager.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">PM: {project.manager.name}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Thành viên</span>
                      <Badge variant="secondary">{project.team.length}</Badge>
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 4).map((member, index) => (
                        <Avatar key={index} className="w-8 h-8 border-2 border-background">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 4 && (
                        <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                          +{project.team.length - 4}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div>
                      <div className="font-semibold text-green-600">{project.tasks.completed}</div>
                      <div className="text-muted-foreground">Hoàn thành</div>
                    </div>
                    <div>
                      <div className="font-semibold text-blue-600">{project.tasks.inProgress}</div>
                      <div className="text-muted-foreground">Đang làm</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-600">{project.tasks.pending}</div>
                      <div className="text-muted-foreground">Chờ làm</div>
                    </div>
                    <div>
                      <div className="font-semibold">{project.tasks.total}</div>
                      <div className="text-muted-foreground">Tổng cộng</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.status === "in-progress")
              .map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tiến độ</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="planning">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.status === "planning")
              .map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="text-yellow-600">
                      Đang lên kế hoạch
                    </Badge>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects
              .filter((p) => p.status === "completed")
              .map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Hoàn thành</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export const ProjectManagement = withLoading(ProjectManagementBase, 'Quản lý Dự án')
export default ProjectManagement
