<script lang="ts">
  import type { PageData } from './$types';
  import { createTodoStore } from '$lib/stores/todo';
  import AddTodoForm from './add-todo.svelte';
  import TodoList from './todo-list.svelte';
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
  } from '$lib/components/ui/accordion';
  export let data: PageData;

  let todos = createTodoStore(
    data.todos.map((todo) => {
      return {
        isComplete: todo.isComplete,
        title: todo.title,
        id: todo.id,
        dueDate: todo.dueDate,
        category: todo.category
      };
    })
  );
</script>

<div class="container mx-auto py-8">
  <Accordion>
    <AccordionItem value="add-todo">
      <AccordionTrigger>Add Task</AccordionTrigger>
      <AccordionContent>
        <AddTodoForm data={data.form} todoStore={todos} />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
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
