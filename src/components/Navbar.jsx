import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Github, Menu, X } from 'lucide-react'
import { navLinks, stageToNavLink } from '../data/navigation'
import { profile } from '../data/profile'
import { runStageIds, stageDetails } from '../data/run'
import { useActiveSection } from '../hooks/useActiveSection'
import { getLenis } from '../hooks/useSmoothScroll'
import SoundToggle from './ui/SoundToggle'
import WorldSwitch from './ui/WorldSwitch'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(runStageIds, 200)
  const activeLink = stageToNavLink[activeSection]
  const activeStage = stageDetails[activeSection]
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (menuOpen) getLenis()?.stop()
    else getLenis()?.start()
    return () => {
      document.body.style.overflow = ''
      getLenis()?.start()
    }
  }, [menuOpen])

  // Close the sheet if the viewport grows into the desktop layout.
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <a
        href="#about"
        className="sr-only z-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-on-accent"
      >
        Skip to content
      </a>

      <header
        className={[
          'fixed inset-x-0 top-0 z-40 transition-colors duration-200',
          scrolled ? 'border-b border-line bg-canvas/85 backdrop-blur-md' : 'border-b border-transparent',
        ].join(' ')}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-8">
          <div className="flex items-baseline gap-3">
            <a
              href="#home"
              className="text-sm font-semibold tracking-tight text-ink-strong"
              aria-label="Nitish Kumar — home"
            >
              Nitish Kumar
            </a>
            {/* The spine shows this on wide screens. */}
            {activeStage && (
              <span className="hidden whitespace-nowrap font-mono text-[0.66rem] text-accent min-[420px]:inline xl:hidden">
                {activeStage.step} {activeStage.name}
              </span>
            )}
          </div>

          {/* Desktop links — the active item is marked with weight and a rule,
              not a filled pill. */}
          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => {
              const isActive = activeLink === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={[
                      'relative block py-1 text-[0.82rem] transition-colors',
                      isActive
                        ? 'font-medium text-ink-strong'
                        : 'text-ink-muted hover:text-ink-strong',
                    ].join(' ')}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-accent"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="hidden h-9 w-9 place-items-center rounded-md text-ink-muted transition-colors hover:text-ink-strong sm:grid"
            >
              <Github className="h-[17px] w-[17px]" strokeWidth={1.6} />
            </a>

            <SoundToggle />

            <WorldSwitch className="ml-1" />

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="grid h-9 w-9 place-items-center rounded-md text-ink-strong md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* How far through the run the reader is. */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 -bottom-px h-[2px] origin-left bg-accent xl:hidden"
        />
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-30 bg-canvas md:hidden"
          >
            <div className="shell flex h-full flex-col pt-24">
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={[
                        'flex items-baseline justify-between border-b border-line py-5 text-2xl tracking-tight transition-colors',
                        activeLink === link.id
                          ? 'font-medium text-ink-strong'
                          : 'text-ink-muted',
                      ].join(' ')}
                    >
                      {link.label}
                      <span className="label">{String(index + 1).padStart(2, '0')}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-5 pb-12 pt-10">
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-lg text-ink-strong"
                >
                  {profile.email}
                </a>
                <div className="flex items-center gap-6 label">
                  <a href={profile.github} target="_blank" rel="noreferrer noopener">
                    GitHub
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
                    LinkedIn
                  </a>
                  <span className="ml-auto normal-case tracking-normal">{profile.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
