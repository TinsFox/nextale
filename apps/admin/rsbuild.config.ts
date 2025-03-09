import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";

export default defineConfig({
	plugins: [pluginReact()],
	server: {
		port: 2111,
		strictPort: true,
		proxy: {
			"/api": "http://localhost:3000",
		},
	},
	html: {
		title: "nextale-admin",
	},
	tools: {
		rspack: {
			plugins: [
				TanStackRouterRspack({ target: "react", autoCodeSplitting: true }),
			],
		},
	},
});
