import { type Infer, message, superValidate, type SuperValidated } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import { type AddScorecardFormSchema, addScoreCardSchema } from '$lib/types/zod/habit.schema';
import { createHabit } from '$lib/db/queries/insert';
import { db } from '$lib/db/db.server';
import { habitTable } from '$lib/db/schema/habbit.table';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
  'create-current-habbit': async ({ request }) => {
    console.log('createhabit request = ', await request.formData());
    const createHabitForm = await superValidate(request, zod(addScoreCardSchema));

    if (!createHabitForm.valid) {
      console.log('createhabit form not valid = ', createHabitForm);
      return fail(400, {
        form: createHabitForm
      });
    }
    console.log('createhabit influence = ', createHabitForm.data.influence);

    try {
      const newHabit = await createHabit({
        title: createHabitForm.data.title,
        userId: 'd700733d-2db4-4d14-a7c6-bb9f7ac7958b',
        frequency: createHabitForm.data.frequency,
        influence: createHabitForm.data.influence
      });
      message(createHabitForm, 'Habit created!');
      return {
        createHabitForm,
        newHabit
      };
    } catch (_e) {
      return fail(500, {
        message: 'An unexpected error occured when creating habit. Please try again.'
      });
    }
  }
};

export const load: PageServerLoad = async () => {
  return {
    addScorecardForm: (await superValidate(zod(addScoreCardSchema))) as SuperValidated<
      Infer<AddScorecardFormSchema>
    >,
    habits: await db
      .select()
      .from(habitTable)
      .where(eq(habitTable.userId, 'd700733d-2db4-4d14-a7c6-bb9f7ac7958b'))
  };
};
