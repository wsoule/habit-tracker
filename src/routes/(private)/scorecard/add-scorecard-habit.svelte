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
  import {
    addScoreCardSchema,
    daysOfWeekArray,
    type AddScorecardFormSchema,
    type DayOfWeek
  } from '$lib/types/zod/habit.schema';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import Label from '$lib/components/ui/label/label.svelte';
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

  $: allChecked = $formData.daysOfWeek.length === daysOfWeekArray.length;

  const addItem = (dayofWeek: DayOfWeek) => {
    $formData.daysOfWeek = [...$formData.daysOfWeek, dayofWeek];
  };

  const removeItem = (dayofWeek: string) => {
    $formData.daysOfWeek = $formData.daysOfWeek.filter((day) => day !== dayofWeek);
  };
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
  <FormFieldset {form} name="influence" class="space-y-3">
    <FormLegend>It&apos;s Influence on me...</FormLegend>
    <Root bind:value={$formData.influence} class="flex flex-col space-y-1">
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
  <FormFieldset {form} name="daysOfWeek" class="space-y-0">
    <div class="mb-4">
      <FormLegend class="text-base">Sidebar</FormLegend>
      <FormDescription>Select the items you want to display in the sidebar.</FormDescription>
    </div>
    <div class="space-y-2">
      <div class="flex flex-row items-center space-x-3">
        <Checkbox
          id="all"
          bind:checked={allChecked}
          onCheckedChange={(v) => {
            if (v) {
              $formData.daysOfWeek = [...daysOfWeekArray];
            } else {
              $formData.daysOfWeek = [];
            }
          }}
        />
        <Label for="all" class="font-normal">All</Label>
      </div>
      {#each daysOfWeekArray as dayofWeek}
        {@const checked = $formData.daysOfWeek.includes(dayofWeek)}
        <div class="flex flex-row items-start space-x-3">
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
            <FormLabel class="font-normal">
              {dayofWeek}
            </FormLabel>
            <input hidden type="checkbox" name={attrs.name} value={dayofWeek} {checked} />
          </FormControl>
        </div>
      {/each}
      <FormFieldErrors />
    </div>
  </FormFieldset>
  <FormButton>Submit</FormButton>
  {#if browser}
    <SuperDebug data={$formData} />
  {/if}
</form>
