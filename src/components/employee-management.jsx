import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Filter, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { CreateEmployeeDialog } from "../components/create/CreateEmployeeDialog"

export function EmployeeManagement() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([
    { id: "1", name: "Nguyễn Văn A", email: "nguyenvana@takeit.com", phone: "0123456789", position: "Frontend Developer", department: "Công nghệ", team: "Frontend", avatar: "/placeholder.svg", status: "active", joinDate: "2023-01-15", tasksCompleted: 24, tasksInProgress: 3 },
    { id: "2", name: "Trần Thị B", email: "tranthib@takeit.com", phone: "0123456790", position: "Backend Developer", department: "Công nghệ", team: "Backend", avatar: "/placeholder.svg", status: "active", joinDate: "2023-02-20", tasksCompleted: 31, tasksInProgress: 2 },
    { id: "3", name: "Lê Văn C", email: "levanc@takeit.com", phone: "0123456791", position: "Content Writer", department: "Marketing", team: "Content", avatar: "/placeholder.svg", status: "active", joinDate: "2023-03-10", tasksCompleted: 18, tasksInProgress: 5 },
    { id: "4", name: "Phạm Thị D", email: "phamthid@takeit.com", phone: "0123456792", position: "Mobile Developer", department: "Công nghệ", team: "Mobile", avatar: "/placeholder.svg", status: "inactive", joinDate: "2023-04-05", tasksCompleted: 12, tasksInProgress: 1 },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const getStatusColor = (status) => (status === "active" ? "bg-green-500" : "bg-gray-500")
  const getStatusText = (status) => (status === "active" ? "Đang làm việc" : "Nghỉ việc")

  const handleAddEmployee = (employee) => {
    setEmployees([employee, ...employees])
  }

  const handleViewDetail = (employee) => {
    // Chuyển sang trang chi tiết user, truyền dữ liệu qua state
    navigate(`/app/employees/${employee.id}`, { state: { user: employee } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý nhân viên</h1>
          <p className="text-muted-foreground">Quản lý thông tin và công việc của nhân viên</p>
        </div>
        <CreateEmployeeDialog onAdd={handleAddEmployee} />
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Tìm kiếm nhân viên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Lọc theo phòng ban" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả phòng ban</SelectItem>
            <SelectItem value="Công nghệ">Công nghệ</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Bộ lọc
        </Button>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{employee.position}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewDetail(employee)}>
                      Xem chi tiết
                    </DropdownMenuItem>
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem>Giao công việc</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(employee.status)}`} />
                <span className="text-sm">{getStatusText(employee.status)}</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3 h-3" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3 h-3" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {employee.department} - {employee.team}
                  </span>
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t">
                <div className="text-center">
                  <div className="font-semibold text-green-600">{employee.tasksCompleted}</div>
                  <div className="text-xs text-muted-foreground">Hoàn thành</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-orange-600">{employee.tasksInProgress}</div>
                  <div className="text-xs text-muted-foreground">Đang làm</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{new Date(employee.joinDate).getFullYear()}</div>
                  <div className="text-xs text-muted-foreground">Năm vào</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không tìm thấy nhân viên nào</p>
        </div>
      )}
    </div>
  )
}

export default EmployeeManagement
