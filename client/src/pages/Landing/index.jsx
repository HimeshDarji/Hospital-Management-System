import About from '../../components/About'
import Contact from '../../components/Contact'
import FAQ from '../../components/FAQ'
import Features from '../../components/Features'
import Footer from '../../components/Footer'
import Hero from '../../components/Hero'
import Navbar from '../../components/Navbar'
import Services from '../../components/Services'
import Statistics from '../../components/Statistics'
import Testimonials from '../../components/Testimonials'

function Landing() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Features />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  )
}

export default Landing
