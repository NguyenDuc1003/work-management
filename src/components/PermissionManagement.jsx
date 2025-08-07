"use client"

import { useState, useEffect } from "react"
import EditPermissionModal from "./EditPermissionModal"
import CreatePermissionModal from "./CreatePermissionModal"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"
import { Shield, Plus, Edit, Trash2, Filter, Search, Eye, Lock } from "lucide-react"

import { getAllPermissions, createPermission, updatePermission, deletePermission } from "../api/permissionApi"

const PermissionManagement = ({ modules, searchQuery }) => {
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPermission, setEditingPermission] = useState(null)
  const [selectedPermissions, setSelectedPermissions] = useState([])
  const [filterModule, setFilterModule] = useState("all")

  useEffect(() => {
    fetchPermissions()
  }, [])

  const fetchPermissions = async () => {
    setLoading(true)
    try {
      const data = await getAllPermissions()
      console.log('🔍 Permissions data received:', data)
      
      // Ensure data is an array
      const permissionsArray = Array.isArray(data) ? data : []
      
      const enrichedData = permissionsArray.map((p) => ({
        ...p,
        moduleName: p.moduleName || modules.find((m) => m.id === p.moduleId)?.name || "Unknown",
      }))
      setPermissions(enrichedData)
    } catch (error) {
      console.error('❌ Error fetching permissions:', error)
      alert("Lỗi lấy permissions: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredPermissions = permissions.filter((permission) => {
    const search = searchQuery.toLowerCase()
    const matchesSearch =
      permission.code.toLowerCase().includes(search) || permission.description.toLowerCase().includes(search)
    const matchesModule = filterModule === "all" || permission.moduleId?.toString() === filterModule
    return matchesSearch && matchesModule
  })

  const getPermissionTypeColor = (type) => {
    if (type === "VIEW_BOARDS") return "bg-blue-100 text-blue-800"
    if (type === "CREATE_BOARDS") return "bg-green-100 text-green-800"
    if (type === "UPDATE_BOARDS") return "bg-yellow-100 text-yellow-800"
    if (type === "DELETE_BOARDS") return "bg-red-100 text-red-800"
    if (type === "VIEW_GROUPS") return "bg-indigo-100 text-indigo-800"
    if (type === "ADD_GROUPS") return "bg-green-100 text-green-800"
    if (type === "UPDATE_GROUPS") return "bg-yellow-100 text-yellow-800"
    if (type === "DELETE_GROUPS") return "bg-red-100 text-red-800"
    if (type === "VIEW_TASKS") return "bg-purple-100 text-purple-800"
    if (type === "ADD_TASKS") return "bg-green-100 text-green-800"
    if (type === "UPDATE_TASKS") return "bg-yellow-100 text-yellow-800"
    if (type === "DELETE_TASKS") return "bg-red-100 text-red-800"
    if (type === "CREATE") return "bg-green-100 text-green-800"
    if (type === "READ") return "bg-blue-100 text-blue-800"
    if (type === "UPDATE") return "bg-yellow-100 text-yellow-800"
    if (type === "DELETE") return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const getPermissionIcon = (type) => {
    if (type === "VIEW_BOARDS") return "👁️"
    if (type === "CREATE_BOARDS") return "📋"
    if (type === "UPDATE_BOARDS") return "✏️"
    if (type === "DELETE_BOARDS") return "🗑️"
    if (type === "VIEW_GROUPS") return "👀"
    if (type === "ADD_GROUPS") return "➕"
    if (type === "UPDATE_GROUPS") return "✏️"
    if (type === "DELETE_GROUPS") return "🗑️"
    if (type === "VIEW_TASKS") return "👁️"
    if (type === "ADD_TASKS") return "➕"
    if (type === "UPDATE_TASKS") return "✏️"
    if (type === "DELETE_TASKS") return "🗑️"
    if (type === "CREATE") return "➕"
    if (type === "READ") return "👁️"
    if (type === "UPDATE") return "✏️"
    if (type === "DELETE") return "🗑️"
    return "🔐"
  }

  const handleCreatePermission = async (permissionData) => {
    try {
      const created = await createPermission(permissionData)

      if (!created.moduleName) {
        const module = modules.find((m) => m.id === created.moduleId)
        if (module) created.moduleName = module.name
      }

      setPermissions((prev) => [...prev, created])
      setShowCreateModal(false)
    } catch (error) {
      alert("Lỗi tạo permission: " + error.message)
    }
  }

  const handleUpdatePermission = async (permissionData) => {
    try {
      const updated = await updatePermission(editingPermission.id, permissionData)

      if (!updated.moduleName) {
        const module = modules.find((m) => m.id === updated.moduleId)
        if (module) updated.moduleName = module.name
      }

      setPermissions((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
      setEditingPermission(null)
    } catch (error) {
      alert("Lỗi cập nhật permission: " + error.message)
    }
  }

  const handleDeletePermission = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return
    try {
      await deletePermission(id)
      setPermissions((prev) => prev.filter((p) => p.id !== id))
      setSelectedPermissions((prev) => prev.filter((sid) => sid !== id))
    } catch (error) {
      alert("Lỗi xóa permission: " + error.message)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedPermissions.length === 0) return
    if (!window.confirm(`Xóa ${selectedPermissions.length} permission đã chọn?`)) return
    try {
      await Promise.all(selectedPermissions.map((id) => deletePermission(id)))
      setPermissions((prev) => prev.filter((p) => !selectedPermissions.includes(p.id)))
      setSelectedPermissions([])
    } catch (error) {
      alert("Lỗi xóa nhiều permission: " + error.message)
    }
  }

  const toggleSelectPermission = (id) => {
    setSelectedPermissions((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    setSelectedPermissions(
      selectedPermissions.length === filteredPermissions.length ? [] : filteredPermissions.map((p) => p.id),
    )
  }

  return (
    <div className="h-full flex flex-col space-y-4 p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Quản lý quyền hạn
                </CardTitle>
                <p className="text-sm text-slate-600 mt-1">Tạo và quản lý các quyền truy cập hệ thống</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-slate-500" />
                <Select value={filterModule} onValueChange={setFilterModule}>
                  <SelectTrigger className="w-[160px] bg-white shadow-sm">
                    <SelectValue placeholder="Lọc module" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-3 w-3" />
                        <span>Tất cả module</span>
                      </div>
                    </SelectItem>
                    {modules.map((m) => (
                      <SelectItem key={m.id} value={m.id.toString()}>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-3 w-3 text-purple-500" />
                          <span>{m.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPermissions.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleBulkDelete}
                  className="shadow-md"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Xóa ({selectedPermissions.length})
                </Button>
              )}
              
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-md"
              >
                <Plus className="h-4 w-4 mr-1" />
                Thêm quyền
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Tổng quyền</p>
                <p className="text-2xl font-bold">{permissions.length}</p>
              </div>
              <Lock className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm">Đã lọc</p>
                <p className="text-2xl font-bold">{filteredPermissions.length}</p>
              </div>
              <Filter className="h-8 w-8 text-indigo-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Đã chọn</p>
                <p className="text-2xl font-bold">{selectedPermissions.length}</p>
              </div>
              <Eye className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Permissions Grid */}
      <Card className="flex-1 min-h-0 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex-1 overflow-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-slate-600">Đang tải quyền...</p>
                </div>
              </div>
            ) : filteredPermissions.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedPermissions.length === filteredPermissions.length && filteredPermissions.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                    <span className="text-sm text-slate-600">Chọn tất cả</span>
                  </div>
                  <p className="text-sm text-slate-500">{filteredPermissions.length} quyền</p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPermissions.map((p) => (
                    <Card 
                      key={p.id}
                      className={`hover:shadow-md transition-all duration-200 border ${
                        selectedPermissions.includes(p.id) 
                          ? 'border-purple-200 bg-purple-50' 
                          : 'border-slate-200 hover:border-purple-200'
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedPermissions.includes(p.id)}
                              onCheckedChange={() => toggleSelectPermission(p.id)}
                            />
                            <span className="text-2xl">{getPermissionIcon(p.type)}</span>
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingPermission(p)}
                              className="h-8 w-8 p-0 hover:bg-blue-100"
                            >
                              <Edit className="h-3 w-3 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePermission(p.id)}
                              className="h-8 w-8 p-0 hover:bg-red-100"
                            >
                              <Trash2 className="h-3 w-3 text-red-600" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div>
                            <Badge variant="outline" className="font-mono text-xs mb-2">
                              #{p.id}
                            </Badge>
                            <h3 className="font-semibold text-slate-900 text-sm">{p.code}</h3>
                          </div>
                          
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {p.description || "Không có mô tả"}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <Badge className="bg-purple-100 text-purple-700 text-xs">
                              {p.moduleName}
                            </Badge>
                            <Badge 
                              className={`text-xs ${getPermissionTypeColor(p.type)}`}
                            >
                              {p.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Shield className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">Không tìm thấy quyền nào</h3>
                  <p className="text-sm text-slate-500">Thử thay đổi bộ lọc hoặc tạo quyền mới</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      {showCreateModal && (
        <CreatePermissionModal
          modules={modules}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePermission}
        />
      )}

      {editingPermission && (
        <EditPermissionModal
          permission={editingPermission}
          modules={modules}
          onClose={() => setEditingPermission(null)}
          onSubmit={handleUpdatePermission}
        />
      )}
    </div>
  )
}

export default PermissionManagement
