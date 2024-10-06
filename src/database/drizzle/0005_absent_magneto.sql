CREATE TABLE IF NOT EXISTS "cloud_functions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"code" text NOT NULL,
	"method" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"secret" varchar(255),
	CONSTRAINT "cloud_functions_url_unique" UNIQUE("url")
);
