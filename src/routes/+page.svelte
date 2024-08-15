<script lang="ts">
  import TodoList from '$lib/components/TodoList.svelte';
  import type { PageData } from './$types';
  import { createTodoStore } from '$lib/stores/todo';
  import AddTodoForm from './add-todo.svelte'
  export let data: PageData;



  let todos = createTodoStore(
    data.todos.map((todo) => {
      return {
        done: todo.complete,
        description: todo.title,
        id: todo.id
      };
    })
  );
</script>

<div class="board">
  <AddTodoForm  data={data.form} todoStore={todos} />

  <div class="todo">
    <h2>todo</h2>
    <TodoList store={todos} done={false} />
  </div>

  <div class="done">
    <h2>done</h2>
    <TodoList store={todos} done={true} />
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
