<script lang="ts">
  import { flip } from 'svelte/animate';
  import { Button } from '$lib/components/ui/button';
  import { Trash } from 'lucide-svelte';
  import { receive, send } from '$lib/aminations/transition';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';

  export let todoStore: ReturnType<typeof import('$lib/stores/todo').createTodoStore>;
  export let complete;
</script>

<ul class="todos space-y-2">
  {#each $todoStore.filter((todo) => todo.complete === complete) as todo (todo.id)}
    <li
      class="flex items-center justify-between rounded-md border bg-white p-2 shadow-sm transition-opacity duration-150 ease-in-out hover:bg-gray-100"
      class:complete
      in:receive={{ key: todo.id }}
      out:send={{ key: todo.id }}
      animate:flip={{ duration: 200 }}
    >
      <Label class="flex items-center space-x-2">
        <Checkbox
          class="mr-2"
          aria-checked={todo.complete}
          checked={todo.complete}
          onCheckedChange={async (checkComplete) => {
            if (typeof checkComplete !== 'boolean') return;

            const response = await fetch('/todo', {
              method: 'POST',
              body: JSON.stringify({ complete: checkComplete, id: todo.id }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (response.status === 200) {
              console.log('marking ');
              todoStore.mark(todo, checkComplete);
            }
          }}
        />
        <span class={todo.complete ? 'text-gray-500 line-through' : ''}>{todo.description}</span>
      </Label>

      <Button
        on:click={async () => {
          const deleteResponse = await fetch('/todo', {
            method: 'POST',
            body: JSON.stringify({ id: todo.id, remove: true }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (deleteResponse.status === 200) {
            todoStore.remove(todo);
          }
        }}
        size="icon"
        aria-label="Remove"
        class="ml-2"
      >
        <Trash class="h-4 w-4 text-red-500" />
      </Button>
    </li>
  {/each}
</ul>

<style>
  .complete {
    opacity: 0.6;
  }
</style>
