import { changeToDoStatus } from "$lib/db/queries/insert";
import { error, json } from "@sveltejs/kit";

export async function POST({ request }) {
  const { id, complete } = await request.json();
  try {
    await changeToDoStatus({
    id,
    complete
  });
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
