import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { getAllUsers } from "../../api/userApi"; 
import {getAllCompanies } from "../../services/companyService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CreateDepartmentModal = ({ onDepartmentCreated }) => {
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    departmentName: "",
    description: "",
    color: "#3b82f6",
    managerId: "none",
    companyId: "none"
  });

  const [errors, setErrors] = useState({});

  // Fetch users và companies khi modal mở
  useEffect(() => {
    const fetchData = async () => {
      if (open) {
        try {
          setLoading(true);
          
          // Fetch users
          const usersResponse = await getAllUsers();
          setManagers(usersResponse.data || []);
          
          // Fetch companies
          const companiesResponse = await getAllCompanies();
          setCompanies(companiesResponse || []);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
          setManagers([]);
          setCompanies([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [open]);
  const colorOptions = [
    { value: "#3b82f6", label: "Xanh dương" },
    { value: "#10b981", label: "Xanh lá" },
    { value: "#f59e0b", label: "Vàng" },
    { value: "#ef4444", label: "Đỏ" },
    { value: "#8b5cf6", label: "Tím" },
    { value: "#06b6d4", label: "Xanh cyan" },
    { value: "#f97316", label: "Cam" },
    { value: "#84cc16", label: "Xanh lime" }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.departmentName.trim()) newErrors.departmentName = "Tên phòng ban bắt buộc";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      
      // Chuẩn bị data để gửi lên component cha
      const departmentData = {
        ...formData,
        managerId: formData.managerId && formData.managerId !== "none" ? Number(formData.managerId) : null
      };

      // Gọi callback từ component cha
      await onDepartmentCreated(departmentData);
      
      // Đóng modal và reset form nếu thành công
      handleCancel();
    } catch (error) {
      console.error("Lỗi khi tạo phòng ban:", error);
      // Error sẽ được handle bởi component cha
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData({
      departmentName: "",
      description: "",
      color: "#3b82f6",
      managerId: "none",
      companyId: "none"
    });
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Thêm phòng ban
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo phòng ban mới</DialogTitle>
          <DialogDescription>
            Điền thông tin để tạo phòng ban mới trong hệ thống quản lý công việc.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="departmentName">Tên phòng ban *</Label>
            <Input 
              id="departmentName" 
              placeholder="Nhập tên phòng ban"
              value={formData.departmentName}
              onChange={(e) => handleChange("departmentName", e.target.value)}
              className={errors.departmentName ? "border-red-500" : ""}
            />
            {errors.departmentName && (
              <p className="text-sm text-red-500 mt-1">{errors.departmentName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea 
              id="description" 
              placeholder="Mô tả về phòng ban"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="color">Màu sắc</Label>
            <Select value={formData.color} onValueChange={(value) => handleChange("color", value)}>
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
                        style={{ backgroundColor: color.value }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="manager">Trưởng phòng</Label>
            <Select 
              value={formData.managerId} 
              onValueChange={(value) => handleChange("managerId", value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Đang tải..." : "Chọn trưởng phòng (tùy chọn)"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Chọn trưởng phòng</SelectItem>
                {loading ? (
                  <SelectItem value="loading" disabled>Đang tải danh sách...</SelectItem>
                ) : managers.length === 0 ? (
                  <SelectItem value="empty" disabled>Không có người dùng nào</SelectItem>
                ) : (
                  managers.map((user) => (
                    <SelectItem key={user.id || user.userId} value={(user.id || user.userId).toString()}>
                      {user.fullName || user.userName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="company">Công ty</Label>
            <Select 
              value={formData.companyId} 
              onValueChange={(value) => handleChange("companyId", value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder={loading ? "Đang tải..." : "Chọn công ty (tùy chọn)"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Chọn công ty</SelectItem>
                {loading ? (
                  <SelectItem value="loading" disabled>Đang tải danh sách...</SelectItem>
                ) : companies.length === 0 ? (
                  <SelectItem value="empty" disabled>Không có công ty nào</SelectItem>
                ) : (
                  companies.map((company) => (
                    <SelectItem key={company.companyId} value={company.companyId.toString()}>
                      {company.companyName}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              type="button"
              disabled={submitting}
            >
              Hủy
            </Button>
            <Button 
              type="submit"
              disabled={loading || submitting}
            >
              {submitting ? "Đang tạo..." : "Tạo phòng ban"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDepartmentModal;
