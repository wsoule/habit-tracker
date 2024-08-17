import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { usersTable } from './user.table';
import { habitInfluenceArray } from '../../../routes/(private)/todo/schema';

export const habitTable = pgTable('habit_table', {
  id: uuid('id').defaultRandom().primaryKey(),
  habit: text('habit').notNull(),
  days: jsonb('days').notNull().$type<string[]>(),
  influence: text('influence', { enum: habitInfluenceArray }),
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
export enum DaysOfWeek {
  sunday = 'sunday',
  saturday = 'saturday',
  monday = 'monday',
  tuesday = 'tuesday',
  wednesday = 'wednesday',
  thursday = 'thursday',
  friday = 'friday'
}
