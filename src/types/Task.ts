export interface Task {
  id: string;
  text: string;
  desc: string;
  editing: boolean;
  taskStatus: string;
  priority: string;
  dueDate: number;
  todolistId: string;
}
