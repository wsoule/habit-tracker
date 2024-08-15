<script lang="ts">
  import type { PageData } from './$types';
  import { createTodoStore } from '$lib/stores/todo';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { formSchema, type FormSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import FormField from '$lib/components/ui/form/form-field.svelte';
  import { FieldErrors, FormControl, FormDescription, FormLabel } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  export let data: SuperValidated<Infer<FormSchema>>;
  // export let todoStore;

  const form = superForm(data, {
    validators: zodClient(formSchema)
  });

  const { form: formData, enhance } = form;

  // let todoStore = createTodoStore(
  //   data.todos.map((todo) => {
  //     return {
  //       done: todo.complete,
  //       description: todo.title,
  //       id: todo.id
  //     };
  //   })
  // );
	    // <!-- use:enhance={() => { -->
	    // <!--   creating = true; -->
	    // <!--   todoStore.add(createdTodo); -->
	    // <!--   return async ({ update }) => { -->
	    // <!--     await update(); -->
	    // <!--     creating = false; -->
	    // <!--   }; -->
	    // <!-- }} -->

  let createdTodo: string;
  let creating: boolean;
</script>

<div class="board">
  <form
    method="post"
    action="?/create"
		use:enhance
  >
    <FormField {form} name="title">
      <FormControl let:attrs>
        <FormLabel>Title</FormLabel>
        <Input
          {...attrs}
          disabled={creating}
          bind:value={$formData.title}
          placeholder="what needs to be done?"
        />
      </FormControl>
      <FormDescription>
        {#if creating}
          <span class="saving">saving...</span>
        {/if}
      </FormDescription>
      <FieldErrors />
    </FormField>
  </form>
</div>
