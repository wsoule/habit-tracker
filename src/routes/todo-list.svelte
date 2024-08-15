<script lang="ts">
  export class TodoList extends SvelteComponent {}
  import { flip } from 'svelte/animate';
  import { SvelteComponent } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Trash } from 'lucide-svelte';
  import { receive, send } from '$lib/aminations/transition';
  import { type Infer, type SuperForm } from 'sveltekit-superforms';
  import { Checkbox } from '$lib/components/ui/checkbox/index.js';
  import type { TodoStatusFormSchema } from './schema';
  import { Label } from '$lib/components/ui/label';

  export let form: SuperForm<Infer<TodoStatusFormSchema>>;
  export let todoStore: ReturnType<typeof import('$lib/stores/todo').createTodoStore>;
  export let complete;
</script>

<ul class="todos">
  {#each $todoStore.filter((todo) => todo.complete === complete) as todo (todo.id)}
    <li
      class:complete
      in:receive={{ key: todo.id }}
      out:send={{ key: todo.id }}
      animate:flip={{ duration: 200 }}
    >
      <Label
        class="flex w-full items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        <Checkbox
          class="mr-2"
          aria-checked={todo.complete}
          checked={todo.complete}
          onCheckedChange={async (checkComplete) => {
            if (typeof checkComplete !== 'boolean') {
              return;
            }
            const response = await fetch('/todo', {
              method: 'POST',
              body: JSON.stringify({ complete: checkComplete, id: todo.id }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            if (response.status === 200) {
              todoStore.mark(todo, checkComplete);
            }
          }}
        />
        <span>{todo.description}</span>

        <Button on:click={() => todoStore.remove(todo)} size="icon" aria-label="Remove">
          <Trash />
        </Button>
      </Label>
    </li>
  {/each}
</ul>

<style>
  label {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .complete {
    opacity: 0.5;
  }

  span {
    flex: 1;
  }
</style>
