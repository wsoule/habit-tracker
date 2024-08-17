export type TodoItem = {
  complete: boolean;
  id?: string;
  description: string;
  due: string;
  category: 'task' | 'habit';
};
