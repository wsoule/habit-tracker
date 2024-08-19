export type Todo = {
  id: string;
  title: string;
  isComplete: boolean;
  category: TodoCategory;
  dueDate: string;
};

export type TodoCategory = 'habit' | 'task';
