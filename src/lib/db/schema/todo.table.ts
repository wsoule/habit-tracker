import { boolean, date, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user.table';
import { habitTable } from './habit.table';

export const taskTable = pgTable('task_table', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  title: text('title').notNull(),
  // category: text('category', { enum: todoCategoryArray }).default('task').notNull(),
  isComplete: boolean('is_complete').default(false).notNull(),
  dueDate: date('due_date').default(new Date().toDateString()).notNull(),
  // recurring: boolean('recurring').default(false).notNull(),
  // frequency: jsonb('frequency').$type<string[]>(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
});
export type InsertTask = typeof taskTable.$inferInsert;
export type SelectTask = typeof taskTable.$inferSelect;
