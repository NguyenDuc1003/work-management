import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Checkbox } from "./ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Users, Plus, Edit, Trash2, Shield, Crown, UserPlus } from "lucide-react"
import CreateRoleModal from "./CreateRoleModal"
import EditRoleModal from "./EditRoleModal"
import UserRoleManagement from "./UserRoleManagement"
import { getAllRoles, createRole, updateRole, deleteRole } from "../api/roleApi"

const RoleManagement = ({ searchQuery }) => {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [selectedRoles, setSelectedRoles] = useState([])

  const fetchRoles = async () => {
    try {
      setLoading(true)
      const res = await getAllRoles()
      setRoles(res.data)
      setSelectedRoles([])
    } catch (err) {
      console.error("Error fetching roles", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoles()
  }, [])

  const filteredRoles = roles.filter((role) => role.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateRole = async (roleData) => {
    try {
      await createRole(roleData)
      await fetchRoles()
      setShowCreateModal(false)
    } catch (err) {
      console.error("Error creating role", err)
      alert("Failed to create role")
    }
  }

  const handleUpdateRole = async (roleData) => {
    try {
      await updateRole(editingRole.id, roleData)
      await fetchRoles()
      setEditingRole(null)
    } catch (err) {
      console.error("Error updating role", err)
      alert("Failed to update role")
    }
  }

  const handleDeleteRole = async (roleId) => {
    if (window.confirm("Bạn có chắc muốn xóa role này?")) {
      try {
        await deleteRole(roleId)
        await fetchRoles()
      } catch (err) {
        console.error("Error deleting role", err)
        alert("Failed to delete role")
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedRoles.length === 0) return
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedRoles.length} vai trò đã chọn?`)) {
      try {
        await Promise.all(selectedRoles.map((id) => deleteRole(id)))
        await fetchRoles()
      } catch (err) {
        console.error("Error deleting roles", err)
        alert("Failed to delete selected roles")
      }
    }
  }

  const toggleSelectRole = (roleId) => {
    setSelectedRoles((prev) => (prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]))
  }

  const toggleSelectAll = () => {
    setSelectedRoles(selectedRoles.length === filteredRoles.length ? [] : filteredRoles.map((role) => role.id))
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Tabs defaultValue="roles" className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 pb-0">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Quản lý vai trò & phân quyền
                    </CardTitle>
                    <p className="text-sm text-slate-600 mt-1">
                      Quản lý vai trò và gán quyền cho người dùng trong hệ thống
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm shadow-sm">
            <TabsTrigger value="roles" className="flex items-center space-x-2">
              <Crown className="h-4 w-4" />
              <span>Quản lý vai trò</span>
            </TabsTrigger>
            <TabsTrigger value="user-roles" className="flex items-center space-x-2">
              <UserPlus className="h-4 w-4" />
              <span>Phân quyền người dùng</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 pt-2">
          {/* Role Management Tab */}
          <TabsContent value="roles" className="h-full mt-2">
            <div className="h-full overflow-auto">
              <div className="max-w-7xl mx-auto space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Tổng vai trò</p>
                          <p className="text-3xl font-bold">{roles.length}</p>
                        </div>
                        <Users className="h-10 w-10 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Đã chọn</p>
                          <p className="text-3xl font-bold">{selectedRoles.length}</p>
                        </div>
                        <Shield className="h-10 w-10 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg border-0">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-emerald-100 text-sm">Hiển thị</p>
                          <p className="text-3xl font-bold">{filteredRoles.length}</p>
                        </div>
                        <Crown className="h-10 w-10 text-emerald-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Add Role Button */}
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm vai trò
                  </Button>
                </div>

                {/* Bulk Actions */}
                {selectedRoles.length > 0 && (
                  <Card className="shadow-md border-0 bg-amber-50/80 border-l-4 border-amber-400">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className="bg-amber-500 text-white">
                            {selectedRoles.length} đã chọn
                          </Badge>
                          <span className="text-sm text-amber-800">
                            Đã chọn {selectedRoles.length} vai trò
                          </span>
                        </div>
                        <Button 
                          onClick={handleBulkDelete}
                          variant="destructive"
                          size="sm"
                          className="shadow-sm"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa tất cả
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Main Content Card */}
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-0">
                    {loading ? (
                      <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                          <p className="text-slate-600">Đang tải dữ liệu...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-auto">
                        <table className="w-full">
                          <thead className="sticky top-0 z-10 bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200">
                            <tr>
                              <th className="px-6 py-4 text-left">
                                <Checkbox
                                  checked={selectedRoles.length === filteredRoles.length && filteredRoles.length > 0}
                                  onCheckedChange={toggleSelectAll}
                                  className="w-5 h-5"
                                />
                              </th>
                              <th className="px-6 py-4 text-left font-semibold text-slate-700">ID</th>
                              <th className="px-6 py-4 text-left font-semibold text-slate-700">Tên vai trò</th>
                              <th className="px-6 py-4 text-left font-semibold text-slate-700">Người dùng</th>
                              <th className="px-6 py-4 text-left font-semibold text-slate-700">Quyền hạn</th>
                              <th className="px-6 py-4 text-left font-semibold text-slate-700">Thao tác</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredRoles.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="text-center py-12">
                                  <div className="flex flex-col items-center space-y-3">
                                    <Crown className="h-12 w-12 text-slate-300" />
                                    <p className="text-slate-500 font-medium">Không tìm thấy vai trò nào</p>
                                    <p className="text-slate-400 text-sm">Hãy thêm vai trò mới để bắt đầu</p>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              filteredRoles.map((role, index) => (
                                <tr 
                                  key={role.id} 
                                  className={`border-b hover:bg-blue-50/50 transition-all duration-200 ${
                                    index % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                                  }`}
                                >
                                  <td className="px-6 py-4">
                                    <Checkbox
                                      checked={selectedRoles.includes(role.id)}
                                      onCheckedChange={() => toggleSelectRole(role.id)}
                                      className="w-5 h-5"
                                    />
                                  </td>
                                  <td className="px-6 py-4">
                                    <Badge variant="outline" className="font-mono text-xs">
                                      #{role.id}
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                                        {role.name.charAt(0).toUpperCase()}
                                      </div>
                                      <div>
                                        <div className="font-medium text-slate-900">{role.name}</div>
                                        <div className="text-sm text-slate-500">Vai trò hệ thống</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                      <Users className="h-3 w-3 mr-1" />
                                      {role.userCount ?? 0} người dùng
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                      <Shield className="h-3 w-3 mr-1" />
                                      {role.permissionCount ?? 0} quyền
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                      <Button
                                        onClick={() => setEditingRole(role)}
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-300"
                                      >
                                        <Edit className="h-4 w-4 text-blue-600" />
                                      </Button>
                                      <Button
                                        onClick={() => handleDeleteRole(role.id)}
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300"
                                      >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                      </Button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* User Role Assignment Tab */}
          <TabsContent value="user-roles" className="h-full mt-2">
            <UserRoleManagement searchQuery={searchQuery || ""} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Modals */}
      {showCreateModal && (
        <CreateRoleModal 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={fetchRoles} 
        />
      )}

      {editingRole && (
        <EditRoleModal 
          role={editingRole} 
          onClose={() => setEditingRole(null)} 
          onSubmit={handleUpdateRole} 
        />
      )}
    </div>
  )
}

export default RoleManagement
