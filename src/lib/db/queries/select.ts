import { and, asc, between, count, eq, getTableColumns, lte, or, sql } from 'drizzle-orm';
import { usersTable, type SelectUser } from '../schema/user.table';
import { db } from '../db.server';
import { postsTable } from '../schema/post.table';
import { taskTable, type SelectTask } from '../schema/todo.table';
import { habitTable, type SelectHabit } from '../schema/habit.table';

export async function getUserById(id: SelectUser['id']): Promise<
  Array<{
    id: string;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}

export async function getUsersWithPostsCount(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    postsCount: number;
    id: string;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db
    .select({
      ...getTableColumns(usersTable),
      postsCount: count(postsTable.id)
    })
    .from(usersTable)
    .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
    .groupBy(usersTable.id)
    .orderBy(asc(usersTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getPostsForLast24Hours(
  page = 1,
  pageSize = 5
): Promise<
  Array<{
    id: string;
    title: string;
  }>
> {
  return db
    .select({
      id: postsTable.id,
      title: postsTable.title
    })
    .from(postsTable)
    .where(between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`))
    .orderBy(asc(postsTable.title), asc(postsTable.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export const getTasksDue = async (
  userId: SelectUser['id'],
  due: Date = new Date()
): Promise<SelectTask[]> => {
  const tasks = await db
    .select()
    .from(taskTable)
    .where(
      and(
        eq(taskTable.userId, userId),
        or(
          eq(taskTable.isComplete, false),
          lte(
            taskTable.dueDate,
            due.toLocaleDateString('en-CA', {
              timeZone: 'UTC'
            })
          )
        )
      )
    );

  return tasks;
};

export const getHabitsForDate = async (
  userId: SelectUser['id'],
  date: Date = new Date()
): Promise<SelectHabit[]> => {
  // Get today's day of the week as a bit mask (sunday = 1, monday = 2, tuesday = 3, etc.).
  const todayBit = 1 << date.getDay();

  // Select habits where the frequency matchest today's bit.
  const habits = await db
    .select()
    .from(habitTable)
    .where(
      and(
        eq(habitTable.userId, userId),
        sql`${habitTable.frequency} & ${todayBit} != 0`,
        eq(habitTable.influence, 'good')
      )
    );

  return habits;
};
