<template>
  <div>
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Dashboard</h1>

    <!-- İçerik Yönetimi -->
    <h2 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">İçerik Yönetimi</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Paketler -->
      <NuxtLink
        to="/admin/paketler"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-pastel-blue dark:bg-blue-900/30 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl text-secondary">local_offer</span>
          </div>
          <div>
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">Paketler</div>
            <div class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ packages?.length ?? 0 }}</div>
          </div>
        </div>
        <div class="text-sm text-primary font-semibold group-hover:underline">Yönet &rarr;</div>
      </NuxtLink>

      <!-- Slider -->
      <NuxtLink
        to="/admin/slider"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-pastel-green dark:bg-green-900/30 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl text-primary">slideshow</span>
          </div>
          <div>
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">Slider</div>
            <div class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ slides?.length ?? 0 }}</div>
          </div>
        </div>
        <div class="text-sm text-primary font-semibold group-hover:underline">Yönet &rarr;</div>
      </NuxtLink>

      <!-- Kampanyalar -->
      <NuxtLink
        to="/admin/kampanyalar"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-pastel-orange dark:bg-orange-900/30 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl text-orange-500">campaign</span>
          </div>
          <div>
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">Kampanyalar</div>
            <div class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ campaigns?.length ?? 0 }}</div>
          </div>
        </div>
        <div class="text-sm text-primary font-semibold group-hover:underline">Yönet &rarr;</div>
      </NuxtLink>
    </div>

    <!-- Site Ayarları -->
    <h2 class="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Site Ayarları</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- SEO -->
      <NuxtLink
        to="/admin/seo"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl text-purple-500">search</span>
          </div>
          <div>
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">SEO Sayfaları</div>
            <div class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ seoPageCount }}</div>
          </div>
        </div>
        <div class="text-sm text-primary font-semibold group-hover:underline">Yönet &rarr;</div>
      </NuxtLink>

      <!-- İzleme -->
      <NuxtLink
        to="/admin/izleme"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl text-cyan-600">analytics</span>
          </div>
          <div>
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">Aktif İzleme</div>
            <div class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ activeTrackingCount }}</div>
          </div>
        </div>
        <div class="text-sm text-primary font-semibold group-hover:underline">Yönet &rarr;</div>
      </NuxtLink>

      <!-- Site Ayarları -->
      <NuxtLink
        to="/admin/ayarlar"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow group"
      >
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <span class="material-symbols-outlined text-2xl text-slate-600 dark:text-slate-300">settings</span>
          </div>
          <div>
            <div class="text-sm font-semibold text-slate-500 dark:text-slate-400">Site Ayarları</div>
            <div class="text-lg font-extrabold text-slate-900 dark:text-white">Düzenle</div>
          </div>
        </div>
        <div class="text-sm text-primary font-semibold group-hover:underline">Yönet &rarr;</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SeoConfig, TrackingScript } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: packages } = await useAsyncData('admin-packages', () => $fetch('/api/admin/packages'))
const { data: slides } = await useAsyncData('admin-slides', () => $fetch('/api/admin/slides'))
const { data: campaigns } = await useAsyncData('admin-campaigns', () => $fetch('/api/admin/campaigns'))
const { data: seoData } = await useAsyncData('admin-seo-dash', () => $fetch<SeoConfig>('/api/admin/seo'))
const { data: trackingData } = await useAsyncData('admin-tracking-dash', () => $fetch<{ scripts: TrackingScript[] }>('/api/admin/tracking'))

const seoPageCount = computed(() => Object.keys(seoData.value?.pages ?? {}).length)
const activeTrackingCount = computed(() => (trackingData.value?.scripts ?? []).filter(s => s.enabled).length)
</script>
