<script lang="ts">
  import { flip } from 'svelte/animate';
  import { Button } from '$lib/components/ui/button';
  import { Ellipsis, Trash, ChartNoAxesColumn, Pencil, NotebookPen } from 'lucide-svelte';
  import { receive, send } from '$lib/aminations/transition';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import type { Todo } from '$lib/types/todo-item';
  import { Badge } from '$lib/components/ui/badge';
  import type { createTodoStore } from '$lib/stores/todo';
  import { toast } from 'svelte-sonner';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

  export let todoStore: ReturnType<typeof createTodoStore>;
  export let complete;

  // Handle the todo update when a row is clicked
  const toggleTodo = async (todo: Todo) => {
    const checkComplete = !todo.isComplete;
    const response = await fetch('/todo', {
      method: 'POST',
      body: JSON.stringify({ isComplete: checkComplete, id: todo.id, category: todo.category }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
      todoStore.mark(todo, checkComplete);
    }
  };

  // Handle the todo removal
  const removeTodo = async (todo: Todo, event: Event) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent
    const deleteResponse = await fetch('/todo', {
      method: 'POST',
      body: JSON.stringify({ id: todo.id, remove: true, category: todo.category }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (deleteResponse.status === 400) {
      const deleteResError = await deleteResponse.json();
      console.log('delete response =', deleteResError);
      toast.error(deleteResError.message);
      console.log('got the error message');
    } else if (deleteResponse.status === 200) {
      todoStore.remove(todo);
    }
  };
</script>

<div class="todos space-y-2">
  {#each $todoStore.filter((todo) => todo.isComplete === complete) as todo (todo.id)}
    <div
      class="flex w-full items-center justify-between rounded-md border p-2 shadow-sm transition-opacity duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      class:complete
      in:receive={{ key: todo.id }}
      out:send={{ key: todo.id }}
      animate:flip={{ duration: 200 }}
    >
      <div class="flex items-center space-x-2">
        <Checkbox
          id={`checkbox-${todo.id}`}
          class="mr-2"
          aria-checked={todo.isComplete}
          checked={todo.isComplete}
          onCheckedChange={() => {
            toggleTodo(todo);
          }}
        />
        <Label for={`checkbox-${todo.id}`} class="w-full">
          <span class={todo.isComplete ? 'text-gray-500 line-through' : ''}>
            {todo.title}
          </span>
          <Badge variant="secondary">{todo.category}</Badge>
        </Label>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
            <span class="sr-only">Open menu</span>
            <Ellipsis class="h-4 w-4" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item><Pencil class="mr-2 h-4 w-4" /><span>Edit</span></DropdownMenu.Item>
            <DropdownMenu.Item
              ><NotebookPen class="mr-2 h-4 w-4" /><span>Add note</span></DropdownMenu.Item
            >
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          {#if todo.category === 'habit'}
            <DropdownMenu.Item
              ><ChartNoAxesColumn class="mr-2 h-4 w-4" /><span>View Stats</span></DropdownMenu.Item
            >
          {/if}
          {#if todo.category === 'task'}
            <DropdownMenu.Item on:click={(event) => removeTodo(todo, event)}
              ><Trash class="mr-2 h-4 w-4 text-destructive" /><span class="text-destructive"
                >Delete</span
              ></DropdownMenu.Item
            >
          {/if}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  {/each}
</div>

<style>
  .complete {
    opacity: 0.6;
  }
</style>
