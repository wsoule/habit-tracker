import type { DayOfWeek, HabitInfluence } from './zod/habit.schema';

export type Habit = {
  id?: string;
  title: string;
  frequency: DayOfWeek[];
  influence: HabitInfluence;
};
