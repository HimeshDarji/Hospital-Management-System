import { motion } from 'framer-motion'
import { FiArchive, FiBarChart2, FiCalendar, FiClipboard, FiCreditCard, FiFileText, FiLock, FiPackage, FiSettings, FiUsers } from 'react-icons/fi'

const features = [['Patient Management', 'A complete view of every patient journey.', FiUsers], ['Doctor Management', 'Coordinate teams, schedules and care.', FiSettings], ['Appointment Scheduling', 'Make booking calm and effortless.', FiCalendar], ['Billing', 'Clear, accurate payments and invoicing.', FiCreditCard], ['Medical History', 'Secure records at the point of care.', FiClipboard], ['Prescription Management', 'Safer prescribing, all in one place.', FiFileText], ['Reports & Analytics', 'Turn operations into clear insight.', FiBarChart2], ['Inventory', 'Stay ahead of every essential supply.', FiPackage], ['Laboratory', 'Connect tests, results and clinicians.', FiArchive], ['Role Based Access', 'The right access for every role.', FiLock]]

function Features() {
  return <><section className="section features-section" id="features"><div className="shell"><div className="section-heading"><p className="section-kicker">ONE INTELLIGENT PLATFORM</p><h2>Everything your hospital needs to move forward.</h2><p>Purpose-built workflows for the people who keep care moving.</p></div><div className="feature-grid">{features.map(([title, text, Icon], index) => <motion.article className={`feature-card feature-${index % 3}`} key={title} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} whileHover={{ y: -7 }}><Icon /><h3>{title}</h3><p>{text}</p></motion.article>)}</div></div></section><WhyChooseUs /></>
}

function WhyChooseUs() {
  const points = [['01', 'Designed around real care teams', 'Simple, intuitive workflows let your people focus on what matters: their patients.'], ['02', 'Secure by default', 'Strong privacy controls keep health information protected and accessible to the right people.'], ['03', 'Made to grow with you', 'Flexible enough for a single clinic, robust enough for a connected health network.']]
  return <section className="why-section"><div className="shell why-grid"><div><p className="section-kicker">WHY MEDISPHERE</p><h2>Technology that feels remarkably human.</h2><p className="why-intro">We believe the best healthcare software fades into the background—making every interaction simpler, warmer and more certain.</p><a href="#contact" className="text-link">Explore the platform <span>→</span></a></div><div className="timeline">{points.map(([number, title, text]) => <motion.div className="timeline-item" key={number} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></motion.div>)}</div></div></section>
}

export default Features
