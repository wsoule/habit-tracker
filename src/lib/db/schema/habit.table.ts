import { pgTable, text, integer, uuid, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { usersTable } from './user.table';
import { habitInfluenceArray } from '../../types/zod/habit.schema';

// Define the habit table
export const habitTable = pgTable('habit_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  frequency: integer('frequency').notNull(), // binary representation of days
  streak: integer('streak').notNull().default(0),
  influence: text('influence', { enum: habitInfluenceArray }).notNull(),
  parentHabitId: uuid('parent_habit_id'), // Define the parentHabitId column
  childHabitId: uuid('child_habit_id'), // Define the childHabitId column
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
});

// Define the relations between the habits (self-referencing)
export const habitRelations = relations(habitTable, ({ one }) => ({
  parentHabit: one(habitTable, {
    fields: [habitTable.parentHabitId],
    references: [habitTable.id]
  }),
  childHabit: one(habitTable, {
    fields: [habitTable.childHabitId],
    references: [habitTable.id]
  })
}));

export type InsertHabit = typeof habitTable.$inferInsert;
export type SelectHabit = typeof habitTable.$inferSelect;
