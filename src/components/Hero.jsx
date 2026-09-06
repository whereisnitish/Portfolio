import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroVisual from './HeroVisual'
import { profile, rotatingTitles } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const ROTATE_MS = 2400

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % rotatingTitles.length), ROTATE_MS)
    return () => clearInterval(timer)
  }, [reduceMotion])

  return (
    <section id="home" className="relative pb-24 pt-36 sm:pb-28 sm:pt-40 lg:pb-32 lg:pt-44">
      <div className="shell">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20"
        >
          <div>
            <motion.p variants={item} className="label flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Available for new work
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-8 text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[4rem]"
            >
              Nitish Kumar
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 text-lg leading-snug text-ink-body sm:text-xl"
            >
              Senior Python Developer building AI agents, intelligent systems and
              scalable backend architecture.
            </motion.p>

            {/* Rotating specialisation */}
            <motion.div
              variants={item}
              className="mt-8 flex items-baseline gap-3 border-t border-line pt-6 font-mono text-sm"
            >
              <span className="text-ink-faint">Currently building</span>
              <span className="relative inline-flex h-6 min-w-0 flex-1 items-baseline overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rotatingTitles[index]}
                    initial={reduceMotion ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute whitespace-nowrap text-accent"
                  >
                    {rotatingTitles[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              variants={item}
              className="mt-8 max-w-measure leading-relaxed text-ink-muted"
            >
              {profile.intro}
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#projects" className="btn-primary group">
                View selected work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#contact" className="link text-sm">
                Get in touch
              </a>
              <a href={profile.resumeUrl} download className="link text-sm text-ink-muted">
                Résumé
              </a>
            </motion.div>
          </div>

          <motion.div variants={item} aria-label="Diagram of an AI agent request path">
            <HeroVisual />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
