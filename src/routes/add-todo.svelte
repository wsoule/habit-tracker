<script lang="ts">
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import { formSchema, type FormSchema } from './schema';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import FormField from '$lib/components/ui/form/form-field.svelte';
  import { FieldErrors, FormControl, FormDescription, FormLabel } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  export let data: SuperValidated<Infer<FormSchema>>;
  import { page } from '$app/stores';
  export let todoStore: ReturnType<typeof import('$lib/stores/todo').createTodoStore>;


  const form = superForm(data, {
    onUpdate({ result }) {
      console.log('getting to update', result);
      if (result.status === 200) {
        console.log('result = ', result);
        todoStore.add(result.data.newTodo[0].title);
      }
    },
    onError({ result }) {
			errors.set({
				title: [result.error.message]
			})
    },
    validators: zodClient(formSchema)
  });

  const { form: formData, enhance, delayed, message, errors } = form;


  console.log('messaeg  ', $message);
  let creating: boolean;
</script>

{#if $message}
  <h3 class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<div class="board">
  <form method="post" action="?/create" use:enhance>
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
        {#if $delayed}
          <span class="saving">Working...</span>
				{/if}
      </FormDescription>
      <FieldErrors />
    </FormField>
  </form>
</div>
