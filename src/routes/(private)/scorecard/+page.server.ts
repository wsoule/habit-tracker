import {
  type Infer,
  superValidate,
  type SuperValidated,
} from "sveltekit-superforms";
import {
  type AddScorecardFormSchema,
  addScoreCardSchema,
} from "../todo/schema";
import type { PageServerLoad } from "./$types";
import { zod } from "sveltekit-superforms/adapters";
import { type Actions, fail } from "@sveltejs/kit";

export const actions: Actions = {
  "create-current-habbit": async ({ request }) => {
    const createScoreCardEntry = await superValidate(
      request,
      zod(addScoreCardSchema),
    );
    if (!createScoreCardEntry.valid) {
      return fail(400, {
        form: createScoreCardEntry,
      });
    }
  },
};

export const load: PageServerLoad = async () => {
  return {
    addScorecardForm:
      (await superValidate(zod(addScoreCardSchema))) as SuperValidated<
        Infer<AddScorecardFormSchema>
      >,
  };
};
