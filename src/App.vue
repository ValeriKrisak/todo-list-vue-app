<script lang="ts" setup>
import ListsContainer from './components/ListsContainer.vue'
import { isDarkMode, toggleDarkMode, initializeTheme } from './utils/theme';

initializeTheme();
</script>

<template>
  <div id="app" class="w-full min-h-screen dark:bg-gray-700 bg-gray-100">
    <div class="flex justify-end">
      <button @click="toggleDarkMode"
        class="dark:bg-gray-800 bg-gray-200 text-gray-800 dark:text-gray-200 px-4 py-2 rounded">
        <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
      </button>
    </div>
    <div class="w-full flex items-center justify-center">
      <ListsContainer class="mb-12" />
    </div>
  </div>
</template>
