import { db } from "$lib/db/db.server";
import { changeToDoStatus } from "$lib/db/queries/insert";
import { todoTable } from "$lib/db/schema/todo.table";
import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function POST({ request }: {request: Request}) {
  const { id, complete, remove } = await request.json();
  try {
    if (remove) {
      const deletedTodo = await db.delete(todoTable).where(eq(todoTable.id, id))
    } else {

    await changeToDoStatus({
    id,
    complete
        
  });
    }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    throw error(500, {
      message: `error updating status of ${id}`
    })
  }
  console.log('id = ', id)
  // const userid = cookies.get("userid");

  return json({ id }, { status: 200 });
}
