import type { Habit } from '$lib/types/habit';
import type { HabitInfluence } from '$lib/types/zod/habit.schema';
import { writable } from 'svelte/store';

export function createHabitStore(initial: Habit[]) {
  const { subscribe, update } = writable(initial);

  return {
    subscribe,
    add: ({ id, title, influence, frequency }: Habit) => {
      const habit = {
        id,
        influence,
        title,
        frequency
      };

      update(($habits) => [...$habits, habit]);
    },
    remove: (habit: Habit) => {
      update(($habits) => $habits.filter((t) => t !== habit));
    },
    mark: (habit: Habit, influence: HabitInfluence) => {
      update(($habits) => [
        ...$habits.filter((h) => h !== habit),
        {
          ...habit,
          influence
        }
      ]);
    }
  };
}
