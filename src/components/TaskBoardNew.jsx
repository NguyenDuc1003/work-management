"use client"

import { useState, useEffect } from "react"

import { hasPermission } from '../services/authService'
import { deleteTask as deleteTaskApi, updateTask as updateTaskApi, createTask as createTaskApi } from "../api/taskApi"
import {
  getGroupsByBoard,
  createGroup,
  updateGroup,
  deleteGroup as deleteGroupApi,
  fetchGroupById,
} from "../api/groupApi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"
import { fetchBoards, createBoard, updateBoard, deleteBoard } from "../api/boardApi"
import TaskGroup from "./TaskGroup"
import "react-datepicker/dist/react-datepicker.css"

const TaskBoardNew = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState("")
  const [workspaces, setWorkspaces] = useState([])
  const [selectedWorkspace, setSelectedWorkspace] = useState(null)
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [addingTaskToGroup, setAddingTaskToGroup] = useState(null)
  const [newTaskInputs, setNewTaskInputs] = useState({})
  const [groups, setGroups] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // Add board management states
  const [showBoardDropdown, setShowBoardDropdown] = useState(false)
  const [editingBoardId, setEditingBoardId] = useState(null)
  const [editingBoardName, setEditingBoardName] = useState("")
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [newBoardName, setNewBoardName] = useState("")

  const statusOptions = [
    { value: "todo", label: "Todo", bg: "bg-gray-500", icon: "⚪" },
    { value: "working", label: "Working on it", bg: "bg-orange-500", icon: "🟠" },
    { value: "done", label: "Done", bg: "bg-green-500", icon: "✅" },
    { value: "expired", label: "Expired", bg: "bg-red-500", icon: "❗" },
  ]

  // Helper functions
  const getCurrentWorkspace = () => workspaces.find((w) => w.id === selectedWorkspace)
  const getCurrentBoard = () => {
    const workspace = getCurrentWorkspace()
    return workspace?.boards.find((b) => b.id === selectedBoard)
  }

  // Load boards from API
  useEffect(() => {
    const loadBoardsFromAPI = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const res = await fetchBoards()
        const boardsFromServer = res.data

        const newWorkspace = {
          id: "1",
          name: "Main workspace",
          boards: boardsFromServer.map((b) => ({
            id: b.boardId.toString(),
            name: b.boardName,
            active: false,
          })),
        }

        setWorkspaces([newWorkspace])
        if (boardsFromServer.length > 0 && !selectedBoard) {
          setSelectedWorkspace("1")
          setSelectedBoard(boardsFromServer[0].boardId.toString())
        }
      } catch (error) {
        console.error("Lỗi load boards:", error)
        setError("Không thể tải danh sách boards. Vui lòng thử lại.")
      } finally {
        setIsLoading(false)
      }
    }

    loadBoardsFromAPI()
  }, [])

  // Load groups from API when selectedBoard changes
  useEffect(() => {
    if (selectedBoard) {
      fetchGroupsFromAPI()
    }
  }, [selectedBoard])

  const fetchGroupsFromAPI = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await getGroupsByBoard(selectedBoard)
      console.log("Dữ liệu groups từ API:", res.data) // Log để debug
      const fetchedGroups = res.data.map((g) => ({
        id: g.groupId.toString(),
        name: g.groupName,
        color: "text-blue-600",
        borderColor: "border-l-blue-500",
        collapsed: false,
        tasks: (g.tasks || [])
          .map((task) => {
            if (!task.id) {
              console.warn(`Task thiếu id trong group ${g.groupName}`, task)
              return null
            }
            return {
              ...task,
              id: task.id.toString(),
              taskId: task.id.toString(),
              name: task.name ?? "", // Mặc định là chuỗi rỗng
              status: task.status ?? "todo", // Mặc định là "todo"
              notes: task.notes ?? "", // Mặc định là chuỗi rỗng
              dueDate: task.dueDate ?? null,
              timelineStart: task.timelineStart ?? null,
              timelineEnd: task.timelineEnd ?? null,
            }
          })
          .filter((task) => task !== null),
      }))
      setGroups(fetchedGroups)
    } catch (error) {
      console.error("Lỗi tải group từ API:", error)
      setError("Không thể tải danh sách groups. Vui lòng thử lại.")
    } finally {
      setIsLoading(false)
    }
  }

  // Group management functions
  const toggleGroup = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => (group.id === groupId ? { ...group, collapsed: !group.collapsed } : group)),
    )
  }

  const addGroup = async () => {
    const groupDTO = {
      groupName: "New Group",
      boardId: Number(selectedBoard),
      tasks: [],
    }

    try {
      const res = await createGroup(groupDTO)
      const newGroup = {
        id: res.data.groupId.toString(),
        name: res.data.groupName,
        color: "text-purple-600",
        borderColor: "border-l-purple-500",
        collapsed: false,
        tasks: [],
      }
      setGroups((prevGroups) => [...prevGroups, newGroup])
    } catch (error) {
      console.error("Lỗi tạo group:", error)
      setError("Không thể tạo group. Vui lòng thử lại.")
    }
  }

  const deleteGroup = async (groupId) => {
    if (!window.confirm("Bạn có chắc muốn xóa group này?")) return

    try {
      await deleteGroupApi(groupId)
      setGroups((prevGroups) => prevGroups.filter((g) => g.id !== groupId.toString()))
    } catch (error) {
      console.error("Lỗi xoá group:", error)
      setError("Không thể xóa group. Vui lòng thử lại.")
    }
  }

  const updateGroupName = async (groupId, newName) => {
    try {
      await updateGroup(groupId, {
        groupName: newName,
        boardId: Number(selectedBoard),
        tasks: [],
      })
      setGroups((prevGroups) => prevGroups.map((g) => (g.id === groupId ? { ...g, name: newName } : g)))
    } catch (error) {
      console.error("Lỗi cập nhật group:", error)
      setError("Không thể cập nhật group. Vui lòng thử lại.")
    }
  }

  const refreshGroupTasks = async (groupId) => {
    try {
      const res = await fetchGroupById(groupId)
      const updatedGroupRaw = res.data
      const updatedGroup = {
        id: updatedGroupRaw.groupId.toString(),
        name: updatedGroupRaw.groupName,
        color: "text-blue-600",
        borderColor: "border-l-blue-500",
        collapsed: false,
        tasks: updatedGroupRaw.tasks || [],
      }

      setGroups((prevGroups) => prevGroups.map((g) => (g.id === groupId ? updatedGroup : g)))
    } catch (err) {
      console.error("Lỗi load lại group:", err)
      setError("Không thể tải lại group. Vui lòng thử lại.")
    }
  }

  // Task management functions
  const updateTask = async (groupId, taskId, updates) => {
    try {
      const group = groups.find((g) => String(g.id) === String(groupId))
      if (!group) {
        console.error("❌ Không tìm thấy group:", groupId)
        return
      }

      const oldTask = group.tasks.find((task) => String(task.taskId) === String(taskId))
      if (!oldTask) {
        console.error("❌ Không tìm thấy task:", taskId)
        return
      }

      // Gộp dữ liệu cũ và mới
      const fullUpdate = {
        ...oldTask,
        ...updates,
      }

      // Format lại các trường ngày nếu là Date object
      const formatDate = (date) => (date instanceof Date ? date.toISOString().split("T")[0] : date)

      fullUpdate.dueDate = formatDate(fullUpdate.dueDate)
      fullUpdate.timelineStart = formatDate(fullUpdate.timelineStart)
      fullUpdate.timelineEnd = formatDate(fullUpdate.timelineEnd)

      // Không gửi các trường không cần thiết
      delete fullUpdate.taskId // hoặc id nếu không cần
      delete fullUpdate.createdAt // nếu có

      // 🛰 Gửi dữ liệu lên server
      await updateTaskApi(taskId, fullUpdate)

      // ✅ Cập nhật lại giao diện
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          String(group.id) === String(groupId)
            ? {
              ...group,
              tasks: group.tasks.map((task) =>
                String(task.taskId) === String(taskId) ? { ...task, ...updates } : task,
              ),
            }
            : group,
        ),
      )
    } catch (error) {
      console.error("❌ Lỗi cập nhật task:", error)
      setError("Không thể cập nhật task. Vui lòng thử lại.")
    }
  }

  // Sửa deleteTask
  const deleteTask = async (groupId, taskId) => {
    if (!taskId) {
      console.error("❌ Task ID không hợp lệ:", taskId)
      setError("Task không tồn tại hoặc ID không hợp lệ.")
      return
    }

    if (!window.confirm("Bạn có chắc muốn xóa task này?")) return

    try {
      console.log("🗑️ Xoá taskId:", taskId)
      await deleteTaskApi(taskId)
      setGroups((prevGroups) =>
        prevGroups.map((group) => {
          if (group.id === String(groupId)) {
            return {
              ...group,
              tasks: group.tasks.filter((task) => String(task.id) !== String(taskId)),
            }
          }
          return group
        }),
      )
    } catch (error) {
      console.error("❌ Lỗi xoá task:", error)
      setError("Đã xảy ra lỗi khi xoá task.")
    }
  }

  // Add task functions
  const startAddingTask = (groupId) => {
    setAddingTaskToGroup(groupId)
    setNewTaskInputs((prev) => ({
      ...prev,
      [groupId]: {
        name: "",
        status: "todo",
        dueDate: new Date(),
        timelineStart: new Date(),
        timelineEnd: new Date(Date.now() + 24 * 60 * 60 * 1000),
        notes: "",
      },
    }))
  }

  const cancelAddingTask = (groupId) => {
    setAddingTaskToGroup(null)
    setNewTaskInputs((prev) => {
      const updatedInputs = { ...prev }
      delete updatedInputs[groupId]
      return updatedInputs
    })
  }

  const saveNewTask = async (groupId) => {
    const taskData = newTaskInputs[groupId]
    if (!taskData?.name?.trim()) return

    try {
      const res = await createTaskApi({ ...taskData, groupId: Number(groupId) })
      const created = res.data

      // ✅ Trường hợp backend trả đủ dữ liệu
      if (created?.id) {
        const createdTask = {
          id: created.id.toString(),
          taskId: created.id.toString(),
          name: created.name ?? "",
          status: created.status ?? "todo",
          notes: created.notes ?? "",
          dueDate: created.dueDate ? new Date(created.dueDate) : null,
          timelineStart: created.timelineStart ? new Date(created.timelineStart) : null,
          timelineEnd: created.timelineEnd ? new Date(created.timelineEnd) : null,
        }

        setGroups((prevGroups) =>
          prevGroups.map((group) =>
            group.id === groupId ? { ...group, tasks: [...group.tasks, createdTask] } : group,
          ),
        )
      } else {
        // ❗ Nếu không có id thì gọi lại API để refresh group từ backend
        console.warn("⚠ Task mới không có ID → gọi lại refreshGroupTasks")
        await refreshGroupTasks(groupId)
      }
    } catch (error) {
      console.error("Lỗi tạo task:", error)
      setError("Không thể tạo task. Vui lòng thử lại.")
    }

    setAddingTaskToGroup(null)
    setNewTaskInputs((prev) => {
      const updatedInputs = { ...prev }
      delete updatedInputs[groupId]
      return updatedInputs
    })
  }

  const updateNewTaskField = (groupId, field, value) => {
    setNewTaskInputs((prev) => ({
      ...prev,
      [groupId]: {
        ...prev[groupId],
        [field]: value,
      },
    }))
  }

  // Board management functions
  const handleBoardSwitch = (boardId) => {
    setSelectedBoard(boardId)
    setShowBoardDropdown(false)
  }

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) return
    
    try {
      const res = await createBoard({ boardName: newBoardName.trim() })
      const newBoard = {
        id: res.data.boardId.toString(),
        name: res.data.boardName,
        active: false
      }
      
      setWorkspaces(prevWorkspaces => 
        prevWorkspaces.map(workspace => 
          workspace.id === "1" 
            ? { ...workspace, boards: [...workspace.boards, newBoard] }
            : workspace
        )
      )
      
      setNewBoardName("")
      setShowCreateBoard(false)
      setSelectedBoard(newBoard.id)
    } catch (error) {
      console.error("Lỗi tạo board:", error)
      setError("Không thể tạo board mới. Vui lòng thử lại.")
    }
  }

  const handleUpdateBoard = async (boardId, newName) => {
    if (!newName.trim()) return
    
    try {
      await updateBoard(boardId, { boardName: newName.trim() })
      
      setWorkspaces(prevWorkspaces => 
        prevWorkspaces.map(workspace => ({
          ...workspace,
          boards: workspace.boards.map(board => 
            board.id === boardId 
              ? { ...board, name: newName.trim() }
              : board
          )
        }))
      )
      
      setEditingBoardId(null)
      setEditingBoardName("")
    } catch (error) {
      console.error("Lỗi cập nhật board:", error)
      setError("Không thể cập nhật board. Vui lòng thử lại.")
    }
  }

  const handleDeleteBoard = async (boardId) => {
    if (!window.confirm("Bạn có chắc muốn xóa board này?")) return
    
    try {
      await deleteBoard(boardId)
      
      setWorkspaces(prevWorkspaces => 
        prevWorkspaces.map(workspace => ({
          ...workspace,
          boards: workspace.boards.filter(board => board.id !== boardId)
        }))
      )
      
      // Switch to first available board or null
      const remainingBoards = workspaces[0]?.boards.filter(b => b.id !== boardId) || []
      if (remainingBoards.length > 0 && selectedBoard === boardId) {
        setSelectedBoard(remainingBoards[0].id)
      } else if (remainingBoards.length === 0) {
        setSelectedBoard(null)
      }
    } catch (error) {
      console.error("Lỗi xóa board:", error)
      setError("Không thể xóa board. Vui lòng thử lại.")
    }
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">

      <div className="flex flex-1 min-h-0">

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1 p-6 overflow-auto">
            {isLoading && <div className="text-center">Đang tải dữ liệu...</div>}
            {error && (
              <div className="text-center text-red-500">
                {error}
                <button onClick={fetchGroupsFromAPI} className="ml-2 text-blue-600 underline">
                  Thử lại
                </button>
              </div>
            )}
            {!isLoading && !error && (
              <>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DropdownMenu open={showBoardDropdown} onOpenChange={setShowBoardDropdown}>
                        <DropdownMenuTrigger className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
                          <h1 className="text-2xl font-bold text-gray-900">{getCurrentBoard()?.name || "Board"}</h1>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-64">
                          <div className="p-2 text-sm font-medium text-gray-700 border-b">Chọn Board</div>
                          
                          {/* List of boards */}
                          {getCurrentWorkspace()?.boards?.map((board) => (
                            <DropdownMenuItem
                              key={board.id} 
                              onClick={() => handleBoardSwitch(board.id)}
                              className={`flex items-center justify-between p-2 ${
                                selectedBoard === board.id ? "bg-blue-50 text-blue-600" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {editingBoardId === board.id ? (
                                  <input
                                    type="text"
                                    value={editingBoardName}
                                    onChange={(e) => setEditingBoardName(e.target.value)}
                                    onBlur={() => handleUpdateBoard(board.id, editingBoardName)}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        handleUpdateBoard(board.id, editingBoardName)
                                      } else if (e.key === "Escape") {
                                        setEditingBoardId(null)
                                        setEditingBoardName("")
                                      }
                                    }}
                                    autoFocus
                                    className="flex-1 px-2 py-1 text-sm border rounded"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                ) : (
                                  <>
                                    <span className="font-medium">{board.name}</span>
                                    {selectedBoard === board.id && (
                                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                    )}
                                  </>
                                )}
                              </div>
                              
                              {editingBoardId !== board.id && (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setEditingBoardId(board.id)
                                      setEditingBoardName(board.name)
                                    }}
                                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleDeleteBoard(board.id)
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 rounded"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </DropdownMenuItem>
                          ))}
                          
                          <DropdownMenuSeparator />
                          
                          {/* Create new board */}
                          {showCreateBoard ? (
                            <div className="p-2">
                              <input
                                type="text"
                                placeholder="Tên board mới..."
                                value={newBoardName}
                                onChange={(e) => setNewBoardName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleCreateBoard()
                                  } else if (e.key === "Escape") {
                                    setShowCreateBoard(false)
                                    setNewBoardName("")
                                  }
                                }}
                                autoFocus
                                className="w-full px-3 py-2 text-sm border rounded-lg"
                              />
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={handleCreateBoard}
                                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  Tạo
                                </button>
                                <button
                                  onClick={() => {
                                    setShowCreateBoard(false)
                                    setNewBoardName("")
                                  }}
                                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                >
                                  Hủy
                                </button>
                              </div>
                            </div>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => setShowCreateBoard(true)}
                              className="flex items-center gap-2 p-2 text-blue-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              Tạo board mới
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-2">
                      
                     <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">

                      <span>Tạo mới</span>
                      </button>
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Chia sẻ
                      </button>
                      <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        Xuất dữ liệu
                      </button>
                    </div>
                  </div>
                </div>

                {/* Task Groups */}
                <div className="space-y-6">
                  {groups.length > 0 ? (
                    groups.map((group) => (
                      <TaskGroup
                        key={group.id}
                        group={group}
                        statusOptions={statusOptions}
                        addingTaskToGroup={addingTaskToGroup}
                        newTaskInputs={newTaskInputs}
                        onToggleGroup={toggleGroup}
                        onUpdateGroupName={updateGroupName}
                        onDeleteGroup={deleteGroup}
                        onUpdateTask={updateTask}
                        onDeleteTask={deleteTask}
                        onStartAddingTask={startAddingTask}
                        onCancelAddingTask={cancelAddingTask}
                        onSaveNewTask={saveNewTask}
                        onUpdateNewTaskField={updateNewTaskField}
                      />
                    ))
                  ) : (
                    <div className="text-center text-gray-500">Không có group nào. Vui lòng tạo group mới.</div>
                  )}

                  {/* Add New Group Button */}
                  {hasPermission("ADD_GROUPS") && (
                    <button
                      onClick={addGroup}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg border border-dashed border-gray-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add new group
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskBoardNew
