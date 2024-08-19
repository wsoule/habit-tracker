import type { InsertTask, SelectTask } from '$lib/db/schema/todo.table';
import type { TodoItem } from '$lib/types/todo-item';
import { writable } from 'svelte/store';

export type Todo = {
  id: string;
  title: string;
  isComplete: boolean;
  category: 'habit' | 'task';
  dueDate: string;
};

export function createTodoStore(initial: Todo[]) {
  const { subscribe, update } = writable(initial);

  return {
    subscribe,
    add: ({ id, isComplete = false, title, dueDate = new Date().toDateString() }: Todo) => {
      // const todo: SelectTask = {
      //   id,
      //   isComplete,
      //   ,
      //   due: due ?? new Date().toDateString(),
      // category
      // };

      const todo: Todo = {
        id: id!,
        isComplete,
        dueDate,
        title
      };

      console.log('todo', todo);

      update(($todos) => [...$todos, todo]);
    },
    remove: (todo: Omit<SelectTask, 'userId' | 'createdAt' | 'updatedAt'>) => {
      update(($todos) => $todos.filter((t) => t.id !== todo.id));
    },
    mark: (todo: Omit<SelectTask, 'userId' | 'createdAt' | 'updatedAt'>, complete: boolean) => {
      console.log('marked todo', todo);
      update(($todos) => [
        ...$todos.filter((t) => t.id !== todo.id),
        {
          ...todo,
          isComplete: complete
        }
      ]);
      console.log('marked todos2', todo);
    }
  };
}
