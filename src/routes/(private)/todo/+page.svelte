<script lang="ts">
  import type { PageData } from './$types';
  import { createTodoStore } from '$lib/stores/todo';
  import AddTodoForm from './add-todo.svelte';
  import TodoList from './todo-list.svelte';
  export let data: PageData;

  let todos = createTodoStore(
    data.todos.map((todo) => {
      return {
        complete: todo.complete,
        description: todo.description,
        id: todo.id,
        due: todo.due,
        category: todo.category
      };
    })
  );
</script>

<div class="container mx-auto py-8">
  <AddTodoForm data={data.form} todoStore={todos} />
  <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
    <div class="todo">
      <h2 class="mb-4 text-2xl font-bold text-gray-700">Todo</h2>
      <TodoList todoStore={todos} complete={false} />
    </div>

    <div class="done">
      <h2 class="mb-4 text-2xl font-bold text-gray-700">Complete</h2>
      <TodoList todoStore={todos} complete={true} />
    </div>
  </div>
</div>
