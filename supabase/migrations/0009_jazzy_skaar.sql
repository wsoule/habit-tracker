ALTER TABLE "todo_table" DROP CONSTRAINT "todo_table_habit_id_habit_table_id_fk";
--> statement-breakpoint
ALTER TABLE "habit_table" ALTER COLUMN "frequency" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "todo_table" DROP COLUMN IF EXISTS "habit_id";