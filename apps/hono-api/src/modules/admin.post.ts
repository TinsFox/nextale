import { count, eq } from "drizzle-orm";

import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
	const posts = await db.query.postsTable.findMany();
	const total = await db.select({ count: count() }).from(postsTable);

	return c.json({
		code: 200,
		data: {
			total: total,
			records: posts,
		},
		message: "success",
	});
});

app.get("/:id", async (c) => {
	const id = c.req.param("id");
	if (!id) {
		return c.json({ error: "id is required", status: 400 });
	}
	const post = await db.query.postsTable.findFirst({
		where: eq(postsTable.id, id),
	});
	return c.json(post);
});

export default app;
