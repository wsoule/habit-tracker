import type { TodoItem } from '$lib/types/todo-item';
import { writable } from 'svelte/store';

export function createTodoStore(initial: TodoItem[]) {
	let uid = 1;

	const todos: TodoItem[] = initial.map(({ done, description }) => {
		return {
			id: uid++,
			done,
			description
		};
	});

	const { subscribe, update } = writable(todos);

	return {
		subscribe,
		add: (description: string) => {
			const todo = {
				id: uid++,
				done: false,
				description
			};

			update(($todos) => [...$todos, todo]);
		},
		remove: (todo: TodoItem) => {
			update(($todos) => $todos.filter((t) => t !== todo));
		},
		mark: (todo: TodoItem, done: boolean) => {
			update(($todos) => [...$todos.filter((t) => t !== todo), { ...todo, done }]);
		}
	};
}
