import { db } from '$lib/db/db.server';
import { todoTable } from '$lib/db/schema/todo.table';
import type { PageServerLoad } from './$types';

export const actions: import('./$types').Actions = {
  default: async ({ request }) => {
    console.log('req');
    const data = await request.formData();
    const item = data.get('description');
    console.log('datas = ', data);
    console.log('item = ', item);
    // TODO log the user in
    // const { error } = await supabase.from('countries').insert({
    //   name: 'hello'
    // });
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
    todos: await db.select().from(todoTable)
  };
};
