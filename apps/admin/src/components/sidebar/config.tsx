import {
	BookOpen,
	FileText,
	Home,
	Link,
	ListTree,
	Map as MapIcon,
	Rss,
	Send,
	Settings,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
export interface MenuItem {
	title: string;
	url: string;
	icon: LucideIcon;
	items: { title: string; url: string }[];
	children?: {
		pattern: RegExp;
		getTitle: (pathname: string) => string;
	};
}
// Convert existing navigation config to new format

export const navMain = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: Home,
		items: [],
	},
	{
		title: "Post",
		url: "/posts",
		icon: BookOpen,
		items: [],
		children: {
			pattern: /^\/posts\/([^/]+)$/,
			getTitle: (pathname: string) => {
				const slug = pathname.split("/").pop();
				return slug === "create" ? "创建文章" : "编辑文章";
			},
		},
	},
	{
		title: "Projects",
		url: "/projects",
		icon: FileText,
		items: [],
		children: {
			pattern: /^\/projects\/([^/]+)$/,
			getTitle: (pathname: string) => {
				const slug = pathname.split("/").pop();
				return slug === "create" ? "创建项目" : "编辑项目";
			},
		},
	},
	{
		title: "Category",
		url: "/categories",
		icon: ListTree,
		items: [],
		children: {
			pattern: /^\/categories\/([^/]+)$/,
			getTitle: (pathname: string) => {
				const slug = pathname.split("/").pop();
				return slug === "create" ? "创建分类" : "编辑分类";
			},
		},
	},
	{
		title: "Setting",
		url: "/settings",
		icon: Settings,
		items: [],
	},
];
export const navSecondary = [
	{
		title: "Feedback",
		url: "https://github.com/TinsFox/shadcnui-boilerplate/issues",
		icon: Send,
		external: true,
	},
	{
		title: "网站链接",
		icon: Link,
		url: "env.NEXT_PUBLIC_URL",
		external: true,
	},
	{
		title: "RSS",
		url: "/feed",
		icon: Rss,
		external: true,
	},
	{
		title: "Sitemap",
		url: "/sitemap",
		icon: MapIcon,
		external: true,
	},
];
