import type { TodoItem } from '$lib/types/todo-item';
import { writable } from 'svelte/store';

export function createTodoStore(initial: TodoItem[]) {
  const { subscribe, update } = writable(initial);

  return {
    subscribe,
    add: ({
      id,
      complete = false,
      description,
      due,
      category = 'task'
    }: Omit<TodoItem, 'due' | 'category'> & Partial<Pick<TodoItem, 'due' | 'category'>>) => {
      const todo: TodoItem = {
        id,
        complete,
        description,
        due: due ?? new Date().toDateString(),
        category
      };

      update(($todos) => [...$todos, todo]);
    },
    remove: (todo: TodoItem) => {
      update(($todos) => $todos.filter((t) => t !== todo));
    },
    mark: (todo: TodoItem, complete: boolean) => {
      update(($todos) => [...$todos.filter((t) => t !== todo), { ...todo, complete: complete }]);
    }
  };
}
