import { env } from "@/env"

export async function featuredProjects() {
  const data = await fetch(`${env.NEXT_PUBLIC_API_URL}/projects`)
  const projects = await data.json()
  return projects
}
