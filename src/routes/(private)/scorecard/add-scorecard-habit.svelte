<script lang="ts">
  import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
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
  import {
    addScoreCardSchema,
    binaryToDaysArray,
    daysOfWeekArray,
    type AddScorecardFormSchema,
    type DayOfWeek
  } from '$lib/types/zod/habit.schema';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import Label from '$lib/components/ui/label/label.svelte';
  import { createHabitStore } from '$lib/stores/habit';
  import type { SelectHabit } from '$lib/db/schema/habbit.table';

  export let data: SuperValidated<Infer<AddScorecardFormSchema>>;
  export let habitStore: ReturnType<typeof createHabitStore>;
  let creating: boolean;

  const form = superForm(data, {
    validators: zodClient(addScoreCardSchema),
    clearOnSubmit: 'none',
    onUpdated: ({ form: f }) => {
      console.log(' f =', f);
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error('Please fix the errors in the form.');
      }
    },
    onUpdate: ({ result }) => {
      if (result.status === 200) {
        const { id, title, influence, frequency } = result.data.newHabit[0] as SelectHabit;
        habitStore.add({
          id,
          title,
          influence,
          frequency: binaryToDaysArray(frequency)
        });
      }
    }
  });
  const { form: formData, delayed, enhance } = form;

  $: allChecked = $formData.frequency.length === daysOfWeekArray.length;

  const addItem = (dayofWeek: DayOfWeek) => {
    $formData.frequency = [...$formData.frequency, dayofWeek];
  };

  const removeItem = (dayofWeek: string) => {
    $formData.frequency = $formData.frequency.filter((day) => day !== dayofWeek);
  };
</script>

<form
  method="POST"
  action="?/create-current-habbit"
  class="mx-auto w-full max-w-md space-y-6 p-4"
  use:enhance
>
  <FormField {form} name="title" class="space-y-3">
    <FormControl let:attrs>
      <FormLabel>Add Current Habit</FormLabel>
      <Input
        {...attrs}
        autofocus
        disabled={creating}
        bind:value={$formData.title}
        placeholder="Today I did..."
        class="w-full"
      />
    </FormControl>
    <FormDescription>
      {#if $delayed}
        <span>Working...</span>
      {/if}
    </FormDescription>
    <FieldErrors />
  </FormField>

  <FormFieldset {form} name="influence" class="space-y-3">
    <FormLegend>Its Influence on Me</FormLegend>
    <Root bind:value={$formData.influence} class="flex flex-col space-y-2">
      <div class="flex items-center space-x-2">
        <FormControl let:attrs>
          <RadioGroupItem value="good" {...attrs} />
          <FormLabel class="font-normal">Good</FormLabel>
        </FormControl>
      </div>
      <div class="flex items-center space-x-2">
        <FormControl let:attrs>
          <RadioGroupItem value="neutral" {...attrs} />
          <FormLabel class="font-normal">Neutral</FormLabel>
        </FormControl>
      </div>
      <div class="flex items-center space-x-2">
        <FormControl let:attrs>
          <RadioGroupItem value="bad" {...attrs} />
          <FormLabel class="font-normal">Bad</FormLabel>
        </FormControl>
      </div>
      <RadioGroupInput name="influence" />
    </Root>
    <FormFieldErrors />
  </FormFieldset>

  <FormFieldset {form} name="frequency" class="space-y-4">
    <div>
      <FormLegend class="text-base">Days of the Week</FormLegend>
      <FormDescription>Select the days this habit occurs.</FormDescription>
    </div>
    <div class="space-y-2">
      <div class="flex items-center space-x-3">
        <Checkbox
          id="all"
          bind:checked={allChecked}
          onCheckedChange={(v) => {
            if (v) {
              $formData.frequency = [...daysOfWeekArray];
            } else {
              $formData.frequency = [];
            }
          }}
        />
        <Label for="all" class="font-normal">Every Day</Label>
      </div>
      {#each daysOfWeekArray as dayofWeek}
        {@const checked = $formData.frequency.includes(dayofWeek)}
        <div class="flex items-center space-x-3">
          <FormControl let:attrs>
            <Checkbox
              {...attrs}
              {checked}
              onCheckedChange={(v) => {
                if (v) {
                  addItem(dayofWeek);
                } else {
                  removeItem(dayofWeek);
                }
              }}
            />
            <FormLabel class="font-normal capitalize">{dayofWeek}</FormLabel>
            <input hidden type="checkbox" name={attrs.name} value={dayofWeek} {checked} />
          </FormControl>
        </div>
      {/each}
      <FormFieldErrors />
    </div>
  </FormFieldset>

  <FormButton class="w-full">Submit</FormButton>
</form>
