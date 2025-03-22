import z from "zod";

import "zod-openapi/extend";

export const querySchema = z.object({
	name: z.string().optional().openapi({ example: "Steven" }),
	time: z.string().optional().openapi({ example: "morning" }),
});

export const responseSchema = z.string().openapi({ example: "Hello Steven!" });
