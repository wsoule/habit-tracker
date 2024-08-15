import { db } from '../db.server';
import { postsTable, type InsertPost } from '../schema/post.table';
import { todoTable, type InsertTodo } from '../schema/todo.table';
import { usersTable, type InsertUser } from '../schema/user.table';

export async function createUser(data: InsertUser) {
  return await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost) {
  return await db.insert(postsTable).values(data);
}

export async function createTodo(data: InsertTodo) {
  return await db.insert(todoTable).values(data).returning()
}
