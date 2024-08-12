import { Task } from "./Task";

export interface TodoList {
  id: string;
  listName: string;
  listDesc: string;
  user: string;
  createdAt: string;
  tasks: Task[];
}
