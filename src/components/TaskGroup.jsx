"use client"

import { useState } from "react"
import TaskRow from "./TaskRow"
import AddTaskRow from "./AddTaskRow"
import { hasPermission } from "../services/authService"

const TaskGroup = ({
  group,
  statusOptions,
  addingTaskToGroup,
  newTaskInputs,
  onToggleGroup,
  onUpdateGroupName,
  onDeleteGroup,
  onUpdateTask,
  onDeleteTask,
  onStartAddingTask,
  onCancelAddingTask,
  onSaveNewTask,
  onUpdateNewTaskField,
}) => {
  const [editingGroup, setEditingGroup] = useState(null)

  const handleUpdateGroupName = (groupId, newName) => {
    onUpdateGroupName(groupId, newName)
    setEditingGroup(null)
  }

  const handleTaskUpdate = (taskId, field, value) => {
    onUpdateTask(group.id, taskId, { [field]: value })
  }

  const formatDate = (date) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("vi-VN")
  }

  return (
    <div className="bg-white rounded-lg border">
      {/* Group Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <button onClick={() => onToggleGroup(group.id)}>
            {group.collapsed ? (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </button>

          {editingGroup === group.id ? (
            <input
              type="text"
              defaultValue={group.name}
              className="font-semibold text-blue-600 bg-transparent border-b border-blue-300 outline-none"
              onBlur={(e) => handleUpdateGroupName(group.id, e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleUpdateGroupName(group.id, e.target.value)
                }
              }}
              autoFocus
            />
          ) : (
            <h3 className={`font-semibold ${group.color} cursor-pointer`} onClick={() => setEditingGroup(group.id)}>
              {group.name} ({group.tasks.length})
            </h3>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasPermission("UPDATE_GROUPS") && (
            <button
              onClick={() => setEditingGroup(group.id)}
              className="p-1 text-gray-400 hover:text-gray-600"
              title="Đổi tên group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}
          {hasPermission("DELETE_GROUPS") && (
            <button
              onClick={() => onDeleteGroup(group.id)}
              className="p-1 text-gray-400 hover:text-red-600"
              title="Xóa group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Task Table */}
      {!group.collapsed && (
        <div className={`border-l-4 ${group.borderColor}`}>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-12 p-3 text-left"></th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Task</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700 w-40">Status</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700 w-32">Due date</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700 w-40">Timeline</th>
                <th className="p-3 text-left text-sm font-medium text-gray-700">Notes</th>
                <th className="w-16 p-3"></th>
              </tr>
            </thead>
            <tbody>
              {group.tasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  groupId={group.id}
                  statusOptions={statusOptions}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                />
              ))}

              <AddTaskRow
                groupId={group.id}
                isAdding={addingTaskToGroup === group.id}
                newTaskData={newTaskInputs[group.id]}
                statusOptions={statusOptions}
                onStartAdding={onStartAddingTask}
                onCancelAdding={onCancelAddingTask}
                onSaveTask={onSaveNewTask}
                onUpdateField={onUpdateNewTaskField}
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TaskGroup
