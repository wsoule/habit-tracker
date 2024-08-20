ALTER TABLE "users_table" ALTER COLUMN "timezone" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "habit_table" ADD COLUMN "parent_habit_id" uuid;--> statement-breakpoint
ALTER TABLE "habit_table" ADD COLUMN "child_habit_id" uuid;