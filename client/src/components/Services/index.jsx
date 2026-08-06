import { motion } from 'framer-motion'
import { FiActivity, FiAlertCircle, FiHeart, FiHome, FiPlus, FiSmile, FiTool, FiZap } from 'react-icons/fi'

const services = [
  ['General Medicine', 'Primary care for everyday health needs.', FiActivity], ['Emergency Care', 'Responsive care when every second matters.', FiAlertCircle], ['Cardiology', 'Specialist heart care with precision.', FiHeart], ['Neurology', 'Advanced care for the nervous system.', FiZap], ['Orthopedics', 'Movement, recovery and long-term comfort.', FiTool], ['Laboratory', 'Reliable diagnostics for confident decisions.', FiPlus], ['Pharmacy', 'Safe, streamlined medicine management.', FiHome], ['Dental', 'Complete care for healthier smiles.', FiSmile],
]

function Services() {
  return <section className="section services-section" id="services"><div className="shell"><div className="section-heading centered"><p className="section-kicker">OUR SERVICES</p><h2>Care for every moment that matters.</h2><p>Designed to make every department feel connected, capable and patient-first.</p></div><div className="services-grid">{services.map(([title, description, Icon], index) => <motion.article className="service-card" key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.045 }} whileHover={{ y: -7 }}><span className="service-icon"><Icon /></span><h3>{title}</h3><p>{description}</p><span className="service-arrow">↗</span></motion.article>)}</div></div></section>
}

export default Services
