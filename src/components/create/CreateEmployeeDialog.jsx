import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function CreateEmployeeDialog({ onAdd }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    team: "",
    status: "active",
    joinDate: new Date().toISOString().split("T")[0],
    tasksCompleted: 0,
    tasksInProgress: 0,
    avatar: "/placeholder.svg",
  })

  const handleSubmit = () => {
    onAdd({ ...form, id: Date.now().toString() })
    setForm({
      name: "",
      email: "",
      phone: "",
      position: "",
      department: "",
      team: "",
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
      tasksCompleted: 0,
      tasksInProgress: 0,
      avatar: "/placeholder.svg",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Thêm nhân viên
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm nhân viên mới</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Họ và tên</Label>
            <Input id="name" placeholder="Nhập họ và tên" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Nhập email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" placeholder="Nhập số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="position">Vị trí</Label>
            <Input id="position" placeholder="Nhập vị trí công việc" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="department">Phòng ban</Label>
              <Select value={form.department} onValueChange={(val) => setForm({ ...form, department: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Công nghệ">Công nghệ</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="team">Nhóm</Label>
              <Select value={form.team} onValueChange={(val) => setForm({ ...form, team: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn nhóm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
            <Button onClick={handleSubmit}>Thêm nhân viên</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
