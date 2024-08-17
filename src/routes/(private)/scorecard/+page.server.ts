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

export const load: PageServerLoad = async () => {
  return {
    addScorecardForm:
      (await superValidate(zod(addScoreCardSchema))) as SuperValidated<
        Infer<AddScorecardFormSchema>
      >,
  };
};
