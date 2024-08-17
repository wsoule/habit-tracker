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
  import type { PageData } from './$types';
  import AddScorecardHabit from './add-scorecard-habit.svelte';

  export let data: PageData;

  let habitStore = createHabitStore(
    data.habits.map((habit) => {
      return {
        id: habit.id,
        title: habit.title,
        influence: habit.influence,
        frequency: habit.frequency
      };
    })
  );
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
    <TableRow>
      <TableCell class="font-medium">Excesice</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell class="text-right">$25000</TableCell>
    </TableRow>
  </TableBody>
</Table>
