import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AdminNavbar from '../components/Navbar/AdminNavbar'
import PageTransition from '../components/UI/PageTransition'

function AdminLayout() { const [dark, setDark] = useState(false); const [collapsed, setCollapsed] = useState(false); return <div className={`admin-shell ${dark ? 'admin-dark' : ''}`}><Sidebar collapsed={collapsed} setCollapsed={setCollapsed} /><div className="admin-main"><AdminNavbar dark={dark} setDark={setDark} /><main className="admin-content"><PageTransition><Outlet /></PageTransition></main></div></div> }
export default AdminLayout
