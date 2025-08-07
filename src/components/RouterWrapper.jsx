import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from './Layout'
import TaskBoard from './task-board'
import EmployeeManagement from './employee-management'
import DepartmentManagement from './department-management'
import ProjectManagement from './project-management'
import Settings from './settings'
import PersonalTasks from './personal-tasks'
import ChatRoom from './chat-room'
import TaskBoardNew from './TaskBoardNew'
import LoginPage from '../pages/LoginPage.jsx'
import RegisterPage from '../pages/RegisterPage'
import RolePermissionMatrix from './RolePermissionMatrix'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  
  {
    path: "/app",
    element: <Layout />,
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
        element: <EmployeeManagement />
      },
      {
        path: "departments", 
        element: <DepartmentManagement />
      },
      {
        path: "projects",
        element: <ProjectManagement />
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
        path: "role-permission",
        element: <RolePermissionMatrix />
      }
    ]
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
