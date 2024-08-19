<script lang="ts">
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import FormField from '$lib/components/ui/form/form-field.svelte';
  import { FieldErrors, FormControl, FormDescription, FormLabel } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { addTodoFormSchema, type AddTodoFormSchema } from '$lib/types/zod/todo.schema';
  import type { SelectTask } from '$lib/db/schema/todo.table';

  export let data: SuperValidated<Infer<AddTodoFormSchema>>;
  export let todoStore: ReturnType<typeof import('$lib/stores/todo').createTodoStore>;

  let creating: boolean;
  const form = superForm(data, {
    async onUpdate({ result }) {
      console.log('getting to update', result);
      if (result.status === 200) {
        const { id, title, isComplete } = result.data.newTodo[0] as SelectTask;
        console.log('addint ');
        todoStore.add({
          id,
          title,
          isComplete,
          category: 'task',
          dueDate: new Date()
        });
      }
    },
    validators: zodClient(addTodoFormSchema)
  });
  const { form: formData, enhance, delayed } = form;
</script>

<div class="p-4">
  <form method="post" action="?/create" use:enhance class="space-y-6">
    <FormField {form} name="title">
      <FormControl let:attrs>
        <FormLabel class="text-lg font-semibold text-gray-700">Task</FormLabel>
        <Input
          autofocus
          {...attrs}
          disabled={creating}
          bind:value={$formData.title}
          placeholder="What needs to be done?"
          class="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </FormControl>
      <FormDescription>
        {#if $delayed}
          <span class="text-sm text-gray-500">Working...</span>
        {/if}
      </FormDescription>
      <FieldErrors class="text-red-500" />
    </FormField>
  </form>
</div>
