import type { Todo } from '$lib/types/todo-item';
import { writable } from 'svelte/store';

export function createTodoStore(initial: Todo[]) {
  const { subscribe, update } = writable(initial);

  return {
    subscribe,
    add: ({
      id,
      isComplete = false,
      title,
      dueDate = new Date().toDateString(),
      category
    }: Todo) => {
      const todo: Todo = {
        id: id!,
        isComplete,
        dueDate,
        title,
        category
      };

      console.log('todo', todo);

      update(($todos) => [...$todos, todo]);
    },
    remove: (todo: Todo) => {
      update(($todos) => $todos.filter((t) => t.id !== todo.id));
    },
    mark: (todo: Todo, complete: boolean) => {
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
