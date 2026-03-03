<template>
  <div class="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xl border border-orange-50 dark:border-slate-700 flex flex-col items-center text-center gap-3 hover:translate-y-[-8px] transition-transform cursor-pointer group">
    <div
      class="p-4 rounded-2xl group-hover:scale-110 transition-transform"
      :class="[bgColors[bgColor], iconColors[iconColor]]"
    >
      <span class="material-symbols-outlined text-3xl">{{ icon }}</span>
    </div>
    <div>
      <h4 class="font-bold text-slate-900 dark:text-white">{{ title }}</h4>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  bgColor?: 'blue' | 'green' | 'orange' | 'purple';
  iconColor?: 'primary' | 'secondary';
}

const props = withDefaults(defineProps<FeatureCardProps>(), {
  bgColor: 'blue',
  iconColor: 'secondary'
});

const bgColors = {
  blue: "bg-pastel-blue dark:bg-slate-700",
  green: "bg-pastel-green dark:bg-slate-700",
  orange: "bg-pastel-orange dark:bg-slate-700",
  purple: "bg-pastel-purple dark:bg-slate-700",
};

const iconColors = {
  primary: "text-primary",
  secondary: "text-secondary",
};
</script>
