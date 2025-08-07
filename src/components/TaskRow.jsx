"use client"

import { useState } from "react"
import DatePicker from "react-datepicker"
import { hasPermission } from "../services/authService"

const TaskRow = ({ task, groupId, onUpdateTask, onDeleteTask, statusOptions }) => {
  const [editingTask, setEditingTask] = useState(false)

  const getStatusConfig = (status) => {
    return statusOptions.find((option) => option.value === status) || statusOptions[0]
  }

  const statusConfig = getStatusConfig(task.status)

  return (
    <tr className="border-t hover:bg-gray-50">
  <td className="p-3">
    <input
      type="checkbox"
      className="w-4 h-4 rounded border-gray-300"
      checked={task.status === "done"}
      onChange={(e) => {
        if (hasPermission("UPDATE_TASKS")) {
          console.log("Updating status (checkbox) - groupId:", groupId, "taskId:", task.id, "value:", e.target.checked ? "done" : "todo")
          onUpdateTask(groupId, task.id, { status: e.target.checked ? "done" : "todo" })
        }
      }}
      disabled={!hasPermission("UPDATE_TASKS")}
    />
  </td>

  <td className="p-3">
    {editingTask && hasPermission("UPDATE_TASKS") ? (
      <input
        type="text"
        defaultValue={task.name}
        className="w-full text-sm text-gray-900 border border-gray-300 rounded px-2 py-1"
        onBlur={(e) => {
          console.log("Updating name - groupId:", groupId, "taskId:", task.id, "value:", e.target.value)
          onUpdateTask(groupId, task.id, { name: e.target.value })
          setEditingTask(false)
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onUpdateTask(groupId, task.id, { name: e.target.value })
            setEditingTask(false)
          }
        }}
        autoFocus
      />
    ) : (
      <span
        className={`text-sm ${hasPermission("UPDATE_TASKS") ? "cursor-pointer" : ""} ${
          task.status === "done" ? "line-through text-gray-500" : "text-gray-900"
        }`}
        onClick={() => hasPermission("UPDATE_TASKS") && setEditingTask(true)}
      >
        {task.name}
      </span>
    )}
  </td>

  <td className="p-3">
    <select
      value={task.status}
      onChange={(e) => {
        if (hasPermission("UPDATE_TASKS")) {
          console.log("Updating status - groupId:", groupId, "taskId:", task.id, "value:", e.target.value)
          onUpdateTask(groupId, task.id, { status: e.target.value })
        }
      }}
      disabled={!hasPermission("UPDATE_TASKS")}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white border-none outline-none ${statusConfig.bg} ${
        !hasPermission("UPDATE_TASKS") ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </td>

  <td className="p-3">
    <DatePicker
      selected={task.dueDate}
      onChange={(date) => {
        if (hasPermission("UPDATE_TASKS")) {
          console.log("Updating dueDate - groupId:", groupId, "taskId:", task.id, "value:", date)
          onUpdateTask(groupId, task.id, { dueDate: date })
        }
      }}
      disabled={!hasPermission("UPDATE_TASKS")}
      dateFormat="MMM d"
      className={`text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 w-full ${
        !hasPermission("UPDATE_TASKS") ? "opacity-50 cursor-not-allowed" : ""
      }`}
    />
  </td>

  <td className="p-3">
    <div className="flex items-center gap-1">
      <DatePicker
        selected={task.timelineStart}
        onChange={(date) => {
          if (hasPermission("UPDATE_TASKS")) {
            console.log("Updating timelineStart - groupId:", groupId, "taskId:", task.id, "value:", date)
            onUpdateTask(groupId, task.id, { timelineStart: date })
          }
        }}
        disabled={!hasPermission("UPDATE_TASKS")}
        dateFormat="MMM d"
        className={`text-xs bg-blue-500 text-white rounded px-2 py-1 border-none w-16 ${
          !hasPermission("UPDATE_TASKS") ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      <span className="text-xs text-gray-400">-</span>
      <DatePicker
        selected={task.timelineEnd}
        onChange={(date) => {
          if (hasPermission("UPDATE_TASKS")) {
            console.log("Updating timelineEnd - groupId:", groupId, "taskId:", task.id, "value:", date)
            onUpdateTask(groupId, task.id, { timelineEnd: date })
          }
        }}
        disabled={!hasPermission("UPDATE_TASKS")}
        dateFormat="MMM d"
        className={`text-xs bg-blue-500 text-white rounded px-2 py-1 border-none w-16 ${
          !hasPermission("UPDATE_TASKS") ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
    </div>
  </td>

  <td className="p-3">
    <input
      type="text"
      value={task.notes ?? ""}
      onChange={(e) => {
        if (hasPermission("UPDATE_TASKS")) {
          console.log("Updating notes - groupId:", groupId, "taskId:", task.id, "value:", e.target.value)
          onUpdateTask(groupId, task.id, { notes: e.target.value })
        }
      }}
      disabled={!hasPermission("UPDATE_TASKS")}
      className={`w-full text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 ${
        !hasPermission("UPDATE_TASKS") ? "opacity-50 cursor-not-allowed" : ""
      }`}
      placeholder="Add notes..."
    />
  </td>

  <td className="p-3">
    {hasPermission("DELETE_TASKS") && (
      <button
        onClick={() => onDeleteTask(groupId, task.id)}
        className="p-1 text-gray-400 hover:text-red-600"
        title="Xóa task"
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
  </td>
</tr>
  )
}

export default TaskRow
