import { z } from 'zod';

export const addTodoFormSchema = z.object({
  description: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, { message: 'This field is required' }))
});

export const todoCategoryArray = ['task', 'habit'] as const;

const todoCategory = z
  .enum(todoCategoryArray, {
    required_error: 'You must chose a category for your todo item.'
  })
  .default('task');

const todoZod = z.object({
  id: z.string(),
  complete: z.boolean(),
  description: z.string(),
  category: todoCategory,
  due: z.string().default(new Date().toDateString())
});

export const todoStatusSchema = z.object({
  todos: z.array(todoZod)
});

export type TodoStatusFormSchema = typeof todoStatusSchema;
export type AddTodoFormSchema = typeof addTodoFormSchema;
