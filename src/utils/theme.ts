import { ref, onMounted } from "vue";

export const isDarkMode = ref<boolean>(false);

export function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  updateDarkModeClass(isDarkMode.value);
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
}

export function updateDarkModeClass(isDark: boolean) {
  const htmlElement = document.documentElement;
  if (isDark) {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }
}

export function initializeTheme() {
  onMounted(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      isDarkMode.value = true;
    } else {
      isDarkMode.value = false;
    }
    updateDarkModeClass(isDarkMode.value);
  });
}
