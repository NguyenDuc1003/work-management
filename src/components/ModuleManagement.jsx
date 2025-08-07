"use client"

import { useEffect, useState } from "react"
import CreateModuleModal from "./CreateModuleModal"
import EditModuleModal from "./EditModuleModal"
import { getAllModules, createModule, updateModule, deleteModule } from "../api/moduleApi"

const ModuleManagement = ({ searchQuery }) => {
  const [modules, setModules] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingModule, setEditingModule] = useState(null)
  const [selectedModules, setSelectedModules] = useState([])

  useEffect(() => {
    getAllModules()
      .then((res) => setModules(res.data))
      .catch((err) => console.error("Lỗi khi tải modules:", err))
  }, [])

  const filteredModules = modules.filter((module) => module.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateModule = (moduleData) => {
    createModule(moduleData)
      .then((res) => {
        setModules((prev) => [...prev, res.data])
        setShowCreateModal(false)
      })
      .catch((err) => console.error("Lỗi tạo module:", err))
  }

  const handleUpdateModule = (moduleData) => {
    updateModule(editingModule.id, moduleData)
      .then((res) => {
        setModules((prev) => prev.map((m) => (m.id === editingModule.id ? res.data : m)))
        setEditingModule(null)
      })
      .catch((err) => console.error("Lỗi cập nhật module:", err))
  }

  const handleDeleteModule = (moduleId) => {
    if (window.confirm("Bạn có chắc muốn xóa module này?")) {
      deleteModule(moduleId)
        .then(() => {
          setModules((prev) => prev.filter((m) => m.id !== moduleId))
        })
        .catch((err) => {
          alert("Không thể xóa module vì có quyền liên kết.")
        })
    }
  }

  const handleBulkDelete = async () => {
    if (selectedModules.length === 0) return

    if (window.confirm(`Bạn có chắc muốn xóa ${selectedModules.length} module(s)?`)) {
      for (const id of selectedModules) {
        try {
          await deleteModule(id)
        } catch (err) {
          alert(`Không thể xóa module ID ${id}. Có thể đang được liên kết.`)
        }
      }
      setModules((prev) => prev.filter((m) => !selectedModules.includes(m.id)))
      setSelectedModules([])
    }
  }

  const toggleSelectModule = (moduleId) => {
    setSelectedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  const toggleSelectAll = () => {
    setSelectedModules(selectedModules.length === filteredModules.length ? [] : filteredModules.map((m) => m.id))
  }

  const getModuleIcon = (name) => {
    if (name.includes("User")) return "👥"
    if (name.includes("Task")) return "✅"
    if (name.includes("Project")) return "📁"
    if (name.includes("Report")) return "📊"
    return "📦"
  }

  const getModuleColor = (name) => {
    if (name.includes("User")) return "bg-blue-500"
    if (name.includes("Task")) return "bg-green-500"
    if (name.includes("Project")) return "bg-purple-500"
    if (name.includes("Report")) return "bg-orange-500"
    return "bg-gray-500"
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="px-4 py-3 flex-shrink-0">
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Modules ({filteredModules.length})</h2>
            {selectedModules.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600">{selectedModules.length} selected</span>
                <button
                  onClick={handleBulkDelete}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1.5 text-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Module
          </button>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="flex-1 overflow-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredModules.map((module) => (
            <div key={module.id} className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedModules.includes(module.id)}
                    onChange={() => toggleSelectModule(module.id)}
                    className="w-3.5 h-3.5 rounded border-gray-300"
                  />
                  <div
                    className={`w-8 h-8 rounded-lg ${getModuleColor(module.name)} flex items-center justify-center text-white text-sm`}
                  >
                    {getModuleIcon(module.name)}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingModule(module)}
                    className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded"
                    title="Edit Module"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded"
                    title="Delete Module"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{module.name}</h3>
                <p className="text-xs text-gray-500">Module ID: #{module.id}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">4</div>
                    <div className="text-gray-500">Permissions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-gray-900">3</div>
                    <div className="text-gray-500">Roles</div>
                  </div>
                </div>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredModules.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <svg className="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-base font-medium text-gray-900 mb-1">No modules found</h3>
            <p className="text-sm text-gray-500">Get started by creating your first module.</p>
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateModuleModal onClose={() => setShowCreateModal(false)} onSubmit={handleCreateModule} />}
      {editingModule && (
        <EditModuleModal module={editingModule} onClose={() => setEditingModule(null)} onSubmit={handleUpdateModule} />
      )}
    </div>
  )
}

export default ModuleManagement
