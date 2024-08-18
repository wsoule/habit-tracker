ALTER TABLE "todo_table" ADD COLUMN "habit_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_table" ADD CONSTRAINT "todo_table_habit_id_habit_table_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habit_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
