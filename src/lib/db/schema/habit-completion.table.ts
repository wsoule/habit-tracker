import { boolean, date, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user.table';
import { habitTable } from './habit.table';

export const habitCompletiontable = pgTable('habit_completion_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  habitId: uuid('habit_id')
    .references(() => habitTable.id, { onDelete: 'cascade' })
    .notNull(),
  isComplete: boolean('is_complete').default(false).notNull(),
  completionDate: date('completion_date').notNull().defaultNow(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
});
export type InsertHabitCompletion = typeof habitCompletiontable.$inferInsert;
export type SelectHabitCompletion = typeof habitCompletiontable.$inferSelect;
