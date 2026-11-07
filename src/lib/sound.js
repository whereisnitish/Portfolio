/**
 * Small synthesised sound effects, with no audio files to download.
 *
 * Off until the visitor turns them on. Sounds triggered by scrolling stay silent
 * until the page has had a click, because browsers keep audio suspended till then.
 */
const STORAGE_KEY = 'nk-sound'

let context = null
let enabled = readStored()

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on'
  } catch {
    return false
  }
}

function getContext() {
  if (!context) {
    const AudioContextClass = window.AudioContext ?? window.webkitAudioContext
    if (!AudioContextClass) return null
    context = new AudioContextClass()
  }
  if (context.state === 'suspended') context.resume().catch(() => {})
  return context
}

function tone(ctx, { from, to = from, duration, gain, type = 'sine', delay = 0 }) {
  const start = ctx.currentTime + delay
  const oscillator = ctx.createOscillator()
  const envelope = ctx.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(from, start)
  oscillator.frequency.exponentialRampToValueAtTime(to, start + duration)
  envelope.gain.setValueAtTime(gain, start)
  envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  oscillator.connect(envelope).connect(ctx.destination)
  oscillator.start(start)
  oscillator.stop(start + duration)
}

function noise(ctx, { duration, gain }) {
  const samples = Math.floor(ctx.sampleRate * duration)
  const buffer = ctx.createBuffer(1, samples, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < samples; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / samples)

  const source = ctx.createBufferSource()
  const envelope = ctx.createGain()
  source.buffer = buffer
  envelope.gain.value = gain
  source.connect(envelope).connect(ctx.destination)
  source.start()
}

const EFFECTS = {
  /** A heavy switch being thrown. */
  world: (ctx) => {
    noise(ctx, { duration: 0.05, gain: 0.12 })
    tone(ctx, { from: 110, to: 42, duration: 0.24, gain: 0.2, type: 'triangle' })
    tone(ctx, { from: 620, to: 1040, duration: 0.14, gain: 0.025, delay: 0.1 })
  },
  /** A pencil tick on a checklist. */
  tick: (ctx) => {
    noise(ctx, { duration: 0.025, gain: 0.03 })
  },
  /** A rubber stamp hitting paper. */
  stamp: (ctx) => {
    noise(ctx, { duration: 0.06, gain: 0.08 })
    tone(ctx, { from: 150, to: 60, duration: 0.11, gain: 0.12, type: 'triangle' })
  },
  /** Confirmation for controls. */
  click: (ctx) => {
    tone(ctx, { from: 880, to: 1320, duration: 0.06, gain: 0.04 })
  },
}

export function playSound(name) {
  if (!enabled) return
  const ctx = getContext()
  if (ctx) EFFECTS[name]?.(ctx)
}

export function isSoundEnabled() {
  return enabled
}

export function setSoundEnabled(next) {
  enabled = next
  try {
    localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off')
  } catch {
    // Storage blocked: the setting still applies for this visit.
  }
}
