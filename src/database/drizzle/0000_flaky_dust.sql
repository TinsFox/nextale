DO $$ BEGIN
 CREATE TYPE "public"."post_status" AS ENUM('draft', 'published', 'archived', 'under_review');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"content" text,
	"author_id" integer,
	"cover_image" varchar(256),
	"tags" json DEFAULT '[]'::json,
	"is_copyright" boolean DEFAULT false,
	"is_top" boolean DEFAULT false,
	"top_order" integer DEFAULT 0,
	"summary" varchar(256),
	"custom_created_at" timestamp,
	"custom_updated_at" timestamp,
	"related_posts" json DEFAULT '[]'::json,
	"category_ids" json DEFAULT '[]'::json,
	"tag_ids" json DEFAULT '[]'::json,
	"slug" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"status" "post_status" DEFAULT 'draft'
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"email" varchar(256),
	"username" varchar(256),
	"password" varchar(256),
	"roles" json DEFAULT '[]'::json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
