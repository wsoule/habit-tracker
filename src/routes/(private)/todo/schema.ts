import { z } from 'zod';

export const addTodoFormSchema = z.object({
  description: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, { message: 'This field is required' }))
});

export const addScoreCardSchema = z.object({
  habit: z.string().min(2),
  type: z
    .enum(['good', 'bad', 'neutral'], {
      required_error: 'You need to select a category for your habit.'
    })
    .default('neutral')
});

const todoZod = z.object({
  id: z.string(),
  complete: z.boolean(),
  description: z.string()
});
export const todoStatusSchema = z.object({
  todos: z.array(todoZod)
});

export type TodoStatusFormSchema = typeof todoStatusSchema;
export type AddTodoFormSchema = typeof addTodoFormSchema;
export type AddScorecardFormSchema = typeof addScoreCardSchema;
