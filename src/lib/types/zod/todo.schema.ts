import { z } from 'zod';

export const addTodoFormSchema = z.object({
  title: z
    .string()
    .transform((value) => value.replace(/\s+/g, ''))
    .pipe(z.string().min(1, { message: 'Title is required' }))
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
