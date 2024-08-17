import type { DaysOfWeek } from '$lib/db/schema/habbit.table';
import type { HabitInfluence } from './zod/habit.schema';

export type Habit = {
  id?: string;
  title: string;
  daysOfWeek: DaysOfWeek[];
  influence: HabitInfluence;
};
