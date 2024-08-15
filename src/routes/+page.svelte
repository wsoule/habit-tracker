<script lang="ts">
  import type { PageData } from './$types';
  import { createTodoStore } from '$lib/stores/todo';
  import AddTodoForm from './add-todo.svelte';
  import TodoList from './todo-list.svelte';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { todoStatusSchema } from './schema'
  export let data: PageData;

  console.log('data.todos = ', data.todos)
  let todos = createTodoStore(
    data.todos.map((todo) => {
      return {
        complete: todo.complete,
        description: todo.title,
        id: todo.id
      };
    })
  );
  const form = superForm(data.changeTodoForm, {
    validators: zodClient(todoStatusSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        console.log('success');
      } else {
        console.log('error');
      }
    }
  });
</script>

<div class="board">
  <AddTodoForm data={data.form} todoStore={todos} />

  <div class="todo">
    <h2>todo</h2>
    <TodoList {form} todoStore={todos} complete={false} />
  </div>

  <div class="done">
    <h2>complete</h2>
    <TodoList {form} todoStore={todos} complete={true} />
  </div>
</div>

<style>
  .board {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
    max-width: 36em;
    margin: 0 auto;
  }

  .board > input {
    font-size: 1.4em;
    grid-column: 1/3;
    padding: 0.5em;
    margin: 0 0 1rem 0;
  }

  h2 {
    font-size: 2em;
    font-weight: 200;
  }
</style>
