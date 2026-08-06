import { motion } from 'framer-motion'
import { FiAward, FiCheck, FiCode, FiLayers, FiUser } from 'react-icons/fi'

function About() {
  return (
    <section className="section about-section" id="about">
      <div className="shell about-grid">
        <motion.div className="about-visual" initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="about-panel"><div className="medical-cross">+</div><div className="care-lines"><i /><i /><i /></div><div className="about-person"><span className="doctor-head" /><span className="doctor-body" /></div><div className="about-badge"><FiAward /><span><small>Care excellence</small><b>Built around people</b></span></div></div>
          <div className="about-dot-grid" />
        </motion.div>
        <motion.div className="about-content" initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <p className="section-kicker">ABOUT MEDISPHERE</p><h2>A healthier way to run healthcare.</h2>
          <p>Our Hospital Management System is designed to simplify healthcare operations by connecting administrators, doctors, receptionists and patients into one secure digital platform.</p>
          <p>It provides appointment scheduling, medical records, prescriptions, billing, laboratory management, reporting and analytics with a clean and modern interface.</p>
          <div className="check-list"><span><FiCheck /> One connected care experience</span><span><FiCheck /> Clear, actionable insights</span></div>
        </motion.div>
      </div>
      <div className="shell developer-card"><div className="developer-icon"><FiCode /></div><div><p className="section-kicker">ABOUT THE DEVELOPER</p><h3>Built with care by Himesh Darji</h3><p>This Hospital Management System is developed by Himesh Darji as a full-stack MERN portfolio project. The goal is to demonstrate modern web development, scalable software architecture, responsive UI design, REST API integration, authentication, and enterprise-level application development while providing a complete digital healthcare solution.</p></div><div className="developer-profile"><div className="profile-avatar"><FiUser /></div><div><strong>Himesh Darji</strong><small>Full-stack MERN Developer</small></div><FiLayers className="profile-mark" /></div></div>
    </section>
  )
}

export default About
