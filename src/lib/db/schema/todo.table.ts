import { boolean, date, jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user.table';
import { todoCategoryArray } from '../../types/zod/todo.schema';
import { habitTable } from './habbit.table';

export const todoTable = pgTable('todo_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  description: text('description').notNull(),
  category: text('category', { enum: todoCategoryArray }).default('task').notNull(),
  complete: boolean('complete').default(false).notNull(),
  due: date('due').default(new Date().toDateString()).notNull(),
  recurring: boolean('recurring').default(false).notNull(),
  frequency: jsonb('frequency').$type<string[]>(),
  habitId: uuid('habit_id').references(() => habitTable.id),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
});
export type InsertTodo = typeof todoTable.$inferInsert;
export type SelectTodo = typeof todoTable.$inferSelect;
