import { z } from 'zod';

export const addTodoFormSchema = z.object({
  description: z.string().min(2)
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
