

import { useState } from "react"
import { Plus, Calendar, Clock, Flag, CheckCircle2, MoreHorizontal, Filter } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Checkbox } from "./ui/checkbox"

export function PersonalTasks() {
  const [newTaskDialog, setNewTaskDialog] = useState(false)
  const [filter, setFilter] = useState("all")

  const personalTasks = [
    {
      id: "1",
      title: "Hoàn thành báo cáo tuần",
      description: "Tổng hợp công việc đã làm trong tuần và kế hoạch tuần tới",
      priority: "high",
      status: "pending",
      dueDate: "2024-01-26",
      category: "work",
      completed: false,
      createdAt: "2024-01-20",
    },
    {
      id: "2",
      title: "Học React Native",
      description: "Hoàn thành khóa học React Native trên Udemy",
      priority: "medium",
      status: "in-progress",
      dueDate: "2024-02-15",
      category: "learning",
      completed: false,
      createdAt: "2024-01-18",
    },
    {
      id: "3",
      title: "Đặt lịch khám sức khỏe",
      description: "Đặt lịch khám sức khỏe định kỳ tại bệnh viện",
      priority: "low",
      status: "completed",
      dueDate: "2024-01-25",
      category: "personal",
      completed: true,
      createdAt: "2024-01-15",
    },
    {
      id: "4",
      title: "Chuẩn bị presentation",
      description: "Chuẩn bị slide cho buổi thuyết trình dự án mới",
      priority: "high",
      status: "pending",
      dueDate: "2024-01-28",
      category: "work",
      completed: false,
      createdAt: "2024-01-22",
    },
    {
      id: "5",
      title: "Đọc sách 'Clean Code'",
      description: "Đọc và ghi chú các chương quan trọng",
      priority: "medium",
      status: "in-progress",
      dueDate: "2024-02-10",
      category: "learning",
      completed: false,
      createdAt: "2024-01-10",
    },
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-500 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-500 bg-green-50 border-green-200"
      default:
        return "text-gray-500 bg-gray-50 border-gray-200"
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

  const getCategoryColor = (category) => {
    switch (category) {
      case "work":
        return "bg-blue-100 text-blue-800"
      case "personal":
        return "bg-purple-100 text-purple-800"
      case "learning":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryText = (category) => {
    switch (category) {
      case "work":
        return "Công việc"
      case "personal":
        return "Cá nhân"
      case "learning":
        return "Học tập"
      default:
        return "Khác"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "in-progress":
        return "Đang làm"
      case "pending":
        return "Chờ làm"
      default:
        return "Không xác định"
    }
  }

  const filteredTasks = personalTasks.filter((task) => {
    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "pending") return !task.completed && task.status === "pending"
    if (filter === "in-progress") return !task.completed && task.status === "in-progress"
    return true
  })

  const toggleTaskComplete = (taskId) => {
    // In a real app, this would update the task in the database
    console.log("Toggle task completion:", taskId)
  }

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !personalTasks.find((t) => t.dueDate === dueDate)?.completed
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Công việc cá nhân</h1>
          <p className="text-muted-foreground">Quản lý các công việc và mục tiêu cá nhân của bạn</p>
        </div>
        <Dialog open={newTaskDialog} onOpenChange={setNewTaskDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Thêm việc cần làm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo việc cần làm mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Tiêu đề</Label>
                <Input id="title" placeholder="Nhập tiêu đề công việc" />
              </div>
              <div>
                <Label htmlFor="description">Mô tả</Label>
                <Textarea id="description" placeholder="Mô tả chi tiết" />
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
                  <Label htmlFor="category">Danh mục</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Công việc</SelectItem>
                      <SelectItem value="personal">Cá nhân</SelectItem>
                      <SelectItem value="learning">Học tập</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="dueDate">Hạn hoàn thành</Label>
                <Input id="dueDate" type="date" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setNewTaskDialog(false)}>
                  Hủy
                </Button>
                <Button onClick={() => setNewTaskDialog(false)}>Tạo việc cần làm</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={filter} onValueChange={setFilter} className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="pending">Chờ làm</TabsTrigger>
            <TabsTrigger value="in-progress">Đang làm</TabsTrigger>
            <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Bộ lọc
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`hover:shadow-md transition-shadow ${task.completed ? "opacity-75" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskComplete(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <CardTitle className={`text-base ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                      {task.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
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
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge className={getCategoryColor(task.category)}>{getCategoryText(task.category)}</Badge>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  <Flag className="w-3 h-3 mr-1" />
                  {getPriorityText(task.priority)}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className={isOverdue(task.dueDate) ? "text-red-500 font-medium" : ""}>
                    {new Date(task.dueDate).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{getStatusText(task.status)}</span>
                </div>
              </div>

              {isOverdue(task.dueDate) && !task.completed && (
                <div className="flex items-center gap-1 text-xs text-red-500 bg-red-50 px-2 py-1 rounded">
                  <Flag className="w-3 h-3" />
                  Quá hạn
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Không có công việc nào</h3>
          <p className="text-muted-foreground mb-4">
            {filter === "completed" ? "Bạn chưa hoàn thành công việc nào" : "Hãy tạo công việc đầu tiên của bạn"}
          </p>
          <Button onClick={() => setNewTaskDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tạo việc cần làm
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{personalTasks.filter((t) => !t.completed).length}</div>
            <div className="text-sm text-muted-foreground">Việc cần làm</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{personalTasks.filter((t) => t.completed).length}</div>
            <div className="text-sm text-muted-foreground">Đã hoàn thành</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {personalTasks.filter((t) => isOverdue(t.dueDate) && !t.completed).length}
            </div>
            <div className="text-sm text-muted-foreground">Quá hạn</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PersonalTasks
