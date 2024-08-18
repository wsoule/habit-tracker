export type TodoItem = {
  isComplete: boolean;
  id?: string;
  description: string;
  due: string;
  category: 'task' | 'habit';
};
