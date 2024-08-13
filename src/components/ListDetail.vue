<template>
    <div @click="$emit('click')"
        class="bg-gray-200 text-slate-600 dark:text-white dark:bg-slate-800 shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition-shadow hover:bg-slate-300 dark:hover:bg-slate-500">
        <h2 class="text-xl font-semibold mb-2">{{ todoList.listName }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-200">{{ todoList.listDesc }}</p>
        <div class="mt-6 grid grid-cols-2 gap-4 text-gray-600 dark:text-gray-200">
            <p><font-awesome-icon icon="user" /> {{ todoList.user }}</p>
            <p><font-awesome-icon icon="calendar" /> {{
                createdDate(todoList.createdAt) }}
            </p>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { TodoList } from '../types';


defineProps<{
    todoList: TodoList;
}>();

function createdDate(date: string) {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    const formatDate = new Date(date);
    return formatDate.toLocaleString(undefined, options);

}

</script>
