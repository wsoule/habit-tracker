import { deleteTodo } from '$lib/db/queries/delete';
import { changeToDoStatus } from '$lib/db/queries/update';
import { habitCompletiontable } from '$lib/db/schema/habit-completion.table';
import { taskTable } from '$lib/db/schema/todo.table';
import type { Todo } from '$lib/types/todo-item';
import { error, json } from '@sveltejs/kit';

export async function POST({ request }: { request: Request }) {
  const requestObject = await request.json();
  if (!('category' in requestObject) || !('id' in requestObject)) {
    error(400, {
      message: 'category is required'
    });
  }
  const { id, category } = requestObject;
  const table = category === 'habit' ? habitCompletiontable : taskTable;
  if (requestObject.remove) {
    if (category === 'habit') {
      throw error(400, {
        message: 'You cannot delete a habit here. Please go to scorecard to edit your habits.'
      });
    }
    await deleteTodo(id, table);
  } else {
    const { isComplete } = requestObject as Todo;
    await changeToDoStatus(id, isComplete, table);
  }
  // TODO: impliment cookies auth
  // const userid = cookies.get("userid");

  return json({ id }, { status: 200 });
}
