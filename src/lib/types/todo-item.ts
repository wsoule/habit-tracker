export type Todo = {
  id: string;
  title: string;
  isComplete: boolean;
  category: TodoCategory;
  dueDate: string | Date;
};

export type TodoCategory = 'habit' | 'task';
