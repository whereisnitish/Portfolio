import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ImpactMetrics from './components/ImpactMetrics'
import Expertise from './components/Expertise'
import Projects from './components/Projects'
import Experience from './components/Experience'
import SystemWorkflow from './components/SystemWorkflow'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

/**
 * One continuous surface. Sections carry their own hairline separator and
 * whitespace — there are no bands, cards or background layers.
 */
export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <ImpactMetrics />
        <Expertise />
        <Projects />
        <Experience />
        <SystemWorkflow />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
