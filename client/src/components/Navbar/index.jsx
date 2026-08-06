import { Link } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

const links = ['Home', 'About', 'Services', 'Features', 'Testimonials', 'Contact']

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#home" onClick={() => setIsOpen(false)}>
          <span className="brand-mark"><span /></span>
          <span>Medi<span>Sphere</span></span>
        </a>
        <div className="nav-links">
          {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>)}
        </div>
        <div className="nav-actions">
          <Link className="login-link" to="/login">Login</Link>
        <Link className="button button-sm" to="/register">Request demo <FiArrowUpRight /></Link>
        </div>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="mobile-nav" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)}>{link}</a>)}
            <a className="button" href="#contact" onClick={() => setIsOpen(false)}>Request demo <FiArrowUpRight /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
