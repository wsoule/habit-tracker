import { db } from "$lib/db/db.server";
import { todoTable } from "$lib/db/schema/todo.table";
import type { Actions, PageServerLoad } from "./$types";
import { type FormSchema, formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { type Infer, message, type SuperValidated } from "sveltekit-superforms";
import { superValidate } from "sveltekit-superforms";
import { error, fail } from "@sveltejs/kit";
import { createTodo } from "$lib/db/queries/insert";

export const actions: Actions = {
  create: async (event) => {
    const form = await superValidate(event, zod(formSchema));
    if (!form.valid) {
      return fail(400, {
        form,
      });
    }
    try {
      const newTodo = await createTodo({
        title: form.data.title,
        userId: "d700733d-2db4-4d14-a7c6-bb9f7ac7958b",
      });
      message(form, "Todo created!");
      return {
        form,
        newTodo,
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      throw error(500, {
        message: "An unexpected error occured. Please try again.",
      });
    }
  },

  changeStatus: async ({ request }) => {
    console.log("request", request);
  },
};
// export async function load(): Promise<PageServerLoad<{users: string[]}>> {
//   return {
//
//     users: await db.select().from(usersTable)
//   };
// }
export const load: PageServerLoad = async () => {
  return {
    todos: await db.select().from(todoTable),
    form: (await superValidate(zod(formSchema))) as SuperValidated<
      Infer<FormSchema>
    >,
  };
};
