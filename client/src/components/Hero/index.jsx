import { motion } from 'framer-motion'
import { FiArrowRight, FiCalendar, FiCheckCircle, FiHeart, FiShield, FiUsers } from 'react-icons/fi'

const floatTransition = { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
      <div className="shell hero-grid">
        <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="eyebrow"><span className="pulse-dot" /> Healthcare, beautifully connected</div>
          <h1>Smart hospital care, <em>in perfect sync.</em></h1>
          <p>Digitizing healthcare with secure, modern and intelligent hospital management software that brings every care team closer to patients.</p>
          <div className="hero-actions">
            <a className="button" href="#contact">Get started <FiArrowRight /></a>
            <a className="button button-light" href="#contact"><FiCalendar /> Book demo</a>
          </div>
          <div className="hero-trust"><FiShield /> Enterprise-grade security <span /> <FiCheckCircle /> Trusted by care teams</div>
        </motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
          <motion.div className="float-card float-card-top" animate={{ y: [-7, 7] }} transition={floatTransition}><FiHeart /><div><small>Patient health</small><strong>Excellent</strong></div><span className="heart-pulse" /></motion.div>
          <div className="dashboard-card">
            <div className="dash-top"><span className="mini-brand">M</span><span>Care overview</span><i /></div>
            <div className="dash-welcome"><div><small>Good morning,</small><strong>Dr. Harrison</strong></div><div className="avatar">DH</div></div>
            <div className="metric-row"><div><small>Appointments</small><strong>24</strong><span>+12.5%</span></div><div className="chart-bars">{[38, 55, 42, 72, 62, 86, 68].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div></div>
            <div className="patient-list"><small>Today’s patients</small>{['Olivia Martin', 'David Chen', 'Sophia Brown'].map((patient, i) => <div key={patient}><b className={`avatar avatar-${i}`}>{patient.split(' ').map((n) => n[0]).join('')}</b><span>{patient}</span><em>{['09:30 AM', '10:15 AM', '11:00 AM'][i]}</em></div>)}</div>
          </div>
          <motion.div className="float-card float-card-bottom" animate={{ y: [8, -8] }} transition={{ ...floatTransition, delay: 0.7 }}><span className="round-icon"><FiUsers /></span><div><small>Patient satisfaction</small><strong>98.4%</strong></div></motion.div>
          <div className="visual-glow" />
        </motion.div>
      </div>
      <div className="shell partner-strip"><span>THE MODERN OPERATING SYSTEM FOR HEALTHCARE</span><div><b>HEALTH<span>+</span></b><b>novus</b><b>MEDI<span>CORE</span></b><b>WELLSPRING</b></div></div>
    </section>
  )
}

export default Hero
