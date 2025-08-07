

import { useState } from "react"
import { User, Bell, Shield, Palette, Database, Mail } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Textarea } from "./ui/textarea"
import { useTheme } from "./theme-provider"

export function Settings() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskUpdates: true,
    projectDeadlines: true,
    teamMentions: true,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý tài khoản và tùy chỉnh hệ thống</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="appearance">Giao diện</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
          <TabsTrigger value="system">Hệ thống</TabsTrigger>
          <TabsTrigger value="integrations">Tích hợp</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Thay đổi ảnh
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG tối đa 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Họ</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div>
                  <Label htmlFor="lastName">Tên</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@takeit.com" />
              </div>
              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" defaultValue="+84 123 456 789" />
              </div>
              <div>
                <Label htmlFor="position">Vị trí</Label>
                <Input id="position" defaultValue="Quản trị viên hệ thống" />
              </div>
              <div>
                <Label htmlFor="bio">Giới thiệu</Label>
                <Textarea id="bio" placeholder="Viết vài dòng về bản thân..." />
              </div>
              <Button>Lưu thay đổi</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Cài đặt thông báo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Thông báo qua Email</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Thông báo đẩy</Label>
                    <p className="text-sm text-muted-foreground">Nhận thông báo trên trình duyệt</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="task-updates">Cập nhật công việc</Label>
                    <p className="text-sm text-muted-foreground">Thông báo khi có cập nhật công việc</p>
                  </div>
                  <Switch
                    id="task-updates"
                    checked={notifications.taskUpdates}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, taskUpdates: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="project-deadlines">Hạn chót dự án</Label>
                    <p className="text-sm text-muted-foreground">Nhắc nhở về hạn chót dự án</p>
                  </div>
                  <Switch
                    id="project-deadlines"
                    checked={notifications.projectDeadlines}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, projectDeadlines: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="team-mentions">Nhắc đến trong nhóm</Label>
                    <p className="text-sm text-muted-foreground">Thông báo khi được nhắc đến</p>
                  </div>
                  <Switch
                    id="team-mentions"
                    checked={notifications.teamMentions}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, teamMentions: checked }))}
                  />
                </div>
              </div>
              <Button>Lưu cài đặt</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Giao diện
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Chủ đề</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Sáng</SelectItem>
                    <SelectItem value="dark">Tối</SelectItem>
                    <SelectItem value="system">Theo hệ thống</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Ngôn ngữ</Label>
                <Select defaultValue="vi">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vi">Tiếng Việt</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timezone">Múi giờ</Label>
                <Select defaultValue="asia/ho_chi_minh">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia/ho_chi_minh">Việt Nam (UTC+7)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Lưu cài đặt</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Bảo mật
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <Input id="current-password" type="password" />
              </div>
              <div>
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input id="new-password" type="password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>Đổi mật khẩu</Button>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Xác thực hai yếu tố</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tăng cường bảo mật tài khoản với xác thực hai yếu tố
                </p>
                <Button variant="outline">Kích hoạt 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Cài đặt hệ thống
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="company-name">Tên công ty</Label>
                <Input id="company-name" defaultValue="TakaIT" />
              </div>
              <div>
                <Label htmlFor="company-address">Địa chỉ công ty</Label>
                <Textarea id="company-address" placeholder="Nhập địa chỉ công ty" />
              </div>
              <div>
                <Label htmlFor="working-hours">Giờ làm việc</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="08:00" />
                  <Input placeholder="17:00" />
                </div>
              </div>
              <div>
                <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                <Select defaultValue="vnd">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vnd">VND</SelectItem>
                    <SelectItem value="usd">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Lưu cài đặt</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Tích hợp bên ngoài
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Google Workspace</h3>
                    <p className="text-sm text-muted-foreground">Đồng bộ email và lịch</p>
                  </div>
                  <Button variant="outline">Kết nối</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Slack</h3>
                    <p className="text-sm text-muted-foreground">Thông báo qua Slack</p>
                  </div>
                  <Button variant="outline">Kết nối</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Microsoft Teams</h3>
                    <p className="text-sm text-muted-foreground">Tích hợp với Teams</p>
                  </div>
                  <Button variant="outline">Kết nối</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Settings
