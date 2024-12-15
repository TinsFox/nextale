export async function featuredProjects() {
  const data = await fetch("http://localhost:8080/projects")
  const projects = await data.json()
  return projects
}
