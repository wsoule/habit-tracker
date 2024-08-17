ALTER TABLE "todo_table" ADD COLUMN "due" date DEFAULT 'Sat Aug 17 2024' NOT NULL;--> statement-breakpoint
ALTER TABLE "todo_table" ADD COLUMN "recurring" boolean DEFAULT false NOT NULL;