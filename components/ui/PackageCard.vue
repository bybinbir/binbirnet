<template>
  <div
    class="package-card bg-white dark:bg-slate-800 rounded-4xl p-8 border-2 shadow-xl flex flex-col cursor-pointer relative overflow-hidden transition-all hover:scale-105"
    :class="isPopular ? 'border-primary scale-105 z-10 shadow-2xl' : 'border-orange-50 dark:border-slate-700'"
  >
    <!-- Badge -->
    <div v-if="pkg.badge" class="absolute top-4 right-6 bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
      En Sevilen
    </div>

    <!-- Featured badge -->
    <div v-if="featured && !pkg.badge" class="absolute top-4 right-4 bg-primary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
      <span class="material-symbols-outlined text-xs">recommend</span>
      Önerilen
    </div>

    <!-- Decorative blob -->
    <div v-if="!isPopular" class="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full opacity-50" />

    <!-- Icon -->
    <div
      class="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
      :class="isPopular || isWireless ? 'bg-pastel-orange dark:bg-orange-900/30 text-primary' : 'bg-pastel-blue dark:bg-blue-900/30 text-secondary'"
    >
      <span class="material-symbols-outlined text-3xl">
        {{ isWireless ? "wifi" : "router" }}
      </span>
    </div>

    <!-- Type badge -->
    <div v-if="showTypeBadge" class="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 w-fit mb-4 text-slate-600 dark:text-slate-300">
      {{ isWireless ? "Kablosuz" : "Fiber" }}
    </div>

    <!-- Title & Description -->
    <h3 class="text-2xl font-bold mb-1 text-slate-900 dark:text-white">
      <NuxtLink
        v-if="detailHref"
        :to="detailHref"
        class="group/title inline-flex items-center gap-1 hover:text-primary transition-colors"
      >
        {{ pkg.name }}
        <span class="material-symbols-outlined text-lg text-primary opacity-0 group-hover/title:opacity-100 transition-opacity">
          arrow_forward
        </span>
      </NuxtLink>
      <template v-else>{{ pkg.name }}</template>
    </h3>
    <p class="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
      {{ isWireless ? "Altyapısız internet özgürlüğü." : "Yüksek hızlı fiber keyfi." }}
    </p>

    <!-- Price -->
    <div class="mb-6">
      <div v-if="pkg.oldPriceTry" class="text-slate-400 text-lg line-through decoration-red-500/50 decoration-2 font-semibold">
        {{ pkg.oldPriceTry }},00<span class="text-sm">₺</span>
      </div>
      <div class="flex items-baseline gap-1">
        <span class="text-4xl font-extrabold text-primary">
          {{ pkg.priceTry }}
        </span>
        <span class="text-xl font-bold text-primary">,00₺</span>
        <span class="text-sm text-slate-400 ml-1">/ay</span>
      </div>
    </div>

    <!-- Features -->
    <div class="space-y-4 mb-10">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined" :class="isPopular ? 'text-primary' : 'text-secondary'">
          check_circle
        </span>
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
          {{ pkg.downMbps }} Mbps İndirme
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined" :class="isPopular ? 'text-primary' : 'text-secondary'">
          upload
        </span>
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
          {{ pkg.upMbps }} Mbps Yükleme
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined" :class="isPopular ? 'text-primary' : 'text-secondary'">
          verified_user
        </span>
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
          Taahhütsüz
        </span>
      </div>
      <div v-if="isWireless && showTypeBadge" class="flex items-center gap-3">
        <span class="material-symbols-outlined text-green-500">
          bolt
        </span>
        <span class="text-sm font-medium text-green-600 dark:text-green-400">
          Hemen Kurulum
        </span>
      </div>
    </div>

    <!-- CTA Button -->
    <NuxtLink
      :to="`/basvuru?paket=${pkg.id}`"
      class="cta-button mt-auto w-full py-4 rounded-2xl font-bold transition-all shadow-md text-center"
      :class="isPopular ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'"
    >
      {{ isPopular ? "Hemen Başvur" : "Seç ve Başla" }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Package } from '@/types';
import { tarifeHref } from '~/utils/tarifeSlug';

const props = withDefaults(defineProps<{
  pkg: Package;
  featured?: boolean;
  showTypeBadge?: boolean;
}>(), {
  featured: false,
  showTypeBadge: false
});

const isPopular = computed(() => props.pkg.badge === "POPULAR" || props.featured);
const isWireless = computed(() => props.pkg.type === "WIRELESS");
const detailHref = computed(() => tarifeHref(props.pkg));
</script>
