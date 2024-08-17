ALTER TABLE "habit_table" RENAME COLUMN "days" TO "frequency";--> statement-breakpoint
ALTER TABLE "todo_table" ALTER COLUMN "category" SET DEFAULT 'task';--> statement-breakpoint
ALTER TABLE "todo_table" ALTER COLUMN "category" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "todo_table" ADD COLUMN "frequency" jsonb;