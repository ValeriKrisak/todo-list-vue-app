<template>
    <div @click="$emit('click')"
        class="bg-gray-200 dark:bg-slate-800 shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow">
        <h2 class="text-xl font-semibold mb-2">{{ todoList.listName }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ todoList.listDesc }}</p>
        <div class="mt-6 grid grid-cols-2 gap-4">
            <p class="text-gray-600 dark:text-gray-400">{{ todoList.user }}</p>
            <p class="text-gray-600 dark:text-gray-400">{{ todoList.createdAt }}</p>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { TodoList } from '../types';


defineProps<{
    todoList: TodoList;
}>();

</script>
