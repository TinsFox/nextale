import type React from "react";

import { AppInfo } from "@/components/sidebar/app-info";
import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";

import { useLocation } from "@tanstack/react-router";
import { navMain, navSecondary } from "./config";
import { NavSecondary } from "./nav-secondary";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const location = useLocation();

	const pathname = location.pathname;

	// Update isActive status based on current pathname
	const items = navMain.map((item) => ({
		...item,
		isActive: pathname === item.url,
	}));

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<AppInfo />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={items} />
				<NavSecondary items={navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
