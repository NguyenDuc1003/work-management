

import React, { useEffect, useState } from "react";
import { MoreHorizontal, Building2, Eye } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Progress } from "./ui/progress"
import { withLoading } from "./LoadingWrapper"
import CreateTeamModal from "./create/CreateTeamModal"
import CreateDepartmentModal from "./create/CreateDepartmentModal"

import {createDepartment,getAllDepartments , updateDepartment, deleteDepartment, getDepartmentById} from "../services/departmentService"
import {createTeam} from "../services/teamService"
function DepartmentManagementBase() {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([]);
  const [expandedDepts, setExpandedDepts] = useState(new Set());
  
  useEffect(() => {
    fetchDepartment();
  }, []);
 const fetchDepartment = async ()=>{
  try{
    const data = await getAllDepartments();
    setDepartments(data);
  }catch(error){
    console.error("Lỗi khi lấy danh sách phòng ban:", error); 
  }
 }

 // Logic tạo phòng ban ở component cha
 const handleCreateDepartment = async (departmentData) => {
   try {
     console.log("📝 Tạo phòng ban với dữ liệu:", departmentData);
     
     // Gọi API tạo phòng ban
     const newDepartment = await createDepartment(departmentData);
     console.log("✅ Tạo phòng ban thành công:", newDepartment);
     
     // Refresh danh sách phòng ban
     await fetchDepartment();
     
     // Có thể thêm toast notification ở đây
     alert("Tạo phòng ban thành công!");
     
   } catch (error) {
     console.error("❌ Lỗi khi tạo phòng ban:", error);
     
     // Hiển thị lỗi cho người dùng
     alert("Lỗi khi tạo phòng ban: " + error.message);
     
     // Re-throw error để modal có thể xử lý
     throw error;
   }
 };

 const handleCreateTeam = async(teamData)=>{
  try{
    console.log("🔍 Dữ liệu team nhận được từ modal:", teamData);
    const newTeam = await createTeam(teamData);
    console.log("✅ Tạo nhóm thành công:", newTeam);
    await fetchDepartment();
  }catch(error){
    console.error("❌ Lỗi khi tạo nhóm:", error);
    console.error("❌ Chi tiết lỗi:", error.response?.data || error.message);
    alert("Lỗi khi tạo nhóm: " + (error.response?.data?.message || error.message));
    throw error; // Re-throw để modal có thể handle
  }
 };

 const toggleExpandTeams = (deptId) => {
   const newExpanded = new Set(expandedDepts);
   if (newExpanded.has(deptId)) {
     newExpanded.delete(deptId);
   } else {
     newExpanded.add(deptId);
   }
   setExpandedDepts(newExpanded);
 };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý phòng ban</h1>
          <p className="text-muted-foreground">Quản lý cơ cấu tổ chức và nhóm làm việc</p>
        </div>
        <div className="flex gap-2">
          <CreateTeamModal onTeamCreated={handleCreateTeam} />
          <CreateDepartmentModal onDepartmentCreated={handleCreateDepartment} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {departments.map((dept) => {
          // Ensure dept.teams is always an array
          const teams = Array.isArray(dept.teams) ? dept.teams : [];
          return (
            <Card key={dept.departmentId} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{dept.departmentName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </div>
                  </div>
                  {/* Wrap DropdownMenu in a div for safety */}
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate(`/app/departments/${dept.departmentId}`)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </DropdownMenuItem>
                        <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                        <DropdownMenuItem>Thêm nhóm</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Xóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {(dept.managerName?.charAt(0) || dept.managerEmail?.charAt(0) || "P").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    Trưởng phòng: {dept.managerName || dept.managerEmail || "Chưa có"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="font-semibold text-blue-600">
                      {teams.reduce((sum, team) => sum + (team.userTeam?.length || 0), 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Nhân viên</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-600">
                      {teams.reduce((sum, team) => sum + (team.projectTeams?.length || 0), 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Dự án</div>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-600">{teams.length}</div>
                    <div className="text-xs text-muted-foreground">Nhóm</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tiến độ công việc</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="text-xs text-muted-foreground">Chưa có dữ liệu công việc hoàn thành</div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Các nhóm</h4>
                  <div className="space-y-1">
                    {(() => {
                      const isExpanded = expandedDepts.has(dept.departmentId);
                      const teamsToShow = isExpanded ? teams : teams.slice(0, 1);
                      const hasMoreTeams = teams.length > 1;

                      return (
                        <>
                          {teamsToShow.map((team) => (
                            <div
                              key={team.teamId}
                              className="flex items-center justify-between p-2 bg-muted/50 rounded"
                            >
                              <div>
                                <div className="text-sm font-medium">{team.teamName}</div>
                                <div className="text-xs text-muted-foreground">
                                  Trưởng nhóm: {team.teamLeaderName || team.teamLeaderEmail || "Chưa có"}
                                </div>
                              </div>
                              <Badge variant="secondary">{team.userTeam?.length || 0}</Badge>
                            </div>
                          ))}
                          {hasMoreTeams && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full mt-2 text-xs"
                              onClick={() => toggleExpandTeams(dept.departmentId)}
                            >
                              {isExpanded
                                ? `Thu gọn`
                                : `Xem thêm ${teams.length - 1} nhóm`
                              }
                            </Button>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    onClick={() => navigate(`/app/departments/${dept.departmentId}`)}
                    className="w-full"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Xem chi tiết phòng ban
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export const DepartmentManagement = withLoading(DepartmentManagementBase, 'Quản lý Phòng ban')
export default DepartmentManagement
