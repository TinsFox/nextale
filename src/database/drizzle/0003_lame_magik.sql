DO $$ BEGIN
 CREATE TYPE "public"."project_status" AS ENUM('draft', 'published', 'archived', 'under_review');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"docs_url" varchar(256),
	"preview_url" varchar(256),
	"video_url" varchar(256),
	"summary" varchar(256),
	"preview_image" json DEFAULT '[]'::json,
	"readme" text,
	"order" integer DEFAULT 0,
	"cover_image" varchar(256),
	"status" "project_status" DEFAULT 'draft',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"tech_stack" json DEFAULT '[]'::json
);
