import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landing from '../pages/Landing'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import VerifyEmail from '../pages/VerifyEmail'
import ProtectedRoutes from './ProtectedRoutes'
import RoleRoutes from './RoleRoutes'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/Admin/Dashboard'
import Patients from '../pages/Admin/Patients'
import Doctors from '../pages/Admin/Doctors'
import Appointments from '../pages/Admin/Appointments'
import Departments from '../pages/Admin/Departments'
import Laboratory from '../pages/Admin/Laboratory'
import Billing from '../pages/Admin/Billing'
import Inventory from '../pages/Admin/Inventory'
import Staff from '../pages/Admin/Staff'
import Reports from '../pages/Admin/Reports'
import Notifications from '../pages/Admin/Notifications'
import Settings from '../pages/Admin/Settings'
import Profile from '../pages/Admin/Profile'
import RoleWorkspace from '../layouts/RoleWorkspace'
import RoleWorkspacePage from '../pages/RoleWorkspacePage'

function AppRoutes() {
  return <BrowserRouter><Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/verify-email/:token" element={<VerifyEmail />} />
    <Route element={<ProtectedRoutes />}>
      <Route element={<RoleRoutes allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="departments" element={<Departments />} />
          <Route path="laboratory" element={<Laboratory />} />
          <Route path="billing" element={<Billing />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff />} />
          <Route path="reports" element={<Reports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<RoleRoutes allowedRoles={['doctor']} />}><Route path="/doctor" element={<RoleWorkspace role="doctor" />}><Route index element={<Navigate to="dashboard" replace />} />{['dashboard','appointments','patients','prescriptions','messages','profile'].map(page=><Route key={page} path={page} element={<RoleWorkspacePage role="doctor" page={page} />} />)}</Route></Route>
      <Route element={<RoleRoutes allowedRoles={['receptionist']} />}><Route path="/receptionist" element={<RoleWorkspace role="receptionist" />}><Route index element={<Navigate to="dashboard" replace />} />{['dashboard','registration','appointments','queue','billing','search','profile'].map(page=><Route key={page} path={page} element={<RoleWorkspacePage role="receptionist" page={page} />} />)}</Route></Route>
      <Route element={<RoleRoutes allowedRoles={['patient']} />}><Route path="/patient" element={<RoleWorkspace role="patient" />}><Route index element={<Navigate to="dashboard" replace />} />{['dashboard','appointments','medical-records','prescriptions','lab-reports','bills','profile'].map(page=><Route key={page} path={page} element={<RoleWorkspacePage role="patient" page={page} />} />)}</Route></Route>
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></BrowserRouter>
}

export default AppRoutes
