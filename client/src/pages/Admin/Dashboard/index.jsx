import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { FiActivity, FiArrowUpRight, FiCalendar, FiCreditCard, FiDollarSign, FiPlus, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import api from '../../../services/api'

const fallbackRevenue = [{ name: 'Jan', value: 12000 }, { name: 'Feb', value: 16000 }, { name: 'Mar', value: 13000 }, { name: 'Apr', value: 19000 }, { name: 'May', value: 23000 }, { name: 'Jun', value: 21000 }]
const emptyDashboard = { stats: { patients: 0, doctors: 0, appointments: 0, revenue: 0, departments: 0, occupancy: 0 }, charts: { monthRevenue: [], departmentPerformance: [] }, upcoming: [], latestPatients: [], availableDoctors: [] }

export default function Dashboard() {
  const [data, setData] = useState(emptyDashboard)
  useEffect(() => { api.get('/admin/dashboard').then(({ data: response }) => setData(response.data)).catch(() => setData(emptyDashboard)) }, [])
  const stats = data.stats || {}
  const cards = [['Total Patients', stats.patients, FiUsers, '+12.5%'], ['Doctors', stats.doctors, FiActivity, '+4.8%'], ['Appointments', stats.appointments, FiCalendar, '+18.2%'], ['Revenue', `â‚¹${Number(stats.revenue || 0).toLocaleString('en-IN')}`, FiDollarSign, '+9.4%']]
  const revenue = data.charts?.monthRevenue?.length ? data.charts.monthRevenue : fallbackRevenue

  return <div className="admin-page">
    <div className="page-heading"><div><p>ADMIN DASHBOARD</p><h1>Good morning, Administrator</h1><span>Hereâ€™s whatâ€™s happening across MediSphere today.</span></div><Link className="admin-primary" to="/admin/patients"><FiPlus /> Quick action</Link></div>
    <section className="stat-grid">{cards.map(([label, value, Icon, trend]) => <article className="admin-stat" key={label}><span className="stat-icon"><Icon /></span><div><small>{label}</small><h2>{value ?? 'â€”'}</h2><em>{trend} <i>vs last month</i></em></div></article>)}</section>
    <section className="dashboard-grid">
      <article className="panel revenue-panel"><div className="panel-head"><div><h3>Monthly revenue</h3><p>Payments received this year</p></div><button>Monthly â–¾</button></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenue}><defs><linearGradient id="revenue" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#15a7a2" stopOpacity=".35" /><stop offset="1" stopColor="#15a7a2" stopOpacity="0" /></linearGradient></defs><CartesianGrid vertical={false} stroke="#e7f0f1" /><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="value" stroke="#0b9e9b" strokeWidth={3} fill="url(#revenue)" /></AreaChart></ResponsiveContainer></div></article>
      <article className="panel occupancy"><h3>Hospital occupancy</h3><div className="occupancy-ring"><b>{stats.occupancy || 0}%</b><span>Occupied</span></div><div className="occupancy-list"><span><i /> Available <b>{100 - (stats.occupancy || 0)}%</b></span><span><i /> Occupied <b>{stats.occupancy || 0}%</b></span></div></article>
      <article className="panel recent-table"><div className="panel-head"><div><h3>Upcoming appointments</h3><p>Today and upcoming consultations</p></div><Link to="/admin/appointments">View all <FiArrowUpRight /></Link></div><div className="mini-table">{data.upcoming?.length ? data.upcoming.map((appointment) => <div key={appointment._id}><span className="avatar-mini">{appointment.patient?.name?.[0]}</span><div><b>{appointment.patient?.name}</b><small>{appointment.doctor?.name} Â· {new Date(appointment.scheduledAt).toLocaleDateString()}</small></div><em>{appointment.status}</em></div>) : <p className="empty-line">No upcoming appointments yet.</p>}</div></article>
      <article className="panel quick-actions"><h3>Quick actions</h3>{[['Add patient', '/admin/patients', FiUsers], ['Add doctor', '/admin/doctors', FiActivity], ['Book appointment', '/admin/appointments', FiCalendar], ['Generate bill', '/admin/billing', FiCreditCard]].map(([label, path, Icon]) => <Link to={path} key={label}><span><Icon /></span>{label}<FiArrowUpRight /></Link>)}</article>
      <article className="panel doctor-availability"><div className="panel-head"><div><h3>Doctor availability</h3><p>Live status overview</p></div><span className="online-dot">Live</span></div>{data.availableDoctors?.length ? data.availableDoctors.map((doctor) => <div className="availability-row" key={doctor._id}><span className="avatar-mini">{doctor.name?.[0]}</span><div><b>{doctor.name}</b><small>{doctor.department?.name || doctor.specialization}</small></div><em>Available</em></div>) : <p className="empty-line">No available doctors to show.</p>}</article>
      <article className="panel performance"><h3>Department performance</h3><div className="chart pie-chart"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={data.charts?.departmentPerformance || []} dataKey="value" nameKey="name" innerRadius={46} outerRadius={70} fill="#0b9e9b" /><Tooltip /></PieChart></ResponsiveContainer></div></article>
    </section>
  </div>
}
