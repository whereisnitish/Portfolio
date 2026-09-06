import Section from './ui/Section'
import SectionHeading, { SectionBody } from './ui/SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        index="04"
        label="Selected work"
        title="Systems designed, built and shipped"
        lede="Each of these went to production with real users, real constraints and real failure modes. Open a row for the architecture behind it."
      />

      <SectionBody className="mt-14">
        <div className="border-t border-line">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </SectionBody>
    </Section>
  )
}
