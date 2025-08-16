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

function DepartmentDetailBase() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [department, setDepartment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchDepartmentData = () => {
      // Mock data - thay thế bằng API thực tế
      const mockDepartments = {
        'tech': {
          id: 'tech',
          name: 'Phòng Công nghệ Thông tin',
          description: 'Phòng ban chuyên về phát triển và vận hành hệ thống công nghệ thông tin của công ty',
          manager: {
            id: 1,
            name: 'Nguyễn Văn Anh',
            position: 'Trưởng phòng IT',
            avatar: '/placeholder.svg?height=60&width=60',
            email: 'nguyenvananh@company.com',
            phone: '0123456789'
          },
          location: 'Tầng 5, Tòa nhà A',
          establishedDate: '2020-01-15',
          totalEmployees: 25,
          totalProjects: 12,
          completedProjects: 8,
          ongoingProjects: 4,
          budget: '15,000,000,000 VNĐ',
          groups: [
            {
              id: 1,
              name: 'Nhóm Frontend',
              leader: 'Trần Thị Bình',
              members: 8,
              description: 'Phát triển giao diện người dùng',
              projects: ['Website quản lý nhân sự', 'Mobile App công ty', 'Dashboard Analytics'],
              technologies: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS']
            },
            {
              id: 2,
              name: 'Nhóm Backend',
              leader: 'Lê Văn Cường',
              members: 7,
              description: 'Phát triển API và hệ thống backend',
              projects: ['API Gateway', 'Microservices Architecture', 'Database Optimization'],
              technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis']
            },
            {
              id: 3,
              name: 'Nhóm DevOps',
              leader: 'Phạm Thị Dung',
              members: 5,
              description: 'Vận hành và triển khai hệ thống',
              projects: ['CI/CD Pipeline', 'Cloud Infrastructure', 'Monitoring System'],
              technologies: ['Docker', 'Kubernetes', 'AWS', 'Jenkins']
            },
            {
              id: 4,
              name: 'Nhóm QA',
              leader: 'Hoàng Văn Em',
              members: 5,
              description: 'Kiểm thử chất lượng phần mềm',
              projects: ['Test Automation', 'Performance Testing', 'Security Testing'],
              technologies: ['Selenium', 'Jest', 'Postman', 'JMeter']
            }
          ],
          employees: [
            {
              id: 1,
              name: 'Nguyễn Văn Anh',
              position: 'Trưởng phòng IT',
              group: 'Quản lý',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-01-15',
              projects: ['Tất cả dự án'],
              skills: ['Quản lý', 'Chiến lược', 'Lãnh đạo'],
              email: 'nguyenvananh@company.com',
              phone: '0123456789',
              status: 'Đang làm việc'
            },
            {
              id: 2,
              name: 'Trần Thị Bình',
              position: 'Team Lead Frontend',
              group: 'Nhóm Frontend',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-03-20',
              projects: ['Website quản lý nhân sự', 'Mobile App công ty'],
              skills: ['React', 'Vue.js', 'TypeScript', 'Leadership'],
              email: 'tranthib@company.com',
              phone: '0123456790',
              status: 'Đang làm việc'
            },
            {
              id: 3,
              name: 'Lê Văn Cường',
              position: 'Team Lead Backend',
              group: 'Nhóm Backend',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-02-10',
              projects: ['API Gateway', 'Microservices Architecture'],
              skills: ['Java', 'Spring Boot', 'Docker', 'PostgreSQL'],
              email: 'levanc@company.com',
              phone: '0123456791',
              status: 'Đang làm việc'
            },
            {
              id: 4,
              name: 'Phạm Thị Dung',
              position: 'DevOps Engineer',
              group: 'Nhóm DevOps',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-05-15',
              projects: ['CI/CD Pipeline', 'Cloud Infrastructure'],
              skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'],
              email: 'phamthid@company.com',
              phone: '0123456792',
              status: 'Đang làm việc'
            },
            {
              id: 5,
              name: 'Hoàng Văn Em',
              position: 'QA Lead',
              group: 'Nhóm QA',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-04-01',
              projects: ['Test Automation', 'Performance Testing'],
              skills: ['Selenium', 'Jest', 'Postman', 'Test Strategy'],
              email: 'hoangvane@company.com',
              phone: '0123456793',
              status: 'Đang làm việc'
            },
            {
              id: 6,
              name: 'Vũ Thị Giang',
              position: 'Frontend Developer',
              group: 'Nhóm Frontend',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2021-01-15',
              projects: ['Website quản lý nhân sự', 'Dashboard Analytics'],
              skills: ['React', 'JavaScript', 'CSS', 'HTML'],
              email: 'vuthig@company.com',
              phone: '0123456794',
              status: 'Đang làm việc'
            }
          ],
          projects: [
            {
              id: 1,
              name: 'Website quản lý nhân sự',
              status: 'Đang thực hiện',
              progress: 75,
              startDate: '2024-01-15',
              endDate: '2024-08-30',
              assignedGroups: ['Nhóm Frontend', 'Nhóm Backend'],
              members: ['Trần Thị Bình', 'Lê Văn Cường', 'Vũ Thị Giang'],
              budget: '500,000,000 VNĐ',
              description: 'Phát triển hệ thống quản lý nhân sự toàn diện cho công ty'
            },
            {
              id: 2,
              name: 'Mobile App công ty',
              status: 'Hoàn thành',
              progress: 100,
              startDate: '2023-06-01',
              endDate: '2024-01-15',
              assignedGroups: ['Nhóm Frontend'],
              members: ['Trần Thị Bình', 'Vũ Thị Giang'],
              budget: '300,000,000 VNĐ',
              description: 'Ứng dụng mobile cho nhân viên công ty'
            },
            {
              id: 3,
              name: 'Hệ thống CI/CD',
              status: 'Đang thực hiện',
              progress: 60,
              startDate: '2024-02-01',
              endDate: '2024-09-30',
              assignedGroups: ['Nhóm DevOps'],
              members: ['Phạm Thị Dung'],
              budget: '200,000,000 VNĐ',
              description: 'Xây dựng pipeline tự động hóa triển khai'
            }
          ]
        },
        'marketing': {
          id: 'marketing',
          name: 'Phòng Marketing',
          description: 'Phòng ban chuyên về quảng bá thương hiệu và marketing sản phẩm của công ty',
          manager: {
            id: 2,
            name: 'Hoàng Thị Em',
            position: 'Trưởng phòng Marketing',
            avatar: '/placeholder.svg?height=60&width=60',
            email: 'hoangthiem@company.com',
            phone: '0123456788'
          },
          location: 'Tầng 3, Tòa nhà B',
          establishedDate: '2020-03-01',
          totalEmployees: 15,
          totalProjects: 8,
          completedProjects: 5,
          ongoingProjects: 3,
          budget: '8,000,000,000 VNĐ',
          groups: [
            {
              id: 1,
              name: 'Nhóm Digital Marketing',
              leader: 'Vũ Văn Phát',
              members: 5,
              description: 'Marketing số và quảng cáo trực tuyến',
              projects: ['Campaign Tết 2024', 'SEO Website', 'Social Media Strategy'],
              technologies: ['Google Ads', 'Facebook Ads', 'Analytics', 'SEO Tools']
            },
            {
              id: 2,
              name: 'Nhóm Content',
              leader: 'Đỗ Thị Giang',
              members: 4,
              description: 'Sản xuất nội dung và copywriting',
              projects: ['Blog Content', 'Product Description', 'Email Marketing'],
              technologies: ['WordPress', 'Canva', 'Adobe Creative', 'Mailchimp']
            },
            {
              id: 3,
              name: 'Nhóm Design',
              leader: 'Bùi Văn Hưng',
              members: 6,
              description: 'Thiết kế đồ họa và branding',
              projects: ['Logo Redesign', 'Marketing Materials', 'Website UI/UX'],
              technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'After Effects']
            }
          ],
          employees: [
            {
              id: 1,
              name: 'Hoàng Thị Em',
              position: 'Trưởng phòng Marketing',
              group: 'Quản lý',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-03-01',
              projects: ['Tất cả dự án Marketing'],
              skills: ['Marketing Strategy', 'Brand Management', 'Leadership'],
              email: 'hoangthiem@company.com',
              phone: '0123456788',
              status: 'Đang làm việc'
            },
            {
              id: 2,
              name: 'Vũ Văn Phát',
              position: 'Digital Marketing Lead',
              group: 'Nhóm Digital Marketing',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-05-15',
              projects: ['Campaign Tết 2024', 'SEO Website'],
              skills: ['Google Ads', 'SEO', 'Analytics', 'PPC'],
              email: 'vuvanphat@company.com',
              phone: '0123456787',
              status: 'Đang làm việc'
            }
          ],
          projects: [
            {
              id: 1,
              name: 'Campaign Tết 2024',
              status: 'Hoàn thành',
              progress: 100,
              startDate: '2023-12-01',
              endDate: '2024-02-15',
              assignedGroups: ['Nhóm Digital Marketing', 'Nhóm Design'],
              members: ['Vũ Văn Phát', 'Bùi Văn Hưng'],
              budget: '2,000,000,000 VNĐ',
              description: 'Chiến dịch marketing cho dịp Tết Nguyên đán 2024'
            }
          ]
        },
        'sales': {
          id: 'sales',
          name: 'Phòng Kinh doanh',
          description: 'Phòng ban chuyên về bán hàng và chăm sóc khách hàng',
          manager: {
            id: 3,
            name: 'Lý Thị Ích',
            position: 'Trưởng phòng Kinh doanh',
            avatar: '/placeholder.svg?height=60&width=60',
            email: 'lythiich@company.com',
            phone: '0123456786'
          },
          location: 'Tầng 2, Tòa nhà A',
          establishedDate: '2020-02-01',
          totalEmployees: 20,
          totalProjects: 6,
          completedProjects: 4,
          ongoingProjects: 2,
          budget: '12,000,000,000 VNĐ',
          groups: [
            {
              id: 1,
              name: 'Nhóm B2B Sales',
              leader: 'Cao Văn Jôn',
              members: 8,
              description: 'Bán hàng cho doanh nghiệp',
              projects: ['Enterprise Sales Q1', 'Partner Program'],
              technologies: ['CRM', 'Salesforce', 'LinkedIn Sales', 'Email Marketing']
            },
            {
              id: 2,
              name: 'Nhóm B2C Sales',
              leader: 'Đinh Thị Kim',
              members: 6,
              description: 'Bán hàng cho khách hàng cá nhân',
              projects: ['Retail Sales Campaign', 'Online Store Optimization'],
              technologies: ['Shopify', 'WooCommerce', 'Social Selling', 'Live Chat']
            },
            {
              id: 3,
              name: 'Nhóm Customer Support',
              leader: 'Hồ Văn Long',
              members: 6,
              description: 'Hỗ trợ và chăm sóc khách hàng',
              projects: ['Support System Upgrade', '24/7 Helpdesk'],
              technologies: ['Zendesk', 'Intercom', 'Phone System', 'Knowledge Base']
            }
          ],
          employees: [
            {
              id: 1,
              name: 'Lý Thị Ích',
              position: 'Trưởng phòng Kinh doanh',
              group: 'Quản lý',
              avatar: '/placeholder.svg?height=40&width=40',
              joinDate: '2020-02-01',
              projects: ['Tất cả dự án Kinh doanh'],
              skills: ['Sales Strategy', 'Customer Relations', 'Team Management'],
              email: 'lythiich@company.com',
              phone: '0123456786',
              status: 'Đang làm việc'
            }
          ],
          projects: [
            {
              id: 1,
              name: 'Enterprise Sales Q1',
              status: 'Đang thực hiện',
              progress: 85,
              startDate: '2024-01-01',
              endDate: '2024-03-31',
              assignedGroups: ['Nhóm B2B Sales'],
              members: ['Cao Văn Jôn'],
              budget: '5,000,000,000 VNĐ',
              description: 'Chiến dịch bán hàng doanh nghiệp quý 1'
            }
          ]
        }
      }
      
      const deptData = mockDepartments[id]
      setDepartment(deptData)
      setLoading(false)
    }

    setTimeout(fetchDepartmentData, 800)
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
          <p className="text-muted-foreground">Thông tin chi tiết về {department.name}</p>
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
                  <h2 className="text-2xl font-bold">{department.name}</h2>
                  <p className="text-white/90 mt-1">{department.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <Users className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-2xl font-bold">{department.totalEmployees}</div>
                  <div className="text-sm text-white/80">Nhân viên</div>
                </div>
                <div className="text-center">
                  <Building2 className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-2xl font-bold">{department.groups.length}</div>
                  <div className="text-sm text-white/80">Nhóm</div>
                </div>
                <div className="text-center">
                  <Briefcase className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-2xl font-bold">{department.totalProjects}</div>
                  <div className="text-sm text-white/80">Dự án</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-2xl font-bold">
                    {Math.round((department.completedProjects / department.totalProjects) * 100)}%
                  </div>
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
                      <AvatarImage src={department.manager.avatar} />
                      <AvatarFallback className="text-gray-900">
                        {department.manager.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-white">{department.manager.name}</div>
                      <div className="text-sm text-white/80">{department.manager.position}</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{department.manager.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{department.manager.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{department.location}</span>
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
                        {new Date(department.establishedDate).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Địa điểm</div>
                      <div className="font-semibold text-gray-900">{department.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Ngân sách</div>
                      <div className="font-semibold text-green-700">{department.budget}</div>
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
                      <span className="font-semibold">{Math.round((department.completedProjects / department.totalProjects) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(department.completedProjects / department.totalProjects) * 100}
                      className="h-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{department.completedProjects}</div>
                      <div className="text-xs text-green-700">Hoàn thành</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{department.ongoingProjects}</div>
                      <div className="text-xs text-blue-700">Đang thực hiện</div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-2">Chi tiết tiến độ:</div>
                    <div className="space-y-2">
                      {department.projects.slice(0, 3).map((project, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <span className="text-gray-700 truncate flex-1">{project.name}</span>
                          <div className="flex items-center gap-2 ml-2">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="font-medium text-gray-600 min-w-[30px]">{project.progress}%</span>
                          </div>
                        </div>
                      ))}
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
                    <div className="text-3xl font-bold text-orange-600">{department.totalEmployees}</div>
                    <div className="text-sm text-orange-700">Tổng nhân viên</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600 mb-2">Phân bổ theo nhóm:</div>
                    {department.groups.map((group, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{group.name}</div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${(group.members / department.totalEmployees) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="ml-3 text-sm font-semibold text-gray-700">{group.members}</div>
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
            {department.groups.map((group) => (
              <Card key={group.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <Badge variant="secondary">{group.members} thành viên</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Trưởng nhóm</div>
                    <div className="font-medium">{group.leader}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Công nghệ sử dụng</div>
                    <div className="flex flex-wrap gap-1">
                      {group.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Dự án đang thực hiện</div>
                    <div className="space-y-1">
                      {group.projects.map((project, index) => (
                        <div key={index} className="text-sm bg-muted/50 px-2 py-1 rounded">
                          {project}
                        </div>
                      ))}
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
            {department.employees.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={employee.avatar} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="font-semibold">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">{employee.position}</div>
                        <Badge variant="outline" className="text-xs">
                          {employee.group}
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
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{employee.phone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground mb-1">Kỹ năng</div>
                      <div className="flex flex-wrap gap-1">
                        {employee.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-muted-foreground mb-1">Dự án tham gia</div>
                      <div className="space-y-1">
                        {employee.projects.map((project, index) => (
                          <div key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {project}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            {department.projects.map((project) => (
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
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export const DepartmentDetail = withLoading(DepartmentDetailBase, 'Chi tiết Phòng ban')
export default DepartmentDetail
