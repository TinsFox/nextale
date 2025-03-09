import { z } from "zod";

import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
config({ path: "./.env" });

export const env = createEnv({
	server: {
		BETTER_AUTH_EMAIL: z.string(),
		DATABASE_URL: z.string(),
		RESEND_API_KEY: z.string(),
		S3_ACCESS_KEY_ID: z.string().optional(),
		S3_SECRET_ACCESS_KEY: z.string().optional(),
		S3_BUCKET: z.string().optional(),
		S3_ENDPOINT: z.string().optional(),
		S3_PUBLIC_DOMAIN: z.string().optional(),
		PUBLIC_URL: z.string().url(),
	},
	runtimeEnv: {
		PUBLIC_URL: process.env.PUBLIC_URL,
		NODE_ENV: process.env.NODE_ENV,
		DATABASE_URL: process.env.DATABASE_URL,
		S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
		S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
		S3_BUCKET: process.env.S3_BUCKET,
		S3_ENDPOINT: process.env.S3_ENDPOINT,
		S3_PUBLIC_DOMAIN: process.env.S3_PUBLIC_DOMAIN,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		BETTER_AUTH_EMAIL: process.env.BETTER_AUTH_EMAIL,
	},
});
