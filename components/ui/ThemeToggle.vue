<template>
  <button
    v-if="mounted"
    @click="toggleTheme"
    class="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
    :class="theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-orange-100 hover:bg-orange-200'"
    :aria-label="theme === 'dark' ? 'Aydınlık moda geç' : 'Karanlık moda geç'"
    :aria-pressed="theme === 'dark'"
  >
    <span v-if="theme === 'dark'" class="material-symbols-outlined text-yellow-400">dark_mode</span>
    <span v-else class="material-symbols-outlined text-orange-600">sunny</span>
  </button>
</template>

<script setup lang="ts">
type Theme = "light" | "dark";

const theme = ref<Theme>("light");
const mounted = ref(false);

const applyTheme = (newTheme: Theme) => {
  if (import.meta.client) {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

const toggleTheme = () => {
  const newTheme: Theme = theme.value === "dark" ? "light" : "dark";
  theme.value = newTheme;
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
};

onMounted(() => {
  mounted.value = true;
  const stored = localStorage.getItem("theme") as Theme | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme: Theme = stored || (prefersDark ? "dark" : "light");
  
  theme.value = initialTheme;
  applyTheme(initialTheme);
});
</script>
