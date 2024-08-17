<script lang="ts">
  import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { browser } from '$app/environment';
  import type { PageData } from './$types';
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
  import { addScoreCardSchema } from '../todo/schema';
  import { Input } from '$lib/components/ui/input';

  export let data: PageData;
  let creating: boolean;

  const form = superForm(data.addScorecardForm, {
    validators: zodClient(addScoreCardSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error('Please fix the errors in the form.');
      }
    }
  });

  const { form: formData, delayed, message, errors, enhance } = form;
  $formData.type = 'neutral';
</script>

<form method="POST" action="/?/radioGroup" class="w-2/3 space-y-6" use:enhance>
  <FormField {form} name="habit" class="space-y-3">
    <FormControl let:attrs>
      <FormLabel>Your Current Habbit</FormLabel>
      <Input
        {...attrs}
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
    <FormLegend>Notify me about...</FormLegend>
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
