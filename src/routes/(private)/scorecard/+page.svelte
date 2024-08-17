<script lang="ts">
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from '$lib/components/ui/table';
  import { createHabitStore } from '$lib/stores/habit';
  import type { DayOfWeek } from '$lib/types/zod/habit.schema';
  import { daysOfWeekArray } from '$lib/types/zod/habit.schema';
  import type { PageData } from './$types';
  import AddScorecardHabit from './add-scorecard-habit.svelte';

  export let data: PageData;

  let habitStore = createHabitStore(
    data.habits.map((habit) => {
      return {
        id: habit.id,
        title: habit.title,
        influence: habit.influence,
        frequency: habit.frequency as DayOfWeek[]
      };
    })
  );
  console.log('data habits = ', data.habits);
  console.log('habitStore = ', $habitStore);
  const weekdays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const weekends: DayOfWeek[] = ['saturday', 'sunday'];

  // Utility function to format the frequency nicely
  function formatFrequency(frequency: DayOfWeek[]): string {
    if (frequency.length === daysOfWeekArray.length) return 'All days';
    if (frequency.length === 2 && frequency.every((day) => weekends.includes(day)))
      return 'Weekends';
    if (frequency.length === 5 && weekdays.every((day) => frequency.includes(day)))
      return 'Weekdays';
    return frequency.map((day) => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
  }

  // Utility function to determine the influence color
  function getInfluenceClass(influence: string): string {
    switch (influence) {
      case 'good':
        return 'text-primary';
      case 'bad':
        return 'text-destructive';
      case 'neutral':
      default:
        return 'text-muted-foreground';
    }
  }
</script>

<AddScorecardHabit {habitStore} data={data.addScorecardForm} />

<Table class="mt-4 w-full border rounded-xl overflow-hidden">
  <TableCaption class="bg-gray-100 p-2">Your Habit Scorecard</TableCaption>
  <TableHeader>
    <TableRow class="bg-gray-100">
      <TableHead class="w-[150px] text-left">Habit</TableHead>
      <TableHead class="text-left">Days</TableHead>
      <TableHead class="text-center">Influence</TableHead>
      <TableHead class="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each $habitStore as habit}
      <TableRow class="transition-colors duration-150 hover:bg-gray-50">
        <TableCell class="p-2 font-medium">{habit.title}</TableCell>
        <TableCell class="p-2 text-left">{formatFrequency(habit.frequency)}</TableCell>
        <TableCell class="p-2 text-center capitalize {getInfluenceClass(habit.influence)}">
          {habit.influence}
        </TableCell>
        <TableCell class="p-2 text-right">
          <button class="rounded bg-blue-500 px-3 py-1 text-white transition-colors hover:bg-blue-600">
            Edit
          </button>
        </TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>

