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

/**
 * Converts a binary number representing days of the week into an array of days.
 * @param frequency - The binary representation of the days of the week.
 * @returns An array of days corresponding to the bits set in the binary number.
 */
export const binaryToDaysArray = (frequency: number): DayOfWeek[] => {
  return daysOfWeekArray.filter((_, index) => (frequency & (1 << index)) !== 0);
};

/**
 * Converts an array of days into a binary number representing those days.
 * @param daysArray - The array of days of the week.
 * @returns A binary number where each bit represents a day of the week.
 */
export const daysArrayToBinary = (daysArray: DayOfWeek[]): number => {
  return daysArray.reduce((acc, day) => {
    const dayIndex = daysOfWeekArray.indexOf(day);
    return acc | (1 << dayIndex);
  }, 0);
};

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
