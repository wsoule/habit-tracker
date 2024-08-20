import { eq } from 'drizzle-orm';
import { db } from '../db.server';
import type { habitCompletionTable } from '../schema/habit-completion.table';
import type { taskTable } from '../schema/todo.table';

export const changeToDoStatus = async (
  id: string,
  isComplete: boolean,
  table: typeof habitCompletionTable | typeof taskTable
) => {
  return await db
    .update(table)
    .set({
      isComplete
    })
    .where(eq(table.id, id));
};
