<template>
  <section class="max-w-7xl mx-auto px-4 mb-24">
    <div
      class="rounded-4xl p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl"
      :class="isPrimary ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800'"
    >
      <!-- Content -->
      <div
        class="relative z-10 text-center lg:text-left"
        :class="{ 'text-slate-900 dark:text-white': !isPrimary }"
      >
        <h3 class="text-3xl lg:text-5xl font-extrabold mb-6">{{ title }}</h3>
        <p
          v-if="description"
          class="text-lg max-w-lg mb-8"
          :class="isPrimary ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'"
        >
          {{ description }}
        </p>
        <div v-if="features && features.length > 0" class="flex flex-wrap justify-center lg:justify-start gap-8">
          <div v-for="(feature, index) in features" :key="index" class="flex items-center gap-3">
            <span class="material-symbols-outlined">{{ feature.icon }}</span>
            <span class="font-bold">{{ feature.text }}</span>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="relative z-10 shrink-0">
        <NuxtLink
          :to="buttonHref"
          class="px-12 py-6 rounded-3xl font-extrabold text-xl transition-all shadow-2xl hover:scale-105 active:scale-95 block"
          :class="isPrimary ? 'bg-white text-primary hover:bg-orange-50' : 'bg-primary text-white hover:bg-primary/90'"
        >
          {{ buttonText }}
        </NuxtLink>
        <p
          v-if="buttonSubtext"
          class="text-[10px] text-center mt-4 uppercase tracking-[0.2em] font-bold"
          :class="isPrimary ? 'text-white/70' : 'text-slate-500'"
        >
          {{ buttonSubtext }}
        </p>
      </div>

      <!-- Decorative blobs -->
      <div
        class="absolute -right-20 -bottom-20 w-80 h-80 rounded-full blur-3xl"
        :class="isPrimary ? 'bg-white/10' : 'bg-primary/10'"
      />
      <div
        class="absolute -left-10 -top-10 w-40 h-40 rounded-full blur-2xl"
        :class="isPrimary ? 'bg-secondary/20' : 'bg-secondary/10'"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
interface CTAFeature {
  icon: string;
  text: string;
}

interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  buttonSubtext?: string;
  features?: CTAFeature[];
  variant?: "primary" | "white";
}

const props = withDefaults(defineProps<CTASectionProps>(), {
  variant: "primary"
});

const isPrimary = computed(() => props.variant === "primary");
</script>
