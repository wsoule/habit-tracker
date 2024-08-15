import { db } from '$lib/db/db.server';
import { todoTable } from '$lib/db/schema/todo.table';
import type { Actions, PageServerLoad } from './$types';
import { formSchema, type FormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters'
  import {
    type SuperValidated,
    type Infer,
  } from "sveltekit-superforms";
import { superValidate } from 'sveltekit-superforms'

export const actions: Actions = {
  create: async ({ request }) => {
    console.log('req');
    const data = await request.formData();
    const item = data.get('description');
    console.log('datas = ', data);
    console.log('item = ', item);
    // TODO log the user in
    // const { error } = await supabase.from('countries').insert({
    //   name: 'hello'
    // });
  },

  changeStatus: async ({ request }) => {
      console.log('request', request)
    }
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
    form: await superValidate(zod(formSchema)) as SuperValidated<Infer<FormSchema>>
  };
};
