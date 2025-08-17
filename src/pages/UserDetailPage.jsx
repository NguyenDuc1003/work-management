"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Progress } from "../components/ui/progress"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Briefcase,
  Edit,
  MoreHorizontal,
  Building,
  Clock,
  User,
  CheckCircle,
  Circle,
  AlertCircle,
  Target,
  TrendingUp,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"

// Mock employee data based on the JSON structure
const employeeData = {
  id: 13,
  userName: "johndoe",
  email: "johndoe@example.com",
  avatar: "/professional-headshot.png",
  telephone: "0987654321",
  position: "Developer",
  bio: "Lập trình viên backend",
  address: "123 Nguyễn Văn Linh, Hà Nội",
  fullName: "John Doe",
  status: "ACTIVE",
  firstName: "John",
  lastName: "Doe",
  updatedAt: "2025-08-17T20:25:54",
  departmentId: 1,
  departmentName: "Phòng Kinh Doanh",
  userTeam: [
    {
      id: 1,
      teamName: "Backend",
    },
    {
      id: 2,
      teamName: "Backend-Frontend",
    },
  ],
  calendarEvents: [
    { id: 1, title: "Hoạt động - Thời gian", category: "activity", color: "bg-purple-500", date: "2022-04-01" },
    { id: 2, title: "Công việc - Ngày giờ tổ chức", category: "work", color: "bg-orange-500", date: "2022-04-02" },
    { id: 3, title: "Cá hội - Ngày chốt dự án", category: "opportunity", color: "bg-blue-500", date: "2022-04-03" },
    { id: 4, title: "Người liên hệ", category: "contact", color: "bg-red-500", date: "2022-04-04" },
    {
      id: 5,
      title: "Người liên hệ - Ngày sinh",
      category: "contact-birthday",
      color: "bg-green-500",
      date: "2022-04-05",
    },
    { id: 6, title: "Hóa đơn - Ngày thu đủ", category: "invoice", color: "bg-pink-500", date: "2022-04-06" },
    {
      id: 7,
      title: "Tác vụ dự án - Ngày bắt đầu",
      category: "project-task",
      color: "bg-emerald-600",
      date: "2022-04-07",
    },
    { id: 8, title: "Hợp đồng - Ngày hết hạn", category: "contract", color: "bg-yellow-500", date: "2022-04-08" },
    { id: 9, title: "Lê Xuân Nhã", name: "Lê Xuân Nhã", category: "person", color: "bg-green-400", date: "2022-04-04" },
    {
      id: 10,
      title: "Nguyễn Tiến Trung",
      name: "Nguyễn Tiến Trung",
      category: "person",
      color: "bg-green-400",
      date: "2022-04-05",
    },
    {
      id: 11,
      title: "Nguyễn Thị Bích Thủy",
      name: "Nguyễn Thị Bích Thủy",
      category: "person",
      color: "bg-green-400",
      date: "2022-04-06",
    },
    {
      id: 12,
      title: "Shi Thi Chính",
      name: "Shi Thi Chính",
      category: "person",
      color: "bg-blue-400",
      date: "2022-04-07",
    },
    {
      id: 13,
      title: "Nguyễn Thị Hương",
      name: "Nguyễn Thị Hương",
      category: "person",
      color: "bg-green-400",
      date: "2022-04-08",
    },
    {
      id: 14,
      title: "Nguyễn Ngọc Phú",
      name: "Nguyễn Ngọc Phú",
      category: "person",
      color: "bg-green-400",
      date: "2022-04-09",
    },
    {
      id: 15,
      title: "Trần Quốc Hoàn",
      name: "Trần Quốc Hoàn",
      category: "person",
      color: "bg-green-400",
      date: "2022-04-10",
    },
  ],
  schedule: [
    {
      id: 1,
      date: "2025-08-18",
      dayOfWeek: "Thứ 2",
      shifts: [
        { startTime: "08:00", endTime: "12:00", type: "morning", status: "scheduled" },
        { startTime: "13:00", endTime: "17:00", type: "afternoon", status: "scheduled" },
      ],
      totalHours: 8,
      status: "scheduled",
    },
    {
      id: 2,
      date: "2025-08-19",
      dayOfWeek: "Thứ 3",
      shifts: [
        { startTime: "08:00", endTime: "12:00", type: "morning", status: "completed" },
        { startTime: "13:00", endTime: "17:00", type: "afternoon", status: "completed" },
      ],
      totalHours: 8,
      status: "completed",
    },
    {
      id: 3,
      date: "2025-08-20",
      dayOfWeek: "Thứ 4",
      shifts: [
        { startTime: "08:00", endTime: "12:00", type: "morning", status: "completed" },
        { startTime: "13:00", endTime: "17:00", type: "afternoon", status: "in-progress" },
      ],
      totalHours: 8,
      status: "in-progress",
    },
    {
      id: 4,
      date: "2025-08-21",
      dayOfWeek: "Thứ 5",
      shifts: [
        { startTime: "08:00", endTime: "12:00", type: "morning", status: "scheduled" },
        { startTime: "13:00", endTime: "17:00", type: "afternoon", status: "scheduled" },
      ],
      totalHours: 8,
      status: "scheduled",
    },
    {
      id: 5,
      date: "2025-08-22",
      dayOfWeek: "Thứ 6",
      shifts: [
        { startTime: "08:00", endTime: "12:00", type: "morning", status: "scheduled" },
        { startTime: "13:00", endTime: "17:00", type: "afternoon", status: "scheduled" },
      ],
      totalHours: 8,
      status: "scheduled",
    },
    {
      id: 6,
      date: "2025-08-23",
      dayOfWeek: "Thứ 7",
      shifts: [],
      totalHours: 0,
      status: "off",
    },
    {
      id: 7,
      date: "2025-08-24",
      dayOfWeek: "Chủ nhật",
      shifts: [],
      totalHours: 0,
      status: "off",
    },
  ],
  tasks: [
    {
      id: 1,
      title: "API Authentication System",
      description: "Phát triển hệ thống xác thực API cho ứng dụng mobile",
      status: "completed",
      progress: 100,
      priority: "high",
      dueDate: "2025-08-15",
      completedDate: "2025-08-14",
      estimatedHours: 40,
      actualHours: 38,
    },
    {
      id: 2,
      title: "Database Optimization",
      description: "Tối ưu hóa truy vấn database và cải thiện hiệu suất",
      status: "in-progress",
      progress: 75,
      priority: "medium",
      dueDate: "2025-08-25",
      estimatedHours: 32,
      actualHours: 24,
    },
    {
      id: 3,
      title: "User Management Module",
      description: "Xây dựng module quản lý người dùng với đầy đủ CRUD operations",
      status: "in-progress",
      progress: 45,
      priority: "high",
      dueDate: "2025-09-01",
      estimatedHours: 50,
      actualHours: 22,
    },
    {
      id: 4,
      title: "Code Review & Documentation",
      description: "Review code và viết tài liệu kỹ thuật cho các module đã hoàn thành",
      status: "pending",
      progress: 0,
      priority: "low",
      dueDate: "2025-09-10",
      estimatedHours: 16,
      actualHours: 0,
    },
  ],
  projects: [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "Phát triển nền tảng thương mại điện tử",
      progress: 68,
      status: "in-progress",
      startDate: "2025-07-01",
      endDate: "2025-10-15",
      tasksCompleted: 15,
      totalTasks: 22,
    },
    {
      id: 2,
      name: "Mobile App Backend",
      description: "Backend API cho ứng dụng mobile",
      progress: 90,
      status: "near-completion",
      startDate: "2025-06-15",
      endDate: "2025-08-30",
      tasksCompleted: 18,
      totalTasks: 20,
    },
  ],
}

