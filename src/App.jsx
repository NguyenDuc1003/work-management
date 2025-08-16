import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import ErrorBoundary from './components/ErrorBoundary'
import { PageIsolator } from './components/PageIsolator'
import Layout from './components/Layout'
import TaskBoard from './components/task-board'
import EmployeeManagement from './components/employee-management'
import DepartmentManagement from './components/department-management'
import DepartmentDetail from './components/DepartmentDetail'
import ProjectManagement from './components/project-management'
import Settings from './components/settings'
import PersonalTasks from './components/personal-tasks'
import ChatRoom from './components/chat-room'
import TaskBoardNew from './components/TaskBoardNew'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Routes không cần Layout */}
            <Route path="/login" element={
              <ErrorBoundary>
                <LoginPage />
              </ErrorBoundary>
            } />
            
            {/* Routes có Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="home" element={<Navigate to="/tasks" replace />} />
              <Route path="task" element={<Navigate to="/tasks" replace />} />
              <Route path="loginpage" element={
                <ErrorBoundary>
                  <PageIsolator pageName="đăng nhập">
                    <TaskBoard />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="tasks" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Quản lý Công việc">
                    <TaskBoard />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="employees" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Quản lý Nhân viên">
                    <EmployeeManagement />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="departments" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Quản lý Phòng ban">
                    <DepartmentManagement />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="departments/:id" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Chi tiết Phòng ban">
                    <DepartmentDetail />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="projects" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Quản lý Dự án">
                    <ProjectManagement />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="personal" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Công việc Cá nhân">
                    <PersonalTasks />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="personalDemo" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Công việc Cá nhân can làm">
                    <TaskBoardNew />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="chat" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Phòng Chat">
                    <ChatRoom />
                  </PageIsolator>
                </ErrorBoundary>
              } />
              <Route path="settings" element={
                <ErrorBoundary>
                  <PageIsolator pageName="Cài đặt">
                    <Settings />
                  </PageIsolator>
                </ErrorBoundary>
              } />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
