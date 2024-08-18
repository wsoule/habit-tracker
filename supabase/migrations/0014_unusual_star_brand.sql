CREATE TABLE IF NOT EXISTS "habit_completion_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"habit_id" uuid,
	"is_complete" boolean DEFAULT false NOT NULL,
	"completion_date" date DEFAULT 'Sun Aug 18 2024' NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "todo_table" RENAME TO "task_table";--> statement-breakpoint
ALTER TABLE "task_table" RENAME COLUMN "description" TO "title";--> statement-breakpoint
ALTER TABLE "task_table" RENAME COLUMN "complete" TO "is_complete";--> statement-breakpoint
ALTER TABLE "task_table" RENAME COLUMN "due" TO "due_date";--> statement-breakpoint
ALTER TABLE "task_table" DROP CONSTRAINT "todo_table_habit_id_habit_table_id_fk";
--> statement-breakpoint
ALTER TABLE "task_table" DROP CONSTRAINT "todo_table_user_id_users_table_id_fk";
--> statement-breakpoint
ALTER TABLE "habit_table" ADD COLUMN "streak" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habit_completion_table" ADD CONSTRAINT "habit_completion_table_habit_id_habit_table_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habit_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habit_completion_table" ADD CONSTRAINT "habit_completion_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_table" ADD CONSTRAINT "task_table_habit_id_habit_table_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habit_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task_table" ADD CONSTRAINT "task_table_user_id_users_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "task_table" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "task_table" DROP COLUMN IF EXISTS "recurring";--> statement-breakpoint
ALTER TABLE "task_table" DROP COLUMN IF EXISTS "frequency";