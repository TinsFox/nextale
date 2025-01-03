import { ProjectEditor } from "../components/project-editor"

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  return (
    <div className="container mx-auto max-w-3xl">
      <ProjectEditor id={id} />
    </div>
  )
}
