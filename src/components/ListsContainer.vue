<template>
    <div class="container m-6">
        <template v-if="selectedList">
            <div class=" dark:text-white text-slate-600">
                <button @click="deselectList" class="mb-4 text-cyan-500 hover:text-cyan-800">
                    <font-awesome-icon icon="backward" /> Back to All Lists
                </button>
                <h1 class="text-2xl font-bold mb-4">{{ selectedList.listName }}</h1>
                <p class="mb-4">{{ selectedList.listDesc }}</p>
                <div class="mb-4 grid grid-cols-7">
                    <input v-model="newTaskText" placeholder="Enter new task"
                        class="w-full border rounded col-span-6 px-4 py-2" />
                    <button @click="addTask" class="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700">
                        <font-awesome-icon icon="plus" />
                    </button>
                </div>
                <p v-if="errors.text" class="text-red-500 text-sm">{{ errors.text }}</p>
                <ul>
                    <Task v-for="task in selectedList.tasks" :key="task.id" :task="task" @toggle="toggleTask"
                        @delete="deleteTask" />
                </ul>
            </div>
        </template>

        <template v-else>
            <h1 class="text-3xl font-bold mb-6  dark:text-white text-slate-600">All Todo Lists</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ListDetail v-for="list in todoLists" :key="list.id" :todoList="list" @click="selectList(list.id)" />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useTodoStore } from '../store/todoStore';
import ListDetail from './ListDetail.vue';
import Task from './Task.vue';
import { TodoList } from '../types';
import { validateTaskInput, ValidationResult } from '../utils/validation';

const store = useTodoStore();
const selectedList = ref<TodoList | null>(null);
const newTaskText = ref('');
const errors = ref<ValidationResult['errors']>({});

const todoLists = computed(() => store.todoLists);

onMounted(() => {
    store.loadFromLocalStorage();
    store.fetchTodoLists();
    window.addEventListener('beforeunload', handleBeforeUnload);
});

onUnmounted(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
});

const selectList = async (listId: string) => {
    await store.fetchTasksForList(listId);
    selectedList.value = store.todoLists.find(list => list.id === listId) || null;
};

const deselectList = () => {
    store.saveChangesToServer();
    selectedList.value = null;
};

const addTask = () => {
    if (selectedList.value) {
        const { isValid, errors: validationErrors } = validateTaskInput({
            text: newTaskText.value
        });

        if (isValid) {
            store.addTask(selectedList.value.id, newTaskText.value);
            newTaskText.value = '';
            errors.value = {};
        } else {
            errors.value = validationErrors;
        }
    }
};

const toggleTask = (todolistId: string, taskId: string) => {
    store.toggleTask(todolistId, taskId);
};


const deleteTask = (todolistId: string, taskId: string) => {
    store.deleteTask(todolistId, taskId);
};

const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
    event.preventDefault();
    await store.saveChangesToServer();
};
</script>
