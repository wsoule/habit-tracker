import { db } from '$lib/db/db.server';
import { taskTable } from '$lib/db/schema/todo.table';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { type Infer, message, type SuperValidated } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms';
import { error, fail } from '@sveltejs/kit';
import { createTodo } from '$lib/db/queries/insert';
import {
  type AddTodoFormSchema,
  addTodoFormSchema,
  type TodoStatusFormSchema,
  todoStatusSchema
} from '$lib/types/zod/todo.schema';
import { getHabitsForDate } from '$lib/db/queries/select';
import {
  habitCompletiontable,
  type InsertHabitCompletion
} from '$lib/db/schema/habit-completion.table';
import { and, eq } from 'drizzle-orm';

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
        title: form.data.title,
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
  // getHabitsForToday('d700733d-2db4-4d14-a7c6-bb9f7ac7958b');
  const todayDate = new Date();
  const habits = await getHabitsForDate('d700733d-2db4-4d14-a7c6-bb9f7ac7958b', todayDate);
  let habitsForToday = await db
    .select()
    .from(habitCompletiontable)
    .where(
      and(
        eq(habitCompletiontable.completionDate, todayDate.toDateString()),
        eq(habitCompletiontable.userId, 'd700733d-2db4-4d14-a7c6-bb9f7ac7958b')
      )
    );

  // compare the habits with the habitsForToday
  // if the habit is not in habitsForToday, add it with completed = false
  const habitsNotInToday: InsertHabitCompletion[] = [];
  habits.forEach((habit) => {
    const habitExists = habitsForToday.find((habitForToday) => habitForToday.habitId === habit.id);
    if (!habitExists) {
      habitsNotInToday.push({
        userId: 'd700733d-2db4-4d14-a7c6-bb9f7ac7958b',
        habitId: habit.id
      });
    }
  });

  if (habitsNotInToday.length > 0) {
    const allHabitsForToday = await db
      .insert(habitCompletiontable)
      .values(habitsNotInToday)
      .returning();
    habitsForToday = [...habitsForToday, ...allHabitsForToday];
  }

  // TODO: put the habits for today into the todos list
  // TODO: make a function for getting tasks that are due today or before today.
  const tasks = await db.select().from(taskTable);
  // the todo array only needs id, title, isComplete, and type (habit or task)

  const todos: {
    id: string;
    title: string;
    isComplete: boolean;
    category: 'habit' | 'task';
    dueDate: string;
  }[] = [
    ...tasks.map((task) => {
      return {
        id: task.id,
        title: task.title,
        isComplete: task.isComplete,
        dueDate: task.dueDate,
        category: 'task' as const
      };
    }),
    ...habitsForToday.map((habit) => {
      const originalHabit = habits.find((h) => h.id === habit.habitId);
      return {
        id: habit.id,
        title: originalHabit?.title ?? 'Something went wrong with habit',
        isComplete: habit.isComplete,
        category: 'habit' as const,
        dueDate: habit.completionDate
      };
    })
  ];

  console.log('todos', todos);
  return {
    todos: todos,
    changeTodoForm: (await superValidate(zod(todoStatusSchema))) as SuperValidated<
      Infer<TodoStatusFormSchema>
    >,
    form: (await superValidate(zod(addTodoFormSchema))) as SuperValidated<Infer<AddTodoFormSchema>>,
    habits: habitsForToday.map((habit) => {
      const originalHabit = habits.find((h) => h.id === habit.habitId);
      return {
        ...habit,
        habit: originalHabit
      };
    })
  };
};
