

import { useState } from "react"
import { Plus, MoreHorizontal, Building2 } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Progress } from "./ui/progress"
import { withLoading } from "./LoadingWrapper"

function DepartmentManagementBase() {
  const [newDepartmentDialog, setNewDepartmentDialog] = useState(false)
  const [newTeamDialog, setNewTeamDialog] = useState(false)

  const departments = [
    {
      id: "tech",
      name: "Phòng Công nghệ",
      description: "Phát triển và bảo trì các sản phẩm công nghệ",
      manager: { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32" },
      employeeCount: 12,
      activeProjects: 5,
      completedTasks: 89,
      totalTasks: 120,
      teams: [
        { id: "frontend", name: "Frontend", members: 5, lead: "Trần Thị B" },
        { id: "backend", name: "Backend", members: 4, lead: "Lê Văn C" },
        { id: "mobile", name: "Mobile", members: 3, lead: "Phạm Thị D" },
      ],
    },
    {
      id: "marketing",
      name: "Phòng Marketing",
      description: "Quảng bá thương hiệu và sản phẩm",
      manager: { name: "Hoàng Thị E", avatar: "/placeholder.svg?height=32&width=32" },
      employeeCount: 8,
      activeProjects: 3,
      completedTasks: 45,
      totalTasks: 60,
      teams: [
        { id: "digital", name: "Digital Marketing", members: 3, lead: "Vũ Văn F" },
        { id: "content", name: "Content", members: 2, lead: "Đỗ Thị G" },
        { id: "design", name: "Design", members: 3, lead: "Bùi Văn H" },
      ],
    },
    {
      id: "sales",
      name: "Phòng Kinh doanh",
      description: "Bán hàng và chăm sóc khách hàng",
      manager: { name: "Lý Thị I", avatar: "/placeholder.svg?height=32&width=32" },
      employeeCount: 10,
      activeProjects: 4,
      completedTasks: 67,
      totalTasks: 85,
      teams: [
        { id: "b2b", name: "B2B Sales", members: 4, lead: "Cao Văn J" },
        { id: "b2c", name: "B2C Sales", members: 3, lead: "Đinh Thị K" },
        { id: "support", name: "Customer Support", members: 3, lead: "Hồ Văn L" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý phòng ban</h1>
          <p className="text-muted-foreground">Quản lý cơ cấu tổ chức và nhóm làm việc</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={newTeamDialog} onOpenChange={setNewTeamDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Thêm nhóm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tạo nhóm mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="teamName">Tên nhóm</Label>
                  <Input id="teamName" placeholder="Nhập tên nhóm" />
                </div>
                <div>
                  <Label htmlFor="teamDescription">Mô tả</Label>
                  <Textarea id="teamDescription" placeholder="Mô tả về nhóm" />
                </div>
                <div>
                  <Label htmlFor="teamLead">Trưởng nhóm</Label>
                  <Input id="teamLead" placeholder="Chọn trưởng nhóm" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setNewTeamDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={() => setNewTeamDialog(false)}>Tạo nhóm</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={newDepartmentDialog} onOpenChange={setNewDepartmentDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Thêm phòng ban
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Tạo phòng ban mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="deptName">Tên phòng ban</Label>
                  <Input id="deptName" placeholder="Nhập tên phòng ban" />
                </div>
                <div>
                  <Label htmlFor="deptDescription">Mô tả</Label>
                  <Textarea id="deptDescription" placeholder="Mô tả về phòng ban" />
                </div>
                <div>
                  <Label htmlFor="deptManager">Trưởng phòng</Label>
                  <Input id="deptManager" placeholder="Chọn trưởng phòng" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setNewDepartmentDialog(false)}>
                    Hủy
                  </Button>
                  <Button onClick={() => setNewDepartmentDialog(false)}>Tạo phòng ban</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{dept.description}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem>Thêm nhóm</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={dept.manager.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">{dept.manager.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">Trưởng phòng: {dept.manager.name}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="font-semibold text-blue-600">{dept.employeeCount}</div>
                  <div className="text-xs text-muted-foreground">Nhân viên</div>
                </div>
                <div>
                  <div className="font-semibold text-green-600">{dept.activeProjects}</div>
                  <div className="text-xs text-muted-foreground">Dự án</div>
                </div>
                <div>
                  <div className="font-semibold text-orange-600">{dept.teams.length}</div>
                  <div className="text-xs text-muted-foreground">Nhóm</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Tiến độ công việc</span>
                  <span>{Math.round((dept.completedTasks / dept.totalTasks) * 100)}%</span>
                </div>
                <Progress value={(dept.completedTasks / dept.totalTasks) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {dept.completedTasks}/{dept.totalTasks} công việc hoàn thành
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Các nhóm</h4>
                <div className="space-y-1">
                  {dept.teams.map((team) => (
                    <div key={team.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                      <div>
                        <div className="text-sm font-medium">{team.name}</div>
                        <div className="text-xs text-muted-foreground">Trưởng nhóm: {team.lead}</div>
                      </div>
                      <Badge variant="secondary">{team.members}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export const DepartmentManagement = withLoading(DepartmentManagementBase, 'Quản lý Phòng ban')
export default DepartmentManagement
