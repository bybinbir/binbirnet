<template>
  <div class="relative text-center group">
    <div
      class="w-24 h-24 rounded-3xl flex items-center justify-center font-extrabold text-3xl mb-8 mx-auto shadow-xl transition-transform"
      :class="[bgColors[bgColor], rotations[rotateDirection]]"
    >
      <span class="material-symbols-outlined text-4xl">{{ icon }}</span>
    </div>
    <h4 class="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
      {{ title }}
    </h4>
    <p class="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mx-auto text-lg">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface StepCardProps {
  icon: string;
  title: string;
  description: string;
  bgColor?: "blue" | "orange" | "green";
  rotateDirection?: "left" | "right";
}

const props = withDefaults(defineProps<StepCardProps>(), {
  bgColor: "blue",
  rotateDirection: "right"
});

const bgColors = {
  blue: "bg-pastel-blue dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  orange: "bg-pastel-orange dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  green: "bg-pastel-green dark:bg-green-900/30 text-green-600 dark:text-green-400",
};

const rotations = {
  left: "group-hover:-rotate-6",
  right: "group-hover:rotate-6",
};
</script>
