<script lang="ts">
  export class TodoList extends SvelteComponent {}
  import { flip } from 'svelte/animate';
  import { send, receive } from '../aminations/transition';
  import { SvelteComponent } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
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
			class="bg-gray-50 rounded-xl p-2 my-2 "
    >
			<div class="flex items-center space-x-2">
				<Checkbox id="terms" onCheckedChange={(e) => {
					console.log(e)
				}} aria-labelledby="terms-label" />
  <Label
    id="terms-label"
    for="terms"
    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full flex justify-between items-center"
  >
					{todo.description}
					<Button on:click={() => store.remove(todo)} size="icon" aria-label="Remove"
						><Trash /></Button>
  </Label>
</div>
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
