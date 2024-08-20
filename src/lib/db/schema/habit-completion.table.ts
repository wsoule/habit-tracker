import { boolean, date, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { usersTable } from './user.table';
import { habitTable } from './habit.table';

export const habitCompletionTable = pgTable('habit_completion_table', {
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

// Define the relations between the habitCompletionTable and habitTable
export const habitCompletionRelations = relations(habitCompletionTable, ({ one }) => ({
  habit: one(habitTable, {
    fields: [habitCompletionTable.habitId],
    references: [habitTable.id]
  })
}));

export type InsertHabitCompletion = typeof habitCompletionTable.$inferInsert;
export type SelectHabitCompletion = typeof habitCompletionTable.$inferSelect;
