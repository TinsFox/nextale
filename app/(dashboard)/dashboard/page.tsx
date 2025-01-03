import Link from "next/link"
import { FileText, LayoutDashboard, Tags, TrendingUp } from "lucide-react"

import { Card } from "@/components/ui/card"

import { RecentPosts } from "./components/recent-posts"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  description?: string
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="text-muted-foreground">{icon}</div>
      </div>
    </Card>
  )
}

export default async function DashboardPage() {
  const stats = {
    totalPosts: 25,
    totalViews: "12.5K",
    categories: 8,
    trending: "AI & Machine Learning",
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your blog dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={<FileText size={24} />}
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          icon={<LayoutDashboard size={24} />}
        />
        <StatCard
          title="Categories"
          value={stats.categories}
          icon={<Tags size={24} />}
        />
        <StatCard
          title="Trending Topic"
          value={stats.trending}
          icon={<TrendingUp size={24} />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href="/dashboard/posts/new"
              className="block p-2 hover:bg-accent rounded-md"
            >
              ✍️ Write New Post
            </Link>
            <Link
              href="/dashboard/categories"
              className="block p-2 hover:bg-accent rounded-md"
            >
              🏷️ Manage Categories
            </Link>
            <Link
              href="/dashboard/settings"
              className="block p-2 hover:bg-accent rounded-md"
            >
              ⚙️ Settings
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Posts</h3>
          <RecentPosts />
        </Card>
      </div>
    </div>
  )
}
