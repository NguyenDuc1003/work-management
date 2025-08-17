import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './DepartmentDetail.css'
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  Briefcase, 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  MoreHorizontal,
  Edit,
  UserPlus,
  FolderPlus
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { withLoading } from './LoadingWrapper'

import {createDepartment,getAllDepartments , updateDepartment, deleteDepartment, getDepartmentById} from "../services/departmentService"
function DepartmentDetailBase() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [department, setDepartment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        const data = await getDepartmentById(id)
        setDepartment(data)
      } catch (error) {
        console.error("Error fetching department data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDepartmentData()
  }, [id])
          

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hoàn thành': return 'bg-green-100 text-green-800'
      case 'Đang thực hiện': return 'bg-blue-100 text-blue-800'
      case 'Tạm dừng': return 'bg-yellow-100 text-yellow-800'
      case 'Đã hủy': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Hoàn thành': return 'default'
      case 'Đang thực hiện': return 'secondary'
      case 'Tạm dừng': return 'outline'
      case 'Đã hủy': return 'destructive'
      default: return 'outline'
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-96">Đang tải...</div>
  }

  if (!department) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Không tìm thấy phòng ban</h2>
          <Button onClick={() => navigate('/app/departments')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>
    )
  }

 return (
  <div className="space-y-6 department-detail-fade-in">
    {/* Header */}
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/app/departments')}
        className="hover:bg-blue-50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại
      </Button>
      <div>
        <h1 className="text-2xl font-bold">Chi tiết phòng ban</h1>
        <p className="text-muted-foreground">Thông tin chi tiết về {department.departmentName}</p>
      </div>
    </div>

    {/* Department Overview Card */}
    <Card className="department-gradient-bg text-white overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{department.departmentName}</h2>
                <p className="text-white/90 mt-1">{department.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">
                  {department.teams.reduce((total, team) => total + (team.userTeam?.length || 0), 0)}
                </div>
                <div className="text-sm text-white/80">Nhân viên</div>
              </div>
              <div className="text-center">
                <Building2 className="w-6 h-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{department.teams.length}</div>
                <div className="text-sm text-white/80">Nhóm</div>
              </div>
              <div className="text-center">
                <Briefcase className="w-6 h-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">{department.projects.length}</div>
                <div className="text-sm text-white/80">Dự án</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                <div className="text-2xl font-bold">0%</div>
                <div className="text-sm text-white/80">Hoàn thành</div>
              </div>
            </div>
          </div>

          {/* Manager Info */}
          <div>
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3 text-white">Trưởng phòng</h3>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-gray-900">N/A</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-white">{department.managerName || 'Chưa chỉ định'}</div>
                    <div className="text-sm text-white/80">Trưởng phòng</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-white/90">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{department.managerEmail || 'Không có'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Không có</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Không xác định</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Tabs Content */}
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Tổng quan</TabsTrigger>
        <TabsTrigger value="groups">Nhóm làm việc</TabsTrigger>
        <TabsTrigger value="employees">Nhân viên</TabsTrigger>
        <TabsTrigger value="projects">Dự án</TabsTrigger>
      </TabsList>

      {/* Overview Tab */}
      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Thông tin cơ bản
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Ngày thành lập</div>
                    <div className="font-semibold text-gray-900">
                      {department.createdAt
                        ? new Date(department.createdAt).toLocaleDateString('vi-VN')
                        : 'Không xác định'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Địa điểm</div>
                    <div className="font-semibold text-gray-900">Không xác định</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Ngân sách</div>
                    <div className="font-semibold text-green-700">Không xác định</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Tiến độ dự án
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Tổng tiến độ</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <Progress value={0} className="h-3" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-xs text-green-700">Hoàn thành</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-xs text-blue-700">Đang thực hiện</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Chi tiết tiến độ:</div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700">Chưa có dự án</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Thống kê nhân sự
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {department.teams.reduce((total, team) => total + (team.userTeam?.length || 0), 0)}
                  </div>
                  <div className="text-sm text-orange-700">Tổng nhân viên</div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-600 mb-2">Phân bổ theo nhóm:</div>
                  {department.teams.map((team, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{team.teamName}</div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div
                            className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (team.userTeam.length /
                                  department.teams.reduce(
                                    (total, team) => total + (team.userTeam?.length || 0),
                                    0
                                  )) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-3 text-sm font-semibold text-gray-700">{team.userTeam.length}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <UserPlus className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Thêm nhân viên</div>
                  <div className="text-xs text-muted-foreground">Tuyển dụng mới</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <FolderPlus className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Tạo dự án</div>
                  <div className="text-xs text-muted-foreground">Dự án mới</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Building2 className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Tạo nhóm</div>
                  <div className="text-xs text-muted-foreground">Nhóm làm việc</div>
                </div>
              </Button>
              <Button variant="outline" className="flex items-center gap-2 h-auto py-4">
                <Edit className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-medium">Cài đặt</div>
                  <div className="text-xs text-muted-foreground">Chỉnh sửa phòng ban</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Groups Tab */}
      <TabsContent value="groups" className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Các nhóm làm việc</h3>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Tạo nhóm mới
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {department.teams.map((team) => (
            <Card key={team.teamId} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{team.teamName}</CardTitle>
                  <Badge variant="secondary">{team.userTeam.length} thành viên</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{team.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Trưởng nhóm</div>
                  <div className="font-medium">
                    {team.userTeam.find((member) => member.roleInTeam === 'Leader')?.user.userName ||
                      'Chưa chỉ định'}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Công nghệ sử dụng</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      Không xác định
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-2">Dự án đang thực hiện</div>
                  <div className="space-y-1">
                    <div className="text-sm bg-muted/50 px-2 py-1 rounded">Chưa có dự án</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* Employees Tab */}
      <TabsContent value="employees" className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Danh sách nhân viên</h3>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Thêm nhân viên
          </Button>
        </div>
        <div className="grid gap-4">
          {department.teams.flatMap((team) => team.userTeam).length === 0 ? (
            <div className="text-center p-4">
              <p className="text-muted-foreground">Chưa có nhân viên</p>
            </div>
          ) : (
            department.teams.flatMap((team) =>
              team.userTeam.map((member) => (
                <Card key={member.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.user.avatar} />
                          <AvatarFallback>{member.user.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-semibold">{member.user.userName}</div>
                          <div className="text-sm text-muted-foreground">{member.roleInTeam}</div>
                          <Badge variant="outline" className="text-xs">
                            {team.teamName}
                          </Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Xem hồ sơ</DropdownMenuItem>
                          <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                          <DropdownMenuItem>Gửi tin nhắn</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <Separator className="my-3" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Liên hệ</div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            <span>{member.user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{member.user.telephone || 'Không có'}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-muted-foreground mb-1">Kỹ năng</div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            Không xác định
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <div className="text-muted-foreground mb-1">Dự án tham gia</div>
                        <div className="space-y-1">
                          <div className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            Chưa có dự án
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )
          )}
        </div>
      </TabsContent>

      {/* Projects Tab */}
      <TabsContent value="projects" className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Danh sách dự án</h3>
          <Button>
            <FolderPlus className="w-4 h-4 mr-2" />
            Tạo dự án mới
          </Button>
        </div>
        <div className="space-y-4">
          {department.projects.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-muted-foreground">Chưa có dự án</p>
            </div>
          ) : (
            department.projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold">{project.name}</h4>
                        <Badge variant={getStatusVariant(project.status)}>
                          {project.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tiến độ</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Ngày bắt đầu</div>
                          <div className="font-medium">
                            {new Date(project.startDate).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Ngày kết thúc</div>
                          <div className="font-medium">
                            {new Date(project.endDate).toLocaleDateString('vi-VN')}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Ngân sách</div>
                        <div className="text-lg font-bold text-green-600">{project.budget}</div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Nhóm tham gia</div>
                        <div className="flex flex-wrap gap-1">
                          {project.assignedGroups.map((group, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {group}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Thành viên chính</div>
                        <div className="space-y-1">
                          {project.members.map((member, index) => (
                            <div key={index} className="text-xs bg-gray-50 px-2 py-1 rounded">
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  </div>
);
}
export const DepartmentDetail = withLoading(DepartmentDetailBase, 'Chi tiết Phòng ban')
export default DepartmentDetail
