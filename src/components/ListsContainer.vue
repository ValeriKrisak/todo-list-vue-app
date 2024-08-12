<template>
    <div class="container m-6">
        <template v-if="selectedList">
            <div>
                <button @click="deselectList" class="mb-4 text-cyan-500 hover:text-cyan-800">
                    <font-awesome-icon icon="backward" /> Back to All Lists
                </button>
                <h1 class="text-2xl font-bold mb-4">{{ selectedList.listName }}</h1>
                <p class="mb-4">{{ selectedList.listDesc }}</p>
                <div class="mb-4 grid grid-cols-4">
                    <input v-model="newTaskText" placeholder="Enter new task"
                        class="w-full border rounded col-span-3 px-4 py-2" />
                    <button @click="addTask" class="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700">
                        <font-awesome-icon icon="plus" />
                    </button>
                </div>
                <ul>
                    <Task v-for="task in selectedList.tasks" :key="task.id" :task="task" @toggle="toggleTask"
                        @delete="deleteTask" />
                </ul>
            </div>
        </template>

        <template v-else>
            <h1 class="text-3xl font-bold mb-6">All Todo Lists</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ListDetail v-for="list in todoLists" :key="list.id" :todoList="list" @click="selectList(list.id)" />
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useTodoStore } from '../store/todoStore';
import ListDetail from './ListDetail.vue';
import Task from './Task.vue';
import { TodoList } from '../types';

const store = useTodoStore();
const selectedList = ref<TodoList | null>(null);
const newTaskText = ref('');

const todoLists = computed(() => store.todoLists);

onMounted(() => {
    store.fetchTodoLists();
});

const selectList = async (listId: string) => {
    await store.fetchTasksForList(listId);
    selectedList.value = store.todoLists.find(list => list.id === listId) || null;
};

const deselectList = () => {
    selectedList.value = null;
};

const addTask = () => {
    if (selectedList.value && newTaskText.value.trim() !== '') {
        store.addTask(selectedList.value.id, newTaskText.value);
        newTaskText.value = '';
    }
};

const toggleTask = (todolistId: string, taskId: string) => {
    store.toggleTask(todolistId, taskId);
};


const deleteTask = (todolistId: string, taskId: string) => {
    store.deleteTask(todolistId, taskId);
};
</script>
