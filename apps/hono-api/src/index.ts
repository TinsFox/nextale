import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from "hono-openapi";
import { showRoutes } from "hono/dev";
import { requestId } from "hono/request-id";

import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import { resolver, validator as zValidator } from "hono-openapi/zod";
import { env } from "./env";

import { auth } from "./lib/auth";
import { formatTable } from "./lib/log";
import adminPostRoute from "./modules/admin.post";
// import docsRoute from "./modules/docs";
import userRoute from "./modules/user";
import { querySchema, responseSchema } from "./schema";
import type { AppType } from "./type";

const app = new Hono<AppType>().basePath("/api");

app.use("*", requestId());
app.use("/api/*", cors());
app.use(prettyJSON());
app.use(logger());

app.on(["POST", "GET"], "/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.get(
	"/",
	describeRoute({
		description: "Say hello to the user",
		responses: {
			200: {
				description: "Successful greeting response",
				content: {
					"text/plain": {
						schema: resolver(responseSchema),
					},
				},
			},
		},
	}),
	zValidator("query", querySchema),
	(c) => {
		const query = c.req.valid("query");
		return c.text(`Hello ${query?.name ?? "Hono"}!`);
	},
);

app.route("/user", userRoute);
app.route("/admin/posts", adminPostRoute);

app.get(
	"/openapi",
	openAPISpecs(app, {
		documentation: {
			info: {
				title: "Hono",
				version: "1.0.0",
				description: "API documentation for Hono",
			},
			servers: [
				{
					url: `http://localhost:${env.API_PORT}`,
					description: "Local server",
				},
			],
		},
	}),
);

app.get(
	"/scalar-docs",
	apiReference({
		theme: "saturn",
		title: "Nextale Hono API Reference",
		url: `http://localhost:${env.API_PORT}/api/openapi`,
		authentication: {
			type: "bearer",
			name: "Authorization",
			in: "header",
		},
	}),
);
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

showRoutes(app, {
	colorize: true,
});
export default {
	fetch: app.fetch,
};
const serverInfo = [
	{ Description: "Server", URL: `http://localhost:${env.API_PORT}` },
	{ Description: "Server API", URL: `http://localhost:${env.API_PORT}/api` },
	{
		Description: "OpenAPI",
		URL: `http://localhost:${env.API_PORT}/api/openapi`,
	},
	{
		Description: "Scalar Docs",
		URL: `http://localhost:${env.API_PORT}/api/scalar-docs`,
	},
];

formatTable(serverInfo);
