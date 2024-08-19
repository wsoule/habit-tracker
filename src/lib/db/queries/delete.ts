import { eq } from 'drizzle-orm';
import { db } from '../db.server';
import type { habitCompletiontable } from '../schema/habit-completion.table';
import type { taskTable } from '../schema/todo.table';

export const deleteTodo = async (
  id: string,
  table: typeof habitCompletiontable | typeof taskTable
) => {
    await db.delete(table).where(eq(table.id, id));
};
