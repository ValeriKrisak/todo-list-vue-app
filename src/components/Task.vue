<template>
    <li class="flex items-center justify-between mb-2">
        <label class="flex items-center space-x-2">
            <input type="checkbox" :checked="task.taskStatus === 'done'" @change="toggleTask" class="form-checkbox" />
            <span :class="{ 'line-through': task.taskStatus === 'done' }">
                {{ task.text }}
            </span>
        </label>
        <button @click="deleteTask" class="bg-rose-800 text-white px-4 py-1 rounded hover:bg-rose-950">
            <font-awesome-icon icon="trash-alt" />
        </button>
    </li>
</template>

<script lang="ts" setup>
import { Task } from '../types';

const props = defineProps<{
    task: Task;
}>();

const emit = defineEmits<{
    (e: 'toggle', todolistId: string, taskId: string): void;
    (e: 'delete', todolistId: string, taskId: string): void;
}>();

const toggleTask = () => {
    emit('toggle', props.task.todolistId, props.task.id);
};

const deleteTask = () => {
    emit('delete', props.task.todolistId, props.task.id);
};
</script>
