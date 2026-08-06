import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { FiActivity, FiBell, FiCalendar, FiClipboard, FiCreditCard, FiFileText, FiLogOut, FiMessageCircle, FiSearch, FiUser, FiUsers } from 'react-icons/fi'
import useAuth from '../hooks/useAuth'
import PageTransition from '../components/UI/PageTransition'

const navigation = {
  doctor: [['Dashboard', 'dashboard', FiActivity], ['Appointments', 'appointments', FiCalendar], ['Patients', 'patients', FiUsers], ['Prescriptions', 'prescriptions', FiClipboard], ['Messages', 'messages', FiMessageCircle], ['Profile', 'profile', FiUser]],
  patient: [['Dashboard', 'dashboard', FiActivity], ['Appointments', 'appointments', FiCalendar], ['Medical records', 'medical-records', FiFileText], ['Prescriptions', 'prescriptions', FiClipboard], ['Lab reports', 'lab-reports', FiFileText], ['Bills & payments', 'bills', FiCreditCard], ['Profile', 'profile', FiUser]],
  receptionist: [['Dashboard', 'dashboard', FiActivity], ['Register patient', 'registration', FiUsers], ['Appointments', 'appointments', FiCalendar], ['Queue', 'queue', FiClipboard], ['Billing', 'billing', FiCreditCard], ['Search patients', 'search', FiSearch], ['Profile', 'profile', FiUser]],
}

export default function RoleWorkspace({ role }) {
  const { user, logout } = useAuth(); const navigate = useNavigate()
  return <div className="admin-shell"><aside className="admin-sidebar role-sidebar"><div className="admin-side-brand"><span className="brand-mark"><span /></span><b>Medi<span>Sphere</span></b></div><p className="side-label">{role.toUpperCase()} PORTAL</p><nav>{navigation[role].map(([label, path, Icon]) => <NavLink key={path} to={`/${role}/${path}`}><Icon /><span>{label}</span></NavLink>)}</nav><button className="side-logout" onClick={async () => { await logout(); navigate('/login') }}><FiLogOut /><span>Logout</span></button></aside><div className="admin-main"><header className="admin-navbar"><div><p className="nav-role">{role} workspace</p><b>Care connected</b></div><div className="admin-nav-actions"><button aria-label="Notifications"><FiBell /></button><div className="admin-profile"><span>{user?.name?.[0] || 'U'}</span><div><b>{user?.name}</b><small>{role}</small></div></div></div></header><main className="admin-content"><PageTransition><Outlet /></PageTransition></main></div></div>
}
