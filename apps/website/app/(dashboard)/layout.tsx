import type { Metadata } from "next";
import { cookies } from "next/headers";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

import { HeaderBreadcrumb } from "./components/header-breadcrumb";

export const metadata: Metadata = {
	title: { default: "Dashboard", template: "%s | Nextale" },
	description: "Nextale admin dashboard",
};

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();

	const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<HeaderBreadcrumb />
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					<main className="w-full max-w-7xl mx-auto">{children}</main>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
