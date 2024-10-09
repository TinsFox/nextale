import BlurFade from "@/components/magicui/blur-fade"

import { ProjectCard } from "@/components/project-card"
import { Icons } from "@/components/icons"
const BLUR_FADE_DELAY = 0.04

async function featuredProjects() {
  const data = await fetch("http://localhost:8080/projects")
  const projects = await data.json()
  return projects
}

export default async function Projects() {
  const projects = await featuredProjects()

  return (
    <section id="projects">
      <div className="space-y-12 w-full py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Check out my latest work
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I&apos;ve worked on a variety of projects, from simple websites
                to complex web applications. Here are a few of my favorites.
              </p>
            </div>
          </div>
        </BlurFade>
        {/*  */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mx-auto lg:grid-cols-3 max-w-[1200px]">
          {projects.data.map((project: Project, id: number) => (
            <BlurFade
              key={project.name}
              delay={BLUR_FADE_DELAY * 12 + id * 0.05}
            >
              <ProjectCard
                href={project.previewUrl}
                key={project.name}
                title={project.name}
                description={project.summary}
                dates={project.createdAt}
                tags={project.techStack}
                image={""}
                video={project.videoUrl}
                links={[
                  {
                    type: "Website",
                    href: "https://chatcollect.com",
                    icon: <Icons.globe className="size-3" />,
                  },
                ]}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
export interface Project {
  id: number
  name: string
  docsUrl: string
  previewUrl: string
  videoUrl: string
  summary: string
  previewImage: string[]
  readme: string
  order: number
  coverImage: string
  status: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  techStack: any[]
}
