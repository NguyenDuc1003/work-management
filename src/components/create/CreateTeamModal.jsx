import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getAllUsers } from "../../api/userApi"; 
import {getAllDepartments } from "../../services/departmentService";
export function CreateTeamModal({ onTeamCreated }) {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    teamName: "",
    description: "",
    color: "#3b82f6", // Default blue color
    departmentId: "all",
    teamLeaderId: "all"
  });
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]); // List of departments
  const [users, setUsers] = useState([]); // List of users for team leader selection
  const [errors, setErrors] = useState({}); // Add errors state

  useEffect(() => {
    const fetchData = async () => {
      if(open){
        try{
          setLoading(true);

          const usersResponse = await getAllUsers();
          setUsers(usersResponse.data || []);

          const departmentsResponse = await getAllDepartments();
          setDepartments(departmentsResponse || []);

        }catch(error){
          console.error("Lỗi khi tải dữ liệu:", error);
          alert("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại!");
          setUsers([]);
          setDepartments([]);
        } finally {
          setLoading(false);
        }
      }
    };

    
      fetchData();
  
  }, [open]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // ...existing code...

const handleSubmit = async () => {
  if (!formData.teamName.trim()) {
    alert("Vui lòng nhập tên nhóm");
    return;
  }

  if (!formData.departmentId || formData.departmentId === "all") {
    alert("Vui lòng chọn phòng ban");
    return;
  }

  // Validate departmentId là số hợp lệ
  const deptId = Number(formData.departmentId);
  if (isNaN(deptId) || deptId <= 0) {
    alert("Phòng ban được chọn không hợp lệ");
    return;
  }

  try {
    setLoading(true);
    
    // Tạo userTeam array - nếu có team leader thì thêm vào
    const userTeamArray = [];
    if (formData.teamLeaderId && formData.teamLeaderId !== "all") {
      userTeamArray.push({
        userId: Number(formData.teamLeaderId),
        roleInTeam: "Leader", // Set role là Leader
        status: "Active"
      });
    }
    
    const teamData = {
      teamName: formData.teamName.trim(),
      description: formData.description.trim() || null,
      color: formData.color,
      departmentId: deptId,
  teamLeaderId: formData.teamLeaderId && formData.teamLeaderId !== "all" ? Number(formData.teamLeaderId) : null,
      userTeam: userTeamArray, // ← Gửi team leader vào đây
      projectTeams: []
    };
    
    console.log("🔍 Dữ liệu team sẽ gửi:", teamData);
    await onTeamCreated(teamData);
    handleCancel();
    
  } catch (error) {
    console.error("Lỗi khi tạo nhóm:", error);
    alert("Có lỗi xảy ra khi tạo nhóm. Vui lòng thử lại!");
  } finally {
    setLoading(false);
  }
};

  const handleCancel = () => {

    setFormData({
      teamName: "",
      description: "",
      color: "#3b82f6",
      departmentId: "all",
      teamLeaderId: "all"
    });
    setErrors({}); // Reset errors
    setOpen(false);
  };

  const colorOptions = [
    { value: "#3b82f6", label: "Xanh dương", color: "#3b82f6" },
    { value: "#10b981", label: "Xanh lá", color: "#10b981" },
    { value: "#f59e0b", label: "Vàng", color: "#f59e0b" },
    { value: "#ef4444", label: "Đỏ", color: "#ef4444" },
    { value: "#8b5cf6", label: "Tím", color: "#8b5cf6" },
    { value: "#06b6d4", label: "Xanh cyan", color: "#06b6d4" },
    { value: "#f97316", label: "Cam", color: "#f97316" },
    { value: "#84cc16", label: "Xanh lime", color: "#84cc16" }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Label htmlFor="teamName">Tên nhóm *</Label>
            <Input 
              id="teamName" 
              placeholder="Nhập tên nhóm"
              value={formData.teamName}
              onChange={(e) => handleInputChange("teamName", e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="department">Phòng ban *</Label>
            <Select value={formData.departmentId} onValueChange={(value) => handleInputChange("departmentId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn phòng ban" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả phòng ban</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.departmentId} value={dept.departmentId.toString()}>
                    {dept.departmentName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea 
              id="description" 
              placeholder="Mô tả về nhóm"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={loading}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="color">Màu sắc</Label>
            <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: formData.color }}
                    />
                    {colorOptions.find(c => c.value === formData.color)?.label}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: color.color }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="teamLeader">Trưởng nhóm</Label>
            <Select value={formData.teamLeaderId} onValueChange={(value) => handleInputChange("teamLeaderId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn trưởng nhóm (tùy chọn)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Không chọn</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id || user.userId} value={(user.id || user.userId).toString()}>
                    {user.fullName || user.userName} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Đang tạo..." : "Tạo nhóm"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTeamModal;
