<script lang="ts">
	export class TodoList extends SvelteComponent {}
	import { flip } from 'svelte/animate';
	import { send, receive } from '../aminations/transition';
	import { SvelteComponent } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Trash } from 'lucide-svelte';

	export let store: ReturnType<typeof import('$lib/stores/todo').createTodoStore>;
	export let done;
</script>

<ul class="todos">
	{#each $store.filter((todo) => todo.done === done) as todo (todo.id)}
		<li
			class:done
			in:receive={{ key: todo.id }}
			out:send={{ key: todo.id }}
			animate:flip={{ duration: 200 }}
		>
			<label>
				<input
					type="checkbox"
					checked={todo.done}
					on:change={(e) => store.mark(todo, e.currentTarget.checked)}
				/>

				<span>{todo.description}</span>

				<Button on:click={() => store.remove(todo)} size="icon" aria-label="Remove"
					><Trash /></Button
				>
			</label>
		</li>
	{/each}
</ul>

<style>
	label {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.done {
		opacity: 0.5;
	}

	span {
		flex: 1;
	}
</style>
