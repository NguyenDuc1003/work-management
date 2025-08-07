"use client"
import DatePicker from "react-datepicker"
import { hasPermission } from "../services/authService"

const AddTaskRow = ({
  groupId,
  isAdding,
  newTaskData,
  statusOptions,
  onStartAdding,
  onCancelAdding,
  onSaveTask,
  onUpdateField,
}) => {
  const getStatusConfig = (status) => {
    return statusOptions.find((option) => option.value === status) || statusOptions[0]
  }

  if (isAdding) {
    return (
      <tr className="border-t bg-green-50">
        <td className="p-3">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" disabled />
        </td>

        {/* Task Name Input */}
        <td className="p-3">
          <input
            type="text"
            placeholder="Nhập tên task..."
            value={newTaskData?.name || ""}
            onChange={(e) => onUpdateField(groupId, "name", e.target.value)}
            className="w-full text-sm text-gray-900 border border-green-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />
        </td>

        {/* Status Dropdown */}
        <td className="p-3">
          <select
            value={newTaskData?.status || "todo"}
            onChange={(e) => onUpdateField(groupId, "status", e.target.value)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white border-none outline-none ${
              getStatusConfig(newTaskData?.status || "todo").bg
            }`}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </td>

        {/* Due Date */}
        <td className="p-3">
          <DatePicker
            selected={newTaskData?.dueDate}
            onChange={(date) => onUpdateField(groupId, "dueDate", date)}
            dateFormat="MMM d"
            className="text-sm text-gray-600 border border-green-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </td>

        {/* Timeline */}
        <td className="p-3">
          <div className="flex items-center gap-1">
            <DatePicker
              selected={newTaskData?.timelineStart}
              onChange={(date) => onUpdateField(groupId, "timelineStart", date)}
              dateFormat="MMM d"
              className="text-xs bg-green-500 text-white rounded px-2 py-1 border-none w-16 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <span className="text-xs text-gray-400">-</span>
            <DatePicker
              selected={newTaskData?.timelineEnd}
              onChange={(date) => onUpdateField(groupId, "timelineEnd", date)}
              dateFormat="MMM d"
              className="text-xs bg-green-500 text-white rounded px-2 py-1 border-none w-16 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </td>

        {/* Notes */}
        <td className="p-3">
          <input
            type="text"
            placeholder="Ghi chú..."
            value={newTaskData?.notes || ""}
            onChange={(e) => onUpdateField(groupId, "notes", e.target.value)}
            className="w-full text-sm text-gray-600 border border-green-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </td>

        {/* Actions */}
        <td className="p-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSaveTask(groupId)}
              className="p-1 text-green-600 hover:text-green-800"
              title="Lưu task"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button onClick={() => onCancelAdding(groupId)} className="p-1 text-red-600 hover:text-red-800" title="Hủy">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    hasPermission("ADD_TASKS") ? (
      <tr className="border-t bg-blue-50">
        <td className="p-3"></td>
        <td className="p-3">
          <button
            onClick={() => onStartAdding(groupId)}
            className="w-full text-left text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add task
          </button>
        </td>
        <td className="p-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white bg-gray-400">
            Todo
          </span>
        </td>
        <td className="p-3">
          <span className="text-xs text-gray-400">Today</span>
        </td>
        <td className="p-3">
          <span className="text-xs text-gray-400">Today - Tomorrow</span>
        </td>
        <td className="p-3">
          <span className="text-xs text-gray-400">Notes...</span>
        </td>
        <td className="p-3">
          <button
            onClick={() => onStartAdding(groupId)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Thêm task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </td>
      </tr>
    ) : null
  )
}

export default AddTaskRow
