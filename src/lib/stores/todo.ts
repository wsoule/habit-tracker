import type { TodoItem } from '$lib/types/todo-item';
import { writable } from 'svelte/store';

export function createTodoStore(initial: TodoItem[]) {

  // const todos: TodoItem[] = initial.map(({ complete, description }) => {
  //   return {
  //     complete,
  //     description
  //   };
  // });

  const { subscribe, update } = writable(initial);

  return {
    subscribe,
    add: ({id, complete = false, description}: TodoItem) => {
      const todo = {
        id,
        complete,
        description
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

