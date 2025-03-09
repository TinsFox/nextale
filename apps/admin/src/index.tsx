import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ClickToComponent } from "click-to-react-component";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useSession } from "./lib/auth-client";
import { routeTree } from "./routeTree.gen";
const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
	scrollRestoration: true,
	context: {
		auth: undefined,
	},
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
function InnerApp() {
	const auth = useSession();
	return (
		<>
			<NuqsAdapter>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} context={{ auth: auth.data }} />
				</QueryClientProvider>
			</NuqsAdapter>
		</>
	);
}

const rootEl = document.getElementById("root");
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl);
	root.render(
		<React.StrictMode>
			<InnerApp />
			<ClickToComponent />
		</React.StrictMode>,
	);
}
