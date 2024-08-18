<script lang="ts">
  import { flip } from 'svelte/animate';
  import { Button } from '$lib/components/ui/button';
  import { Trash } from 'lucide-svelte';
  import { receive, send } from '$lib/aminations/transition';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import type { TodoItem } from '$lib/types/todo-item';
  import type { InsertTask, SelectTask } from '$lib/db/schema/todo.table';

  export let todoStore: ReturnType<typeof import('$lib/stores/todo').createTodoStore>;
  export let complete;

  // Handle the todo update when a row is clicked
  const toggleTodo = async (todo: Omit<SelectTask, 'userId' | 'createdAt' | 'updatedAt'>) => {
    const checkComplete = !todo.isComplete;
    const response = await fetch('/todo', {
      method: 'POST',
      body: JSON.stringify({ isComplete: checkComplete, id: todo.id }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      todoStore.mark(todo, checkComplete);
    }
  };

  // Handle the todo removal
  const removeTodo = async (
    todo: Omit<SelectTask, 'userId' | 'createdAt' | 'updatedAt'>,
    event: Event
  ) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
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
  };
</script>

<div class="todos space-y-2">
  {#each $todoStore.filter((todo) => todo.isComplete === complete) as todo (todo.id)}
    <div
      role="button"
      tabindex="0"
      aria-pressed={todo.isComplete}
      class="flex w-full cursor-pointer items-center justify-between rounded-md border bg-white p-2 shadow-sm transition-opacity duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      class:complete
      on:click={() => toggleTodo(todo)}
      on:keydown={(event) => {
        if (event.key === ' ' || event.key === 'Enter') {
          toggleTodo(todo);
          event.preventDefault(); // Prevent scrolling on space key
        }
      }}
      in:receive={{ key: todo.id }}
      out:send={{ key: todo.id }}
      animate:flip={{ duration: 200 }}
    >
      <div class="flex items-center space-x-2">
        <Checkbox
          id={`checkbox-${todo.id}`}
          class="pointer-events-none mr-2"
          aria-checked={todo.isComplete}
          checked={todo.isComplete}
        />
        <Label for={`checkbox-${todo.id}`} class="w-full">
          <span class={todo.isComplete ? 'text-gray-500 line-through' : ''}>
            {todo.title}
          </span>
        </Label>
      </div>
      <Button
        on:click={(event) => removeTodo(todo, event)}
        size="icon"
        variant="outline"
        aria-label="Remove"
        class="ml-2 border-transparent hover:border-destructive"
      >
        <Trash class="h-4 w-4 text-red-500" />
      </Button>
    </div>
  {/each}
</div>

<style>
  .complete {
    opacity: 0.6;
  }
</style>
