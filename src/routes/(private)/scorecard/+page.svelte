<script lang="ts">
  import type { PageData } from './$types';
  import AddScorecardHabit from './add-scorecard-habit.svelte';

  export let data: PageData;
</script>

<AddScorecardHabit data={data.addScorecardForm} />
