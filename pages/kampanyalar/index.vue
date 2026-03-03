<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Kampanyalar</h1>
    <ul class="mt-4 list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-2">
      <li v-for="c in campaigns" :key="c.id">{{ c.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { data: campaigns } = await useCampaigns()

useSeoMeta({
  title: "Kampanyalar",
  description: "En güncel BinbirNet kampanyaları. Fırsatları kaçırmayın.",
});
</script>
