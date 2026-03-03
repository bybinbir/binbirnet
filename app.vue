<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import '~/assets/css/main.css'
import type { SeoConfig } from '~/types'

// Global SEO from API
const { data: seoConfig } = await useAsyncData('seo-global', () => $fetch<SeoConfig>('/api/seo'))

useHead({
  titleTemplate: seoConfig.value?.global.titleTemplate || '%s | BinbirNet',
  title: seoConfig.value?.global.defaultTitle || "BinbirNet | Anamur ve Bozyazı'nın En Hızlı İnterneti",
  link: [
    { rel: 'canonical', href: seoConfig.value?.global.ogUrl || 'https://binbirnet.com.tr' },
  ],
})

useSeoMeta({
  description: seoConfig.value?.global.description,
  keywords: seoConfig.value?.global.keywords,
  robots: seoConfig.value?.global.robots,
  ogTitle: seoConfig.value?.global.defaultTitle,
  ogDescription: seoConfig.value?.global.description,
  ogUrl: seoConfig.value?.global.ogUrl,
  ogSiteName: seoConfig.value?.global.ogSiteName,
  ogImage: seoConfig.value?.global.ogImage,
  twitterCard: seoConfig.value?.global.twitterCard as any,
  twitterTitle: seoConfig.value?.global.defaultTitle,
  twitterDescription: seoConfig.value?.global.description,
})
</script>
