/** Plain-language nav for people who want to jump, not follow the run. */
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Tools' },
  { id: 'projects', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/** Which nav item to mark while a given run stage is on screen. */
export const stageToNavLink = {
  about: 'about',
  process: 'about',
  expertise: 'expertise',
  compute: 'projects',
  projects: 'projects',
  experience: 'experience',
  impact: 'experience',
  contact: 'contact',
}
