import Navbar from './components/Navbar'
import RunSpine from './components/RunSpine'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import SystemWorkflow from './components/SystemWorkflow'
import Expertise from './components/Expertise'
import Compute from './components/Compute'
import Projects from './components/Projects'
import Experience from './components/Experience'
import ImpactMetrics from './components/ImpactMetrics'
import Contact from './components/Contact'
import Footer from './components/Footer'
import VoiceAgent from './components/VoiceAgent'
import { useSmoothScroll } from './hooks/useSmoothScroll'

/**
 * The page reads as one agent run, in the order of `runStages` (data/run.js):
 * prompt → context → plan → tools → compute → execute → history → results →
 * back to the visitor.
 */
export default function App() {
  useSmoothScroll()

  return (
    <>
      <Navbar />
      <RunSpine />

      <main>
        <Hero />
        <About />
        <Education />
        <SystemWorkflow />
        <Expertise />
        <Compute />
        <Projects />
        <Experience />
        <ImpactMetrics />
        <Contact />
      </main>

      <Footer />

      <VoiceAgent />
    </>
  )
}
