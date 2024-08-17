import { z } from 'zod';

export const habitInfluenceArray = ['good', 'bad', 'neutral'] as const;
export const daysOfWeekArray = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
] as const;
const habitInfluenceZod = z
  .enum(habitInfluenceArray, {
    required_error: 'You need to select a influence type for your habit.'
  })
  .default('neutral');

export type HabitInfluence = z.infer<typeof habitInfluenceZod>;
const daysOfWeekEnumZod = z.enum(daysOfWeekArray);
const frequencyZod = z
  .array(daysOfWeekEnumZod)
  .min(1, { message: 'You must choose atleast one day of the week that this habit falls on.' })
  .default([...daysOfWeekArray]);

export type DayOfWeek = z.infer<typeof daysOfWeekEnumZod>;

export const addScoreCardSchema = z.object({
  title: z.string().min(2),
  influence: habitInfluenceZod,
  frequency: frequencyZod
});
export type AddScorecardFormSchema = typeof addScoreCardSchema;
