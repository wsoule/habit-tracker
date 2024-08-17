import type { DaysOfWeek } from '$lib/db/schema/habbit.table';
import type { HabitInfluence } from '../../routes/(private)/todo/schema';

export type Habit = {
  id?: string;
  title: string;
  daysOfWeek: DaysOfWeek[];
  influence: HabitInfluence;
};
