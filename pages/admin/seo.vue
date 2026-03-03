<template>
  <div>
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">SEO Yönetimi</h1>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6">
      <button
        @click="activeTab = 'global'"
        class="px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
        :class="activeTab === 'global' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'"
      >
        Global SEO
      </button>
      <button
        @click="activeTab = 'pages'"
        class="px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
        :class="activeTab === 'pages' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'"
      >
        Sayfa Bazlı SEO
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
      <!-- Global SEO -->
      <div v-if="activeTab === 'global'" class="space-y-4">
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Title Template</label>
          <input v-model="form.global.titleTemplate" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          <p class="text-xs text-slate-400 mt-1">%s yerine sayfa başlığı gelir</p>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Varsayılan Başlık</label>
          <input v-model="form.global.defaultTitle" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Varsayılan Açıklama</label>
          <textarea v-model="form.global.description" rows="2" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Anahtar Kelimeler</label>
          <input v-model="form.global.keywords" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">OG Image</label>
            <input v-model="form.global.ogImage" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">OG URL</label>
            <input v-model="form.global.ogUrl" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">OG Site Name</label>
            <input v-model="form.global.ogSiteName" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Twitter Card</label>
            <select v-model="form.global.twitterCard" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              <option value="summary">summary</option>
              <option value="summary_large_image">summary_large_image</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Robots</label>
            <input v-model="form.global.robots" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
        </div>
      </div>

      <!-- Sayfa Bazlı SEO -->
      <div v-if="activeTab === 'pages'" class="space-y-4">
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Sayfa Seç</label>
          <select v-model="selectedPage" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
            <option v-for="page in pageOptions" :key="page" :value="page">{{ page }}</option>
          </select>
        </div>

        <div v-if="selectedPage" class="space-y-4 mt-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Başlık</label>
            <input v-model="currentPageSeo.title" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Açıklama</label>
            <textarea v-model="currentPageSeo.description" rows="3" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Anahtar Kelimeler</label>
            <input v-model="currentPageSeo.keywords" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
        </div>
      </div>

      <!-- Error & Save -->
      <div v-if="formError" class="mt-4 text-sm text-red-600 dark:text-red-400">{{ formError }}</div>
      <div class="flex justify-end mt-6">
        <button @click="handleSave" :disabled="saving" class="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-colors disabled:opacity-50">
          {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SeoConfig } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: seoData, refresh } = await useAsyncData('admin-seo', () => $fetch<SeoConfig>('/api/admin/seo'))

const activeTab = ref('global')
const saving = ref(false)
const formError = ref<string | null>(null)
const selectedPage = ref('/')

const form = ref<SeoConfig>(JSON.parse(JSON.stringify(seoData.value ?? { global: {}, pages: {} })))

watch(seoData, (val) => {
  if (val) form.value = JSON.parse(JSON.stringify(val))
}, { immediate: true })

const pageOptions = computed(() => Object.keys(form.value.pages))

const currentPageSeo = computed(() => {
  if (!form.value.pages[selectedPage.value]) {
    form.value.pages[selectedPage.value] = { title: '', description: '', keywords: '' }
  }
  return form.value.pages[selectedPage.value]
})

async function handleSave() {
  saving.value = true
  formError.value = null
  try {
    await $fetch('/api/admin/seo', { method: 'PUT', body: form.value })
    await refresh()
    refreshNuxtData('seo')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata oluştu'
  } finally {
    saving.value = false
  }
}
</script>
