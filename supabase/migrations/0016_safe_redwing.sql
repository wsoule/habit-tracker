ALTER TABLE "habit_completion_table" ALTER COLUMN "completion_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "habit_completion_table" ALTER COLUMN "completion_date" SET NOT NULL;