import { featuredProjects } from "@/lib/api/projects"
import { Icons } from "@/components/icons"
import BlurFade from "@/components/magicui/blur-fade"
import { ProjectCard } from "@/components/project-card"
import { IProject } from "@/lib/schema/projects"

const BLUR_FADE_DELAY = 0.04

export default async function Projects() {
  const projects = await featuredProjects()
  console.log('projects: ', projects);

  return (
    <section id="projects" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-8 sm:space-y-12 w-full py-8 sm:py-12">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                我的项目
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground md:text-lg/relaxed lg:text-xl/relaxed max-w-2xl mx-auto">
                一些我做过的项目
              </p>
            </div>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-[1200px] mx-auto">
          {projects.data.map((project: IProject, index: number) => (
            <BlurFade
              key={project.id}
              delay={BLUR_FADE_DELAY * 12 + index * 0.05}
              className="w-full"
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


