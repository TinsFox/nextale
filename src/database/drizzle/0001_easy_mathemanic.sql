ALTER TABLE "categories" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "is_deleted" boolean DEFAULT false;