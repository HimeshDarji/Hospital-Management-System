import { useEffect, useState } from 'react'
import {
  FiActivity,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiPlus,
  FiUsers
} from 'react-icons/fi'
import api from '../services/api'

const copy = { doctor: { dashboard: ['Clinical overview', 'Your appointments, patients and care activity in one view.'], appointments: ['Today’s appointments', 'Review your schedule and patient consultation status.'], patients: ['My patients', 'Access patient context and longitudinal care records.'], prescriptions: ['Prescriptions', 'Create and manage medication plans safely.'], messages: ['Secure messages', 'Coordinate care with your patients and care team.'], profile: ['My profile', 'Review your professional profile and availability.'] }, patient: { dashboard: ['My health dashboard', 'Your care, appointments and health records at a glance.'], appointments: ['Appointments', 'Book, review and manage your consultations.'], 'medical-records': ['Medical records', 'Your diagnoses, treatments, allergies and clinical timeline.'], prescriptions: ['Prescriptions', 'View medicines, dosage instructions and prescription history.'], 'lab-reports': ['Laboratory reports', 'Track requested tests and download completed reports.'], bills: ['Bills & payments', 'Review invoices, payment status and outstanding balances.'], profile: ['My profile', 'Keep your contact and health profile up to date.'] }, receptionist: { dashboard: ['Reception desk', 'Keep patient flow, appointments and billing on track.'], registration: ['Patient registration', 'Create complete patient records at check-in.'], appointments: ['Appointment booking', 'Schedule, update and coordinate appointments.'], queue: ['Queue management', 'Monitor check-ins and move patients through care.'], billing: ['Billing', 'Generate invoices and capture payments.'], search: ['Search patients', 'Find patient records quickly and accurately.'], profile: ['My profile', 'Manage your account details.'] } }

export default function RoleWorkspacePage({ role, page }) {
  const [summary, setSummary] = useState(null); const [error, setError] = useState(false)
  useEffect(() => { api.get('/clinical/summary').then(({ data }) => setSummary(data.data)).catch(() => setError(true)) }, [])
  const [title, subtitle] = copy[role][page]
  const counts = summary?.counts || {}
  return <div className="admin-page"><div className="page-heading"><div><p>{role.toUpperCase()} PORTAL</p><h1>{title}</h1><span>{subtitle}</span></div>{page === 'appointments' && <button className="admin-primary"><FiPlus /> Book appointment</button>}</div>{page === 'dashboard' && <section className="stat-grid"><Metric label="Appointments" value={counts.appointments} icon={FiCalendar}/><Metric label="Patients" value={counts.patients} icon={FiUsers}/><Metric label="Prescriptions" value={counts.prescriptions} icon={FiFileText}/><Metric label="Pending items" value={counts.pending} icon={FiClock}/></section>}<section className="panel"><div className="panel-head"><div><h3>{page === 'dashboard' ? 'Recent activity' : title}</h3><p>{error ? 'Live data will appear once the API is running.' : 'Secure, role-based hospital information.'}</p></div><FiCheckCircle color="#0a9e9a" /></div><div className="role-empty"><FiActivity /><h3>{page === 'dashboard' ? 'Your workspace is ready' : `No ${title.toLowerCase()} yet`}</h3><p>{page === 'dashboard' ? 'Use the navigation to manage the next step in your care workflow.' : 'Records will appear here as they are created by your care team.'}</p></div></section></div>
}
function Metric({ label, value = 0, icon: Icon }) { return <article className="admin-stat"><span className="stat-icon"><Icon /></span><div><small>{label}</small><h2>{value}</h2><em>Live <i>secure data</i></em></div></article> }
