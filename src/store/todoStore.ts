import { defineStore } from "pinia";
import api from "./api";
import { TodoList } from "../types";

const LOCAL_STORAGE_KEY = "todoLists";

export const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todoLists: [] as TodoList[],
    changedTasks: new Map<string, string>(),
  }),

  actions: {
    async fetchTodoLists() {
      try {
        const response = await api.get("/todolists");
        this.todoLists = response.data;
      } catch (error) {
        console.error("Failed to fetch todo lists:", error);
      }
    },

    async fetchTasksForList(todolistId: string) {
      try {
        const response = await api.get(`/todolists/${todolistId}/tasks`);
        const tasks = response.data;
        const list = this.todoLists.find((list) => list.id === todolistId);
        if (list) {
          list.tasks = tasks;
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    },

    async addTask(todolistId: string, text: string) {
      try {
        const response = await api.post(`/todolists/${todolistId}/tasks`, {
          id: String(Date.now()),
          text,
          desc: "",
          editing: false,
          taskStatus: "new",
          priority: "Low",
          dueDate: Date.now(),
          todolistId,
        });
        const newTask = response.data;
        const list = this.todoLists.find((list) => list.id === todolistId);

        if (list) {
          list.tasks.push(newTask);
        }
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    },

    toggleTask(todolistId: string, taskId: string) {
      const list = this.todoLists.find((list) => list.id === todolistId);
      if (list) {
        const task = list.tasks.find((task) => task.id === taskId);
        if (task) {
          task.taskStatus = task.taskStatus === "done" ? "failed" : "done";
          this.changedTasks.set(taskId, task.taskStatus);
        }
      }
    },

    async deleteTask(todolistId: string, taskId: string) {
      try {
        await api.delete(`/todolists/${todolistId}/tasks/${taskId}`);

        const list = this.todoLists.find((list) => list.id === todolistId);
        if (list) {
          list.tasks = list.tasks.filter((task) => task.id !== taskId);
          this.changedTasks.delete(taskId);
        }
      } catch (error) {
        console.error("Failed to remove task:", error);
      }
    },

    async saveChangesToServer() {
      for (const [taskId, newStatus] of this.changedTasks.entries()) {
        try {
          await api.put(`/tasks/${taskId}`, { taskStatus: newStatus });
        } catch (error) {
          console.error(
            `Failed to update task status for task ${taskId}:`,
            error
          );
        }
      }
      this.changedTasks.clear();
    },

    saveToLocalStorage() {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.todoLists));
    },

    loadFromLocalStorage() {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        this.todoLists = JSON.parse(data);
      }
    },
  },
});
