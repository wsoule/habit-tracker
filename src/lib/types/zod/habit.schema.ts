import { z } from 'zod';

export const habitInfluenceArray = ['good', 'bad', 'neutral'] as const;

const habitInfluence = z
  .enum(habitInfluenceArray, {
    required_error: 'You need to select a influence type for your habit.'
  })
  .default('neutral');

export type HabitInfluence = z.infer<typeof habitInfluence>;

export const addScoreCardSchema = z.object({
  habit: z.string().min(2),
  type: habitInfluence
});
export type AddScorecardFormSchema = typeof addScoreCardSchema;
