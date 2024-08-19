<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    AccordionContent,
    AccordionTrigger
  } from '$lib/components/ui/accordion';
  import { Badge, type Variant } from '$lib/components/ui/badge';
    import { Button } from '$lib/components/ui/button';
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
  import { binaryToDaysArray, daysOfWeekArray } from '$lib/types/zod/habit.schema';
    import { Ellipsis, Pencil } from 'lucide-svelte';
  import type { PageData } from './$types';
  import AddScorecardHabit from './add-scorecard-habit.svelte';

  export let data: PageData;

  let habitStore = createHabitStore(
    data.habits.map((habit) => {
      return {
        id: habit.id,
        title: habit.title,
        influence: habit.influence,
        frequency: binaryToDaysArray(habit.frequency)
      };
    })
  );

  const weekdays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const weekends: DayOfWeek[] = ['saturday', 'sunday'];

  // Utility function to format the frequency nicely
  const formatFrequency = (frequency: DayOfWeek[]): string => {
    if (frequency.length === daysOfWeekArray.length) return 'All days';
    if (frequency.length === 2 && frequency.every((day) => weekends.includes(day)))
      return 'Weekends';
    if (frequency.length === 5 && weekdays.every((day) => frequency.includes(day)))
      return 'Weekdays';
    return frequency.map((day) => day.substring(0, 2)).join(', ');
  };

  // Utility function to determine the influence color
  const getInfluenceClass = (influence: string): Variant => {
    switch (influence) {
      case 'good':
        return 'success';
      case 'bad':
        return 'destructive';
      case 'neutral':
      default:
        return 'secondary';
    }
  };
</script>

<Accordion>
  <AccordionItem value={'create-new-habit'}>
    <AccordionTrigger>Create New Habit</AccordionTrigger>
    <AccordionContent>
      <AddScorecardHabit {habitStore} data={data.addScorecardForm} />
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Table class="mt-4 w-full overflow-hidden rounded-xl border">
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
        <TableCell class="p-2 text-left capitalize">{formatFrequency(habit.frequency)}</TableCell>
        <TableCell class="p-2 text-center capitalize {getInfluenceClass(habit.influence)}">
          <Badge variant={getInfluenceClass(habit.influence)}>{habit.influence}</Badge>
        </TableCell>
        <TableCell class="p-2 text-right">
          <Button
            variant="ghost"
            size="icon"
            class="px-3 py-1"
          >
            <Ellipsis />
          </Button>
        </TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
