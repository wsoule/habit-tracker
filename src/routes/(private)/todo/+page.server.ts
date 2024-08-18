import { db } from '$lib/db/db.server';
import { todoTable } from '$lib/db/schema/todo.table';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { type Infer, message, type SuperValidated } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms';
import { error, fail } from '@sveltejs/kit';
import { createTodo } from '$lib/db/queries/insert';
import {
  addTodoFormSchema,
  todoStatusSchema,
  type AddTodoFormSchema,
  type TodoStatusFormSchema
} from '$lib/types/zod/todo.schema';
import { habitTable, type SelectHabit } from '$lib/db/schema/habbit.table';
import { eq, and, sql, arrayOverlaps } from 'drizzle-orm';

export const actions: Actions = {
  create: async ({ request }) => {
    const form = await superValidate(request, zod(addTodoFormSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }
    try {
      const newTodo = await createTodo({
        description: form.data.description,
        userId: 'd700733d-2db4-4d14-a7c6-bb9f7ac7958b'
      });
      message(form, 'Todo created!');
      return {
        form,
        newTodo
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      throw error(500, {
        message: 'An unexpected error occured. Please try again.'
      });
    }
  },

  changeStatus: async ({ request }) => {
    console.log('request', request);
  }
};

export const load: PageServerLoad = async () => {
  getHabitsForToday('d700733d-2db4-4d14-a7c6-bb9f7ac7958b');
  return {
    todos: await db.select().from(todoTable),
    changeTodoForm: (await superValidate(zod(todoStatusSchema))) as SuperValidated<
      Infer<TodoStatusFormSchema>
    >,
    form: (await superValidate(zod(addTodoFormSchema))) as SuperValidated<Infer<AddTodoFormSchema>>
  };
};

const getHabitsForToday = async (userId: SelectHabit['userId']) => {
  // Get today's day of the week as lowercase (e.g., 'monday', 'tuesday')
  const today = new Date().toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
  console.log('today', today);

  // Select habits where the frequency array contains today's day
  //   const habits = await db
  //   .select()
  //   .from(habitTable)
  //   .where(
  //     and(
  //       eq(habitTable.userId, userId),
  //       sql`${habitTable.frequency} @> ${sql.array([today])}::jsonb`
  //     )
  //   );

  // const habits = await db
  //   .select()
  //   .from(habitTable)
  //   .where(and(eq(habitTable.userId, userId), sql`${habitTable.frequency} @> '[${today}]'::jsonb`));
  //
  const habits = 'hello';
  return habits;
};
