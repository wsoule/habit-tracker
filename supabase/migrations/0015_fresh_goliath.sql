ALTER TABLE "task_table" DROP CONSTRAINT "task_table_habit_id_habit_table_id_fk";
--> statement-breakpoint
ALTER TABLE "habit_completion_table" ALTER COLUMN "habit_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "habit_completion_table" ALTER COLUMN "completion_date" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "habit_completion_table" ALTER COLUMN "completion_date" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "task_table" DROP COLUMN IF EXISTS "habit_id";