<script lang="ts">
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import FormField from '$lib/components/ui/form/form-field.svelte';
  import { FieldErrors, FormControl, FormDescription, FormLabel } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { addTodoFormSchema, type AddTodoFormSchema } from '$lib/types/zod/todo.schema';

  export let data: SuperValidated<Infer<AddTodoFormSchema>>;
  export let todoStore: ReturnType<typeof import('$lib/stores/todo').createTodoStore>;

  let creating: boolean;
  const form = superForm(data, {
    async onUpdate({ result }) {
      console.log('getting to update', result);
      if (result.status === 200) {
        const { id, description, complete } = result.data.newTodo[0];
        todoStore.add({
          id,
          description,
          complete
        });
      }
    },
    validators: zodClient(addTodoFormSchema)
  });

  const { form: formData, enhance, delayed } = form;
</script>

<div class="board">
  <form method="post" action="?/create" use:enhance>
    <FormField {form} name="description">
      <FormControl let:attrs>
        <FormLabel>task</FormLabel>
        <Input
          autofocus
          {...attrs}
          disabled={creating}
          bind:value={$formData.description}
          placeholder="what needs to be done?"
        />
      </FormControl>
      <FormDescription>
        {#if $delayed}
          <span class="saving">Working...</span>
        {/if}
      </FormDescription>
      <FieldErrors />
    </FormField>
  </form>
</div>
