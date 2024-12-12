import { IAppConfig } from "@/app.config"
import { env } from "@/env"

export async function getSiteConfig() {
  const fetchedData: IApiResponse<IConfig> = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/settings/theme`
  ).then((res) => res.json())

  const configJSON = JSON.parse(fetchedData.data.value) as IAppConfig
  const { theme, navItems } = configJSON
  return {
    theme,
    navItems,
  }
}
export interface IConfig {
  id: string
  value: string
  type: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface IApiResponse<T> {
  code: number
  data: T
  message: string
}
