import { z } from 'zod';

export const titleZod = z
  .string()
  .transform((value) => value.replace(/(^\s+|\s+$)/g, ''))
  .transform((value) => value.replace(/\s{2,}/g, ' '))
  .pipe(z.string().min(1, { message: 'Title is required' }));

export const addTodoFormSchema = z.object({
  title: titleZod
});

const todoZod = z.object({
  id: z.string(),
  isComplete: z.boolean(),
  title: z.string(),
  dueDate: z.string().default(new Date().toDateString())
});

export const todoStatusSchema = z.object({
  todos: z.array(todoZod)
});

export type TodoStatusFormSchema = typeof todoStatusSchema;
export type AddTodoFormSchema = typeof addTodoFormSchema;
