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
</script>

<AddScorecardHabit {habitStore} data={data.addScorecardForm} />
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead class="w-[100px]">Habit</TableHead>
      <TableHead>Days</TableHead>
      <TableHead>Influence</TableHead>
      <TableHead class="text-right">Action</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each $habitStore as habit}
      <TableRow>
        <TableCell class="font-medium">{habit.title}</TableCell>
        <TableCell
          >{habit.frequency.length === daysOfWeekArray.length
            ? 'all'
            : habit.frequency.length === 2 && habit.frequency.every((day) => weekends.includes(day))
              ? 'weekends'
              : habit.frequency.length === 5 &&
                  weekdays.every((day) => habit.frequency.includes(day))
                ? 'weekdays'
                : habit.frequency.map((day) => day.substring(0, 2))}</TableCell
        >
        <TableCell>{habit.influence}</TableCell>
        <TableCell class="text-right">$25000</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
