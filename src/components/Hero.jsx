import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import HeroVisual from './HeroVisual'
import Note from './ui/Note'
import Scribble from './ui/Scribble'
import { heroPrompt, profile, rotatingTitles } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const ROTATE_MS = 2400
const TYPE_MS = 34
const TYPE_START_MS = 450

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

/** Types `text` once on load. Reduced-motion visitors get it complete. */
function useTypedText(text, reduceMotion) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduceMotion) return undefined
    let timer
    const type = (next) => {
      setCount(next)
      if (next < text.length) timer = setTimeout(() => type(next + 1), TYPE_MS)
    }
    timer = setTimeout(() => type(1), TYPE_START_MS)
    return () => clearTimeout(timer)
  }, [text, reduceMotion])

  return reduceMotion ? text : text.slice(0, count)
}

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const typed = useTypedText(heroPrompt, reduceMotion)

  const hostRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: hostRef, offset: ['start start', 'end start'] })
  const sheetY = useTransform(scrollYProgress, [0, 1], [0, 90])
  const sheetRotate = useTransform(scrollYProgress, [0, 1], [1.5, -3])

  useEffect(() => {
    if (reduceMotion) return undefined
    const timer = setInterval(() => setIndex((i) => (i + 1) % rotatingTitles.length), ROTATE_MS)
    return () => clearInterval(timer)
  }, [reduceMotion])

  return (
    <section
      id="home"
      ref={hostRef}
      className="relative pb-20 pt-32 sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      <div className="shell">
        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16"
        >
          <div>
            <motion.p variants={item} className="label flex items-center gap-2.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              Available for new work
            </motion.p>

            {/* The prompt that starts the run */}
            <motion.p
              variants={item}
              className="mt-7 min-h-[3rem] font-mono text-[0.82rem] leading-6 text-ink-muted sm:min-h-0"
            >
              <span className="sr-only">{heroPrompt}</span>
              <span aria-hidden="true">
                <span className="text-accent">&gt; </span>
                {typed}
                <span className="ml-0.5 inline-block h-[0.95em] w-[7px] translate-y-[2px] animate-caret bg-accent" />
              </span>
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-6 text-[2.75rem] font-semibold leading-[1.03] sm:text-6xl lg:text-[4.5rem]"
            >
              <span className="block">I&apos;m {profile.name.split(' ')[0]}.</span>
              <span className="block">
                I build AI that{' '}
                <span className="relative inline-block whitespace-nowrap">
                  does the work.
                  <Scribble
                    shape="underline"
                    delay={1}
                    className="absolute -bottom-2 left-0 h-3 w-full sm:h-4"
                  />
                </span>
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-8 max-w-xl text-lg leading-snug text-ink-body sm:text-xl"
            >
              {profile.name}, {profile.role}. Agents, LLM applications and GPU-based AI workloads.
            </motion.p>

            {/* Rotating specialisation */}
            <motion.div
              variants={item}
              className="mt-7 flex items-center gap-3 border-t border-line pt-5 font-mono text-sm leading-6"
            >
              <span className="shrink-0 text-ink-faint">Currently building</span>
              <span className="relative h-6 min-w-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={rotatingTitles[index]}
                    initial={reduceMotion ? false : { y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: -18, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 top-0 whitespace-nowrap text-accent"
                  >
                    {rotatingTitles[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#about" className="btn-primary group">
                Follow the run
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" className="link text-sm">
                Get in touch
              </a>
              <a href={profile.resumeUrl} download className="link text-sm text-ink-muted">
                Résumé
              </a>
            </motion.div>
          </div>

          <motion.div variants={item}>
            {/* Sheet and note drift together, so the note never ends up under it. */}
            <motion.div style={reduceMotion ? undefined : { y: sheetY }}>
              <motion.div
                role="img"
                aria-label="Diagram of an AI agent request path"
                style={{ rotate: reduceMotion ? 1.5 : sheetRotate }}
                className="sheet mx-auto max-w-[460px] px-5 pb-5 pt-8"
              >
                <HeroVisual />
              </motion.div>
              <Note rotate={-3} delay={1.4} className="mt-6 text-center">
                this whole page is one agent run. scroll to follow it.
              </Note>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
