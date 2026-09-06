/** Section ids double as scroll anchors and active-state keys. */
export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/** Every section observed for scroll-spy, including ones absent from the navbar. */
export const observedSections = [
  'home',
  'about',
  'impact',
  'expertise',
  'projects',
  'experience',
  'process',
  'education',
  'contact',
]
