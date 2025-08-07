"use client"

import { useState, useEffect } from "react"
import AssignRoleModal from "./AssignRoleModal"
import { getAllRoles } from "../api/roleApi"
import { getAllUsers, assignRoleToUser, removeRoleFromUser } from "../api/userApi"

const UserRoleManagement = ({ searchQuery = "" }) => {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersRes, rolesRes] = await Promise.all([getAllUsers(), getAllRoles()])
      setUsers(usersRes.data || [])
      setRoles(rolesRes.data || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      alert("Lỗi tải dữ liệu user hoặc role")
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const toggleSelectUser = (userId) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id))
    }
  }

  const handleAssignRole = async (userId, roleIds) => {
    try {
      for (const roleId of roleIds) {
        await assignRoleToUser(userId, roleId)
      }
      await fetchData()
      setShowAssignModal(false)
      setSelectedUser(null)
      setSelectedUsers([])
    } catch (error) {
      console.error("Error assigning roles:", error)
      alert("Lỗi khi gắn role cho user")
    }
  }

  const handleRemoveRole = async (userId, roleId) => {
    if (window.confirm("Bạn có chắc muốn gỡ role này khỏi user?")) {
      try {
        await removeRoleFromUser(userId, roleId)
        await fetchData()
      } catch (error) {
        console.error("Error removing role:", error)
        alert("Lỗi khi gỡ role khỏi user")
      }
    }
  }

  const getUserStatusColor = (status) => {
    if (status === "active") return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-600"
  }

  const getRoleColor = (roleName) => {
    switch (roleName.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "user":
        return "bg-blue-100 text-blue-800"
      case "manager":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="px-4 py-3 flex-shrink-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Quản lý User & Role ({filteredUsers.length})</h2>
            {selectedUsers.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">{selectedUsers.length} đã chọn</span>
                <button
                  onClick={() => {
                    setSelectedUser({ id: "bulk", userName: "Multiple Users" })
                    setShowAssignModal(true)
                  }}
                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Gắn Role hàng loạt
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAssignModal(true)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1.5 text-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Gắn Role
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border shadow-sm flex-1 flex flex-col overflow-hidden mx-4">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="w-10 p-2">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded border-gray-300"
                  />
                </th>
                <th className="text-left p-2 font-medium text-gray-700 text-xs">User</th>
                <th className="text-left p-2 font-medium text-gray-700 text-xs">Email</th>
                <th className="text-left p-2 font-medium text-gray-700 text-xs">Status</th>
                <th className="text-left p-2 font-medium text-gray-700 text-xs">Roles</th>
                <th className="text-center p-2 font-medium text-gray-700 text-xs w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center">
                      <svg
                        className="w-10 h-10 text-gray-400 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      <h3 className="text-base font-medium text-gray-900 mb-1">Không tìm thấy user nào</h3>
                      <p className="text-sm text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc thêm user mới.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                        className="w-3.5 h-3.5 rounded border-gray-300"
                      />
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {user.userName?.charAt(0)?.toUpperCase() || "U"}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{user.userName || "N/A"}</div>
                          <div className="text-xs text-gray-500">ID: #{user.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <span className="text-gray-900 text-sm">{user.email || "N/A"}</span>
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getUserStatusColor(
                          user.status || "active",
                        )}`}
                      >
                        {user.status === "active" ? "Hoạt động" : "Không hoạt động"}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap gap-1" style={{ minHeight: "24px" }}>
                        {user.roles && user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <div key={role.id} className="flex items-center">
                              <span
                                className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
                                  role.name,
                                )}`}
                              >
                                {role.name}
                              </span>
                              <button
                                onClick={() => handleRemoveRole(user.id, role.id)}
                                className="ml-1 text-red-500 hover:text-red-700"
                                title="Gỡ role"
                              >
                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">Chưa có role</span>
                        )}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setShowAssignModal(true)
                        }}
                        className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                        title="Gắn role"
                      >
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Gắn Role
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-3 flex-shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Tổng Users</p>
                <p className="text-lg font-semibold text-gray-900">{users.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Đang hoạt động</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter((u) => u.status === "active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Có Role</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter((u) => u.roles && u.roles.length > 0).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center mr-2">
                <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600">Chưa có Role</p>
                <p className="text-lg font-semibold text-gray-900">
                  {users.filter((u) => !u.roles || u.roles.length === 0).length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Role Modal */}
      {showAssignModal && (
        <AssignRoleModal
          user={selectedUser}
          users={selectedUser?.id === "bulk" ? selectedUsers.map((id) => users.find((u) => u.id === id)) : null}
          roles={roles}
          onClose={() => {
            setShowAssignModal(false)
            setSelectedUser(null)
          }}
          onAssign={handleAssignRole}
        />
      )}
    </div>
  )
}

export default UserRoleManagement
