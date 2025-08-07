
import React, { useState, useEffect } from "react"
import { assignPermissionsToRole, removePermissionFromRole, getAllPermissions } from "../api/permissionApi"
import { getAllRoles } from "../api/roleApi"
import { getAllModules } from "../api/moduleApi"
import { fetchRolePermissions } from "../api/rolePermissionApi"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Separator } from "./ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Shield, Settings, Users, CheckCircle2, Circle, Filter, Lock, Package } from "lucide-react"
import RoleManagement from "./RoleManagement"
import PermissionManagement from "./PermissionManagement"
import ModuleManagement from "./ModuleManagement"

const RolePermissionMatrix = () => {
  const [roles, setRoles] = useState([])
  const [permissions, setPermissions] = useState([])
  const [modules, setModules] = useState([])
  const [rolePermissions, setRolePermissions] = useState([])
  const [loading, setLoading] = useState(true)
  
  const [selectedModule, setSelectedModule] = useState("all")
  const [showOnlyAssigned, setShowOnlyAssigned] = useState(false)

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [rolesRes, modulesRes, permissionsRes, rolePermsRes] = await Promise.all([
          getAllRoles(),
          getAllModules(),
          getAllPermissions(),
          fetchRolePermissions(),
        ])

        const rolesData = rolesRes?.data || []
        const modulesData = modulesRes?.data || []
        const permissionsData = Array.isArray(permissionsRes) ? permissionsRes : (permissionsRes?.data || [])
        const rolePermissionsData = Array.isArray(rolePermsRes) ? rolePermsRes : (rolePermsRes?.data || [])

        setRoles(rolesData)
        setModules(modulesData)
        setPermissions(permissionsData)
        setRolePermissions(rolePermissionsData)
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu vai trò/quyền:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredPermissions =
    selectedModule === "all" 
      ? (Array.isArray(permissions) ? permissions : [])
      : (Array.isArray(permissions) ? permissions.filter((p) => p.moduleId && p.moduleId.toString() === selectedModule) : [])

  const getRolePermissions = (roleId) => {
    const rp = rolePermissions.find((r) => r.roleId === roleId)
    return rp ? rp.permissionIds : []
  }

  const hasPermission = (roleId, permId) => getRolePermissions(roleId).includes(permId)

  const togglePermission = async (roleId, permId) => {
    const currentHas = hasPermission(roleId, permId)
    try {
      if (currentHas) {
        await removePermissionFromRole(roleId, permId)
      } else {
        await assignPermissionsToRole(roleId, [permId])
      }

      setRolePermissions((prev) => {
        const updated = prev.map((rp) => {
          if (rp.roleId === roleId) {
            const has = rp.permissionIds.includes(permId)
            return {
              ...rp,
              permissionIds: has ? rp.permissionIds.filter((id) => id !== permId) : [...rp.permissionIds, permId],
            }
          }
          return rp
        })
        if (!updated.some((rp) => rp.roleId === roleId)) {
          updated.push({ roleId, permissionIds: [permId] })
        }
        return updated
      })
    } catch (error) {
      console.error("Lỗi khi cập nhật quyền:", error)
    }
  }

  const groupedPermissions = filteredPermissions.reduce((group, p) => {
    const mod = modules.find((m) => m.id === p.moduleId)
    const modName = mod ? mod.name : "Không xác định"
    group[modName] = group[modName] || []
    group[modName].push(p)
    return group
  }, {})

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Đang tải dữ liệu phân quyền...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Tabs defaultValue="matrix" className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 pb-0">
          <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Quản lý phân quyền
                    </CardTitle>
                    <p className="text-sm text-slate-600 mt-1">Quản lý vai trò, quyền hạn và module hệ thống</p>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="px-4">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-sm">
            <TabsTrigger value="matrix" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Ma trận phân quyền</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Vai trò</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Quyền hạn</span>
            </TabsTrigger>
            <TabsTrigger value="modules" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>Module</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 pt-2">
          {/* Ma trận phân quyền */}
          <TabsContent value="matrix" className="h-full mt-2">
            <div className="h-full flex flex-col space-y-4">
              {/* Controls */}
              <Card className="shadow-md border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-100 rounded-lg px-3 py-2">
                      <Filter className="h-4 w-4 text-slate-500" />
                      <Switch
                        id="show-assigned"
                        checked={showOnlyAssigned}
                        onCheckedChange={setShowOnlyAssigned}
                      />
                      <label htmlFor="show-assigned" className="text-sm font-medium text-slate-700">
                        Chỉ đã gán
                      </label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Settings className="h-4 w-4 text-slate-500" />
                      <Select value={selectedModule} onValueChange={setSelectedModule}>
                        <SelectTrigger className="w-[180px] bg-white shadow-sm">
                          <SelectValue placeholder="Chọn module" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">
                            <div className="flex items-center space-x-2">
                              <Circle className="h-3 w-3" />
                              <span>Tất cả module</span>
                            </div>
                          </SelectItem>
                          {modules.map((m) => (
                            <SelectItem key={m.id} value={m.id.toString()}>
                              <div className="flex items-center space-x-2">
                                <Shield className="h-3 w-3 text-blue-500" />
                                <span>{m.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Tổng vai trò</p>
                        <p className="text-2xl font-bold">{roles.length}</p>
                      </div>
                      <Users className="h-8 w-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100 text-sm">Tổng quyền</p>
                        <p className="text-2xl font-bold">{filteredPermissions.length}</p>
                      </div>
                      <Shield className="h-8 w-8 text-indigo-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Module</p>
                        <p className="text-2xl font-bold">{modules.length}</p>
                      </div>
                      <Settings className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg border-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100 text-sm">Đã gán</p>
                        <p className="text-2xl font-bold">
                          {rolePermissions.reduce((sum, rp) => sum + rp.permissionIds.length, 0)}
                        </p>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-emerald-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Matrix Table */}
              <Card className="flex-1 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardContent className="p-0 h-full">
                  <div className="h-full overflow-auto">
                    <table className="w-full">
                      <thead className="sticky top-0 z-10">
                        <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-slate-200">
                          <th className="sticky left-0 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 text-left border-r-2 border-slate-200 min-w-[280px]">
                            <div className="flex items-center space-x-3">
                              <div className="p-1.5 bg-blue-500 rounded-lg">
                                <Shield className="h-4 w-4 text-white" />
                              </div>
                              <span className="font-semibold text-slate-700">Quyền hạn</span>
                            </div>
                          </th>
                          {roles.map((role) => (
                            <th
                              key={role.id}
                              className="px-4 py-4 text-center min-w-[120px] border-r border-slate-200 last:border-r-0"
                            >
                              <div className="flex flex-col items-center space-y-2">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                                  {role.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="font-semibold text-slate-700 text-sm">{role.name}</div>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                  {getRolePermissions(role.id).filter(id => 
                                    filteredPermissions.some(p => p.id === id)
                                  ).length} quyền
                                </Badge>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(groupedPermissions).map(([modName, perms], moduleIndex) => (
                          <React.Fragment key={modName}>
                            {/* Module Header */}
                            <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-t-2 border-blue-200">
                              <td
                                className="sticky left-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-r-2 border-slate-200"
                                colSpan={roles.length + 1}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-md">
                                    <Settings className="h-4 w-4 text-white" />
                                  </div>
                                  <span className="font-bold text-blue-900 text-lg">{modName}</span>
                                  <Badge className="bg-blue-500 text-white">
                                    {perms.length} quyền
                                  </Badge>
                                </div>
                              </td>
                            </tr>

                            {/* Permission Rows */}
                            {perms.map((perm, index) => {
                              const assignedCount = roles.filter((r) => hasPermission(r.id, perm.id)).length
                              if (showOnlyAssigned && assignedCount === 0) return null

                              return (
                                <tr
                                  key={perm.id}
                                  className={`border-b hover:bg-blue-50/50 transition-all duration-200 ${
                                    index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                                  }`}
                                >
                                  <td className="sticky left-0 bg-inherit px-6 py-4 border-r-2 border-slate-200">
                                    <div className="flex items-start space-x-3">
                                      <Badge 
                                        variant="outline" 
                                        className="font-mono text-xs font-semibold px-3 py-1 bg-slate-100 border-slate-300"
                                      >
                                        {perm.code}
                                      </Badge>
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-slate-900 mb-1">
                                          {perm.name || perm.code}
                                        </div>
                                        <div className="text-xs text-slate-500 leading-relaxed max-w-[220px]">
                                          {perm.description || "Không có mô tả"}
                                        </div>
                                        {assignedCount > 0 && (
                                          <Badge className="mt-2 bg-emerald-100 text-emerald-700 text-xs">
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            Gán cho {assignedCount} vai trò
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  
                                  {/* Matrix checkboxes for each role */}
                                  {roles.map((role) => {
                                    const isChecked = hasPermission(role.id, perm.id)
                                    return (
                                      <td
                                        key={role.id}
                                        className="px-4 py-4 text-center border-r border-slate-200 last:border-r-0"
                                      >
                                        <div className="flex items-center justify-center">
                                          <div className={`p-2 rounded-lg transition-all duration-200 ${
                                            isChecked ? 'bg-emerald-50 hover:bg-emerald-100' : 'hover:bg-slate-50'
                                          }`}>
                                            <Checkbox
                                              checked={isChecked}
                                              onCheckedChange={() => togglePermission(role.id, perm.id)}
                                              className={`w-5 h-5 transition-all duration-200 ${
                                                isChecked
                                                  ? "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                                  : "hover:border-blue-400 border-slate-300"
                                              }`}
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    )
                                  })}
                                </tr>
                              )
                            })}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vai trò */}
          <TabsContent value="roles" className="h-full mt-2">
            <RoleManagement roles={roles} setRoles={setRoles} searchQuery="" />
          </TabsContent>

          {/* Quyền hạn */}
          <TabsContent value="permissions" className="h-full mt-2">
            <PermissionManagement 
              permissions={permissions} 
              setPermissions={setPermissions} 
              modules={modules} 
              searchQuery="" 
            />
          </TabsContent>

          {/* Module */}
          <TabsContent value="modules" className="h-full mt-2">
            <ModuleManagement modules={modules} setModules={setModules} searchQuery="" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default RolePermissionMatrix;