const calendarCategories = [
  { id: "activity", name: "Hoạt động - Thời gian", color: "bg-purple-500", checked: true },
  { id: "work", name: "Công việc - Ngày giờ tổ chức", color: "bg-orange-500", checked: true },
  { id: "opportunity", name: "Cá hội - Ngày chốt dự án", color: "bg-blue-500", checked: true },
  { id: "contact", name: "Người liên hệ", color: "bg-red-500", checked: true },
  { id: "contact-birthday", name: "Người liên hệ - Ngày sinh", color: "bg-green-500", checked: true },
  { id: "invoice", name: "Hóa đơn - Ngày thu đủ", color: "bg-pink-500", checked: true },
  { id: "project-task", name: "Tác vụ dự án - Ngày bắt đầu", color: "bg-emerald-600", checked: true },
  { id: "contract", name: "Hợp đồng - Ngày hết hạn", color: "bg-yellow-500", checked: true },
]

export default function EmployeeDetail() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [calendarView, setCalendarView] = useState("month")
  const [currentDate, setCurrentDate] = useState(new Date(2022, 3, 1)) // April 2022 to match the image
  const [selectedCategories, setSelectedCategories] = useState(calendarCategories.map((cat) => cat.id))

  const [editFormData, setEditFormData] = useState({
    fullName: employeeData.fullName,
    email: employeeData.email,
    telephone: employeeData.telephone,
    position: employeeData.position,
    bio: employeeData.bio,
    address: employeeData.address,
    status: employeeData.status,
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200"
      case "INACTIVE":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTaskStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTaskIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "in-progress":
        return <AlertCircle className="h-5 w-5 text-blue-600" />
      case "pending":
        return <Circle className="h-5 w-5 text-yellow-600" />
      default:
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getScheduleStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheduled":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "off":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getShiftStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "scheduled":
        return "bg-gray-300"
      default:
        return "bg-gray-200"
    }
  }

  const handleEditFormChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveEdit = () => {
    console.log("[v0] Saving employee data:", editFormData)
    setIsEditDialogOpen(false)
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const getEventsForDate = (date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
    return employeeData.calendarEvents.filter(
      (event) => event.date === dateStr && selectedCategories.includes(event.category),
    )
  }

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const events = getEventsForDate(date)
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

      days.push(
        <div
          key={day}
          className={`h-24 border border-gray-200 p-1 ${isWeekend ? "bg-gray-50" : "bg-white"} overflow-hidden`}
        >
          <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
          <div className="space-y-1">
            {events.slice(0, 2).map((event, index) => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded text-white truncate ${event.color}`}
                title={event.title}
              >
                {event.name || event.title}
              </div>
            ))}
            {events.length > 2 && <div className="text-xs text-gray-500">+{events.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
  <div className="mx-auto p-0 w-full">
      {/* Header Section */}
      <div className="mb-2">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={employeeData.avatar || "/placeholder.svg"} alt={employeeData.fullName} />
                  <AvatarFallback className="text-xl font-bold bg-primary text-primary-foreground">
                    {employeeData.firstName[0]}
                    {employeeData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">{employeeData.fullName}</h1>
                    <Badge className={`${getStatusColor(employeeData.status)} font-medium`}>
                      {employeeData.status === "ACTIVE" ? "Đang hoạt động" : "Không hoạt động"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{employeeData.position}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>{employeeData.departmentName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>ID: {employeeData.id}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 lg:text-right">
                <div className="flex flex-col lg:items-end gap-3">
                  <div className="flex flex-wrap gap-2">
                    {employeeData.userTeam.map((team) => (
                      <Badge key={team.id} variant="secondary" className="bg-accent/20 text-accent-foreground">
                        {team.teamName}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground max-w-md">{employeeData.bio}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Cập nhật: {new Date(employeeData.updatedAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 lg:w-auto lg:grid-cols-7">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="tasks">Công việc</TabsTrigger>
          <TabsTrigger value="projects">Dự án</TabsTrigger>
          <TabsTrigger value="schedule">Lịch làm việc</TabsTrigger>
          <TabsTrigger value="contact">Liên hệ</TabsTrigger>
          <TabsTrigger value="teams">Nhóm</TabsTrigger>
          <TabsTrigger value="activity">Hoạt động</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {employeeData.tasks.filter((task) => task.status === "completed").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Công việc hoàn thành</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <AlertCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {employeeData.tasks.filter((task) => task.status === "in-progress").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Đang thực hiện</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {Math.round(
                        employeeData.tasks.reduce((acc, task) => acc + task.progress, 0) / employeeData.tasks.length,
                      )}
                      %
                    </p>
                    <p className="text-sm text-muted-foreground">Hiệu suất trung bình</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{employeeData.projects.length}</p>
                    <p className="text-sm text-muted-foreground">Dự án tham gia</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tasks and Projects */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Công việc gần đây
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {employeeData.tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    {getTaskIcon(task.status)}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={task.progress} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground">{task.progress}%</span>
                      </div>
                    </div>
                    <Badge className={`${getTaskStatusColor(task.status)} text-xs`}>
                      {task.status === "completed" ? "Hoàn thành" : task.status === "in-progress" ? "Đang làm" : "Chờ"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Dự án đang tham gia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {employeeData.projects.map((project) => (
                  <div key={project.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <Badge variant="secondary">
                        {project.status === "in-progress" ? "Đang thực hiện" : "Sắp hoàn thành"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Tiến độ</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {project.tasksCompleted}/{project.totalTasks} công việc
                        </span>
                        <span>Hạn: {new Date(project.endDate).toLocaleDateString("vi-VN")}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Danh sách công việc</h2>
              <p className="text-muted-foreground">Theo dõi tiến độ và quản lý các task được giao</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm công việc
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {employeeData.tasks.map((task) => (
              <Card key={task.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {getTaskIcon(task.status)}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{task.title}</h3>
                          <Badge className={`${getTaskStatusColor(task.status)}`}>
                            {task.status === "completed"
                              ? "Hoàn thành"
                              : task.status === "in-progress"
                                ? "Đang làm"
                                : "Chờ"}
                          </Badge>
                          <Badge className={`${getPriorityColor(task.priority)}`}>
                            {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{task.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Tiến độ</span>
                            <span className="font-medium">{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-64 space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Ước tính</p>
                          <p className="font-medium">{task.estimatedHours}h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Thực tế</p>
                          <p className="font-medium">{task.actualHours}h</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Hạn chót</p>
                        <p className="font-medium">{new Date(task.dueDate).toLocaleDateString("vi-VN")}</p>
                      </div>
                      {task.completedDate && (
                        <div className="text-sm">
                          <p className="text-muted-foreground">Hoàn thành</p>
                          <p className="font-medium text-green-600">
                            {new Date(task.completedDate).toLocaleDateString("vi-VN")}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Dự án tham gia</h2>
              <p className="text-muted-foreground">Tổng quan về các dự án đang thực hiện</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Thêm dự án
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {employeeData.projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {project.status === "in-progress" ? "Đang thực hiện" : "Sắp hoàn thành"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tiến độ tổng thể</span>
                      <span className="text-sm font-bold text-primary">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Bắt đầu</p>
                      <p className="font-medium">{new Date(project.startDate).toLocaleDateString("vi-VN")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Kết thúc</p>
                      <p className="font-medium">{new Date(project.endDate).toLocaleDateString("vi-VN")}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Công việc hoàn thành</span>
                    </div>
                    <span className="font-bold text-green-600">
                      {project.tasksCompleted}/{project.totalTasks}
                    </span>
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    Xem chi tiết dự án
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Schedule Tab - Replaced with new calendar interface */}
        <TabsContent value="schedule" className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar with categories */}
            <div className="lg:w-64 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-cyan-600">LỊCH CỦA TÔI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {calendarCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="rounded"
                      />
                      <div className={`w-4 h-4 rounded ${category.color}`}></div>
                      <span className="text-sm flex-1">{category.name}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main calendar */}
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)} className="bg-transparent">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <h2 className="text-xl font-bold">
                        {currentDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" })}
                      </h2>
                      <Button variant="outline" size="sm" onClick={() => navigateMonth(1)} className="bg-transparent">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="bg-cyan-500 text-white hover:bg-cyan-600">
                        <Plus className="h-4 w-4 mr-1" />
                        Thêm Cuộc gọi
                      </Button>
                      <Button variant="outline" size="sm" className="bg-cyan-500 text-white hover:bg-cyan-600">
                        <Plus className="h-4 w-4 mr-1" />
                        Thêm Cuộc họp
                      </Button>
                      <Button variant="outline" size="sm" className="bg-cyan-500 text-white hover:bg-cyan-600">
                        <Plus className="h-4 w-4 mr-1" />
                        Thêm Công việc
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Calendar className="h-4 w-4 mr-1" />
                        Tùy chỉnh
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>1 – 30 Tháng 4, 2022</span>
                    <span className="text-cyan-600">Hôm nay</span>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Calendar header */}
                  <div className="grid grid-cols-7 gap-0 mb-2">
                    {["T2 28/3", "T3 29/3", "T4 30/3", "T5 31/3", "T6 1/4", "T7 2/4", "CN 3/4"].map((day, index) => (
                      <div key={index} className="p-2 text-center text-sm font-medium text-gray-600 border-b">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 gap-0 border border-gray-200">{renderCalendarGrid()}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Thông tin liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{employeeData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Điện thoại</p>
                      <p className="font-medium">{employeeData.telephone}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Địa chỉ</p>
                      <p className="font-medium">{employeeData.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phòng ban</p>
                      <p className="font-medium">{employeeData.departmentName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Teams Tab */}
        <TabsContent value="teams" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Nhóm làm việc
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {employeeData.userTeam.map((team) => (
                  <div key={team.id} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{team.teamName}</h4>
                        <p className="text-sm text-muted-foreground">Thành viên nhóm</p>
                      </div>
                      <Badge variant="secondary">Hoạt động</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Hoạt động gần đây
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Hoàn thành task "API Authentication System"</p>
                    <p className="text-sm text-muted-foreground">2 giờ trước</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Cập nhật tiến độ dự án "E-commerce Platform"</p>
                    <p className="text-sm text-muted-foreground">1 ngày trước</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Tham gia nhóm "Backend-Frontend"</p>
                    <p className="text-sm text-muted-foreground">3 ngày trước</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên</Label>
                  <Input
                    id="fullName"
                    value={editFormData.fullName}
                    onChange={(e) => handleEditFormChange("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => handleEditFormChange("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telephone">Số điện thoại</Label>
                  <Input
                    id="telephone"
                    value={editFormData.telephone}
                    onChange={(e) => handleEditFormChange("telephone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Chức vụ</Label>
                  <Input
                    id="position"
                    value={editFormData.position}
                    onChange={(e) => handleEditFormChange("position", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={editFormData.address}
                  onChange={(e) => handleEditFormChange("address", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Mô tả</Label>
                <Textarea
                  id="bio"
                  value={editFormData.bio}
                  onChange={(e) => handleEditFormChange("bio", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select value={editFormData.status} onValueChange={(value) => handleEditFormChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Đang hoạt động</SelectItem>
                    <SelectItem value="INACTIVE">Không hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
                <Button onClick={handleSaveEdit}>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 sm:flex-none">
                <Edit className="h-4 w-4 mr-2" />
                Chỉnh sửa thông tin
              </Button>
            </DialogTrigger>
          </Dialog>
          <Button variant="secondary" className="flex-1 sm:flex-none">
            <Users className="h-4 w-4 mr-2" />
            Quản lý nhóm
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:flex-none bg-transparent"
            onClick={() => setActiveTab("schedule")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Xem lịch làm việc
          </Button>
        </div>
      </Tabs>
    </div>
  )
}
