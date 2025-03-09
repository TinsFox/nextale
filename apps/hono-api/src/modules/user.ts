import { db } from "@/db";
import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
	const users = await db.query.users.findMany();
	console.log("users", users);
	return c.json(users);
});

export default app;
