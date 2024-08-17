import { type Infer, superValidate, type SuperValidated } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { type Actions, fail } from '@sveltejs/kit';
import { addScoreCardSchema, type AddScorecardFormSchema } from '$lib/types/zod/habit.schema';

export const actions: Actions = {
  'create-current-habbit': async ({ request }) => {
    const createScoreCardEntry = await superValidate(request, zod(addScoreCardSchema));
    if (!createScoreCardEntry.valid) {
      return fail(400, {
        form: createScoreCardEntry
      });
    }
  }
};

export const load: PageServerLoad = async () => {
  return {
    addScorecardForm: (await superValidate(zod(addScoreCardSchema))) as SuperValidated<
      Infer<AddScorecardFormSchema>
    >
  };
};
