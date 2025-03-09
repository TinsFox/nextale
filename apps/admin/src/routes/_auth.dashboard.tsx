import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/dashboard")({
	component: DashboardPage,
	head: () => {},
});

function DashboardPage() {
	return (
		<section className="grid gap-2 p-2">
			<p>You are currently on the dashboard route.</p>
		</section>
	);
}
