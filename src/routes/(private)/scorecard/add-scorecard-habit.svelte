<script lang="ts">
  import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { browser } from '$app/environment';
  import { Root, RadioGroupItem, RadioGroupInput } from '$lib/components/ui/radio-group';
  import {
    FormFieldset,
    FormLegend,
    FormFieldErrors,
    FormLabel,
    FormButton,
    FormControl,
    FormDescription,
    FormField,
    FieldErrors
  } from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { addScoreCardSchema, type AddScorecardFormSchema } from '$lib/types/zod/habit.schema';
  export let data: SuperValidated<Infer<AddScorecardFormSchema>>;
  let creating: boolean;

  const form = superForm(data, {
    validators: zodClient(addScoreCardSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error('Please fix the errors in the form.');
      }
    }
  });

  const { form: formData, delayed, enhance } = form;
</script>

<form method="POST" action="?/create-current-habbit" class="w-2/3 space-y-6" use:enhance>
  <FormField {form} name="habit" class="space-y-3">
    <FormControl let:attrs>
      <FormLabel>Add Current Habbit</FormLabel>
      <Input
        {...attrs}
        autofocus
        disabled={creating}
        bind:value={$formData.habit}
        placeholder="Today i did..."
      />
    </FormControl>
    <FormDescription>
      {#if $delayed}
        <span>Working...</span>
      {/if}
    </FormDescription>
    <FieldErrors />
  </FormField>
  <FormFieldset {form} name="type" class="space-y-3">
    <FormLegend>It&apos;s Influence on me...</FormLegend>
    <Root bind:value={$formData.type} class="flex flex-col space-y-1">
      <div class="flex items-center space-x-3 space-y-0">
        <FormControl let:attrs>
          <RadioGroupItem value="good" {...attrs} />
          <FormLabel class="font-normal">Good</FormLabel>
        </FormControl>
      </div>
      <div class="flex items-center space-x-3 space-y-0">
        <FormControl let:attrs>
          <RadioGroupItem value="neutral" {...attrs} />
          <FormLabel class="font-normal">Neutral</FormLabel>
        </FormControl>
      </div>
      <div class="flex items-center space-x-3 space-y-0">
        <FormControl let:attrs>
          <RadioGroupItem value="bad" {...attrs} />
          <FormLabel class="font-normal">Bad</FormLabel>
        </FormControl>
      </div>
      <RadioGroupInput name="type" />
    </Root>
    <FormFieldErrors />
  </FormFieldset>
  <FormButton>Submit</FormButton>
  {#if browser}
    <SuperDebug data={$formData} />
  {/if}
</form>
