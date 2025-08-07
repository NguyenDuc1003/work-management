"use client"

import { useState } from "react"

const AssignRoleModal = ({ user, users, roles, onClose, onAssign }) => {
  const [selectedRoles, setSelectedRoles] = useState([])
  const [loading, setLoading] = useState(false)

  const isBulkAssign = users && users.length > 0
  const displayName = isBulkAssign ? `${users.length} users` : user?.userName

  const handleRoleToggle = (roleId) => {
    setSelectedRoles((prev) => (prev.includes(roleId) ? prev.filter((id) => id !== roleId) : [...prev, roleId]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedRoles.length === 0) {
      alert("Vui lòng chọn ít nhất một role")
      return
    }

    try {
      setLoading(true)
      if (isBulkAssign) {
        // Assign roles to multiple users
        for (const targetUser of users) {
          await onAssign(targetUser.id, selectedRoles)
        }
      } else {
        // Assign roles to single user
        await onAssign(user.id, selectedRoles)
      }
      onClose()
    } catch (error) {
      console.error("Error assigning roles:", error)
      alert("Lỗi khi gắn role")
    } finally {
      setLoading(false)
    }
  }

  const getRoleColor = (roleName) => {
    const colors = {
      Admin: "border-red-200 bg-red-50 text-red-700",
      Manager: "border-blue-200 bg-blue-50 text-blue-700",
      User: "border-green-200 bg-green-50 text-green-700",
      Guest: "border-gray-200 bg-gray-50 text-gray-700",
    }
    return colors[roleName] || "border-purple-200 bg-purple-50 text-purple-700"
  }

  const getRoleIcon = (roleName) => {
    const icons = {
      Admin: "👑",
      Manager: "👨‍💼",
      User: "👤",
      Guest: "👥",
    }
    return icons[roleName] || "🔐"
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Gắn Role cho {displayName}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {isBulkAssign
                  ? `Chọn role để gắn cho ${users.length} users đã chọn`
                  : `Chọn role để gắn cho user ${user?.userName}`}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
              disabled={loading}
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6">
            {/* User Info (for single user) */}
            {!isBulkAssign && user && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{user.userName?.charAt(0)?.toUpperCase() || "U"}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user.userName}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <span
                            key={role.id}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {role.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">Chưa có role</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bulk Users Info */}
            {isBulkAssign && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Users được chọn ({users.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {users.map((targetUser) => (
                    <div key={targetUser.id} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {targetUser.userName?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <span className="text-gray-700 truncate">{targetUser.userName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Role Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Chọn Role ({selectedRoles.length} đã chọn)</h3>

              {roles.length === 0 ? (
                <div className="text-center py-8">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <p className="text-gray-500">Không có role nào để gắn</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <label
                      key={role.id}
                      className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedRoles.includes(role.id)
                          ? `${getRoleColor(role.name)} border-current`
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(role.id)}
                        onChange={() => handleRoleToggle(role.id)}
                        className="sr-only"
                      />

                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-2xl">{getRoleIcon(role.name)}</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{role.name}</div>
                          <div className="text-sm text-gray-600">ID: #{role.id}</div>
                          <div className="text-xs text-gray-500 mt-1">{role.permissionCount || 0} quyền</div>
                        </div>
                      </div>

                      {selectedRoles.includes(role.id) && (
                        <div className="absolute top-2 right-2">
                          <svg className="w-5 h-5 text-current" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedRoles.length > 0 && <span>Đã chọn {selectedRoles.length} role</span>}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading || selectedRoles.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                {loading ? "Đang gắn..." : "Gắn Role"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AssignRoleModal
