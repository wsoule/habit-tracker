import { z } from 'zod';

export const habitInfluenceArray = ['good', 'bad', 'neutral'] as const;
export const daysOfWeekArray = [
  'sunday',
  'saturday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday'
] as const;
const habitInfluenceZod = z
  .enum(habitInfluenceArray, {
    required_error: 'You need to select a influence type for your habit.'
  })
  .default('neutral');

export type HabitInfluence = z.infer<typeof habitInfluenceZod>;
const daysOfWeekZod = z
  .array(z.enum(daysOfWeekArray))
  .min(1, { message: 'You must choose atleast one day of the week that this habit falls on.' })
  .default(['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']);

export type DayOfWeek = z.infer<typeof daysOfWeekZod>;

export const addScoreCardSchema = z.object({
  habit: z.string().min(2),
  influence: habitInfluenceZod,
  daysOfWeek: daysOfWeekZod
});
export type AddScorecardFormSchema = typeof addScoreCardSchema;
