export const appConfig: IAppConfig = {
  title: "TinsFox",
  description: "TinsFox's blog",
  navItems: [
    { name: "首页", href: "/" },
    { name: "文稿", href: "/posts" },
    { name: "项目", href: "/projects" },
    { name: "关于", href: "/about" },
    { name: "友链", href: "/links" },
    { name: "归档", href: "/posts/archive" },
    {
      name: "RSS",
      href: "https://tinsfox.com/atom.xml",
    },
    { name: "控制台", href: "/dashboard" },
  ],
  theme: {
    site: {
      favicon: "https://avatars.githubusercontent.com/u/33956589?v=4",
      faviconDark: "https://avatars.githubusercontent.com/u/33956589?v=4",
    },
    seo: {
      title: "TinsFox",
      description: "TinsFox's blog",
      keywords: ["TinsFox", "blog"],
    },
    user: {
      username: "TinsFox",
      socialIds: {
        github: "TinsFox",
        twitter: "TinsFox",
        mail: "TinsFox",
      },
    },
  },
}
export interface IAppConfig {
  title: string
  description: string
  navItems: {
    name: string
    href: string
  }[]
  theme: {
    site: {
      favicon: string
      faviconDark: string
    }
    seo: {
      title: string
      description: string
      keywords: string[]
    }
    user: {
      username: string
      socialIds: {
        github: string
        twitter: string
        mail: string
      }
    }
  }
}
