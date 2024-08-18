import { integer, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user.table';
import { habitInfluenceArray } from '../../types/zod/habit.schema';

export const habitTable = pgTable('habit_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  // frequency: jsonb('frequency').notNull().$type<string[]>(),
  frequency: integer('frequency').notNull(), // Store as an integer

  influence: text('influence', { enum: habitInfluenceArray }).notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
});
export type InsertHabit = typeof habitTable.$inferInsert;
export type SelectHabit = typeof habitTable.$inferSelect;
