import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import DataToIntelligence from './components/DataToIntelligence.jsx'
import Career from './components/Career.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import { usePointerGlow } from './hooks/usePointerGlow.js'

export default function App() {
  usePointerGlow()

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <div className="ambient-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <DataToIntelligence />
        <Career />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
