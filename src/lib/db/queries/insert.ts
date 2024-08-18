import { eq } from 'drizzle-orm';
import { db } from '../db.server';
import { postsTable, type InsertPost } from '../schema/post.table';
import { taskTable, type InsertTask } from '../schema/todo.table';
import { usersTable, type InsertUser } from '../schema/user.table';
import { habitTable, type InsertHabit } from '../schema/habit.table';

export async function createUser(data: InsertUser) {
  return await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost) {
  return await db.insert(postsTable).values(data);
}

export async function createTodo(data: InsertTask) {
  return await db.insert(taskTable).values(data).returning();
}

export async function createHabit(data: InsertHabit) {
  return await db.insert(habitTable).values(data).returning();
}

export async function changeToDoStatus(data: { isComplete: boolean; id: string }) {
  const { isComplete, id } = data;
  return await db
    .update(taskTable)
    .set({
      isComplete
    })
    .where(eq(taskTable.id, id));
}
