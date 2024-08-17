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
  import type { PageData } from './$types';
  import AddScorecardHabit from './add-scorecard-habit.svelte';

  export let data: PageData;
</script>

<AddScorecardHabit data={data.addScorecardForm} />
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead class="w-[100px]">Habit</TableHead>
      <TableHead>Days</TableHead>
      <TableHead>Influence</TableHead>
      <TableHead class="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell class="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell class="text-right">$25000</TableCell>
    </TableRow>
  </TableBody>
</Table>
