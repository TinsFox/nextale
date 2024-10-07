ALTER TABLE "menus" ADD COLUMN "is_deleted" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "pages" ADD COLUMN "is_deleted" boolean DEFAULT false;