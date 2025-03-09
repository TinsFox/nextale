import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
	const viteEnv = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [
			TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
			tsconfigPaths(),
			react(),
			createHtmlPlugin({
				template: "index.html",
				inject: {
					data: {
						title: viteEnv.VITE_APP_NAME,
					},
				},
			}),
		],
		server: {
			port: 5173,
			strictPort: true,
			proxy: {
				"/api": {
					target: "http://localhost:3000",
				},
			},
		},
	};
});
