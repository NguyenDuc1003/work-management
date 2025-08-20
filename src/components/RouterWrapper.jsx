import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from './Layout'
import TaskBoard from './task-board'
import EmployeeManagement from './employee-management'
import DepartmentManagement from './department-management'
import DepartmentDetail from './DepartmentDetail'
import ProjectManagement from './project-management'
import Settings from './settings'
import PersonalTasks from './personal-tasks'
import ChatRoom from './chat-room'
import TaskBoardNew from './TaskBoardNew'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import RolePermissionMatrix from './RolePermissionMatrix'
import UserDetailPage from '../pages/UserDetailPage.jsx'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import RoleProtectedRoute from './RoleProtectedRoute'
import KanbanPage from '../components/ProjectDetail.jsx' // <- đường dẫn đúng với file của bạn


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    )
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    )
  },
  
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <TaskBoard />
      },
      {
        path: "tasks",
        element: <TaskBoard />
      },
      {
        path: "employees",
        element: (
          <RoleProtectedRoute requiredPermission="USER_MANAGEMENT">
            <EmployeeManagement />
          </RoleProtectedRoute>
        )
      },
      {
        path: "employees/:id",
        element: (
          <RoleProtectedRoute requiredPermission="USER_MANAGEMENT">
            <UserDetailPage />
          </RoleProtectedRoute>
        )
      },
      {
        path: "departments", 
        element: (
          <RoleProtectedRoute requiredPermission="DEPARTMENT_MANAGEMENT">
            <DepartmentManagement />
          </RoleProtectedRoute>
        )
      },
      {
        path: "departments/:id",
        element: (
          <RoleProtectedRoute requiredPermission="DEPARTMENT_MANAGEMENT">
            <DepartmentDetail />
          </RoleProtectedRoute>
        )
      },
      {
        path: "projects",
        element: (
          <RoleProtectedRoute requiredPermission="PROJECT_MANAGEMENT">
            <ProjectManagement />
          </RoleProtectedRoute>
        )
      },
      {
        path: "personal",
        element: <PersonalTasks />
      },
      {
        path: "personalDemo",
        element: <TaskBoardNew />
      },
      {
        path: "chat",
        element: <ChatRoom />
      },
      {
        path: "settings",
        element: <Settings />
      },
      {
        path: "kanban",
        element: <KanbanPage/>
      },
      {
        path: "role-permission",
        element: (
          <RoleProtectedRoute requiredPermission="PHANQUYEN">
            <RolePermissionMatrix />
          </RoleProtectedRoute>
        )
      }
    ]
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }
})

export default function RouterWrapper() {
  return <RouterProvider router={router} />
}
