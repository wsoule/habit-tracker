<script lang="ts">
  import TodoList from '$lib/components/TodoList.svelte';
    import type { PageData } from './$types';
    import { enhance } from '$app/forms';
    import { createTodoStore } from '$lib/stores/todo';
  export let data: PageData

  const todos= createTodoStore([{
    done: false,
    description: 'Hello'
  }])
  console.log('data = ', data)
  // const todos = createTodoStore(data.countries.map((country) => {
  //   return {
  //   done: false,
  //   description: country.name
  // }}));
</script>


<div class="board">
  <form method="post" use:enhance>
  <input
    placeholder="what needs to be done?"
    name="description"
  />
  </form>

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
