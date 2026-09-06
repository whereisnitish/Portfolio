import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="label normal-case tracking-normal">
          © {year} {profile.name} · {profile.role}
        </p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="label transition-colors hover:text-ink-strong"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="label transition-colors hover:text-ink-strong"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="label transition-colors hover:text-ink-strong"
          >
            Email
          </a>
          <a href="#home" className="label transition-colors hover:text-ink-strong">
            Top
          </a>
        </nav>
      </div>
    </footer>
  )
}
