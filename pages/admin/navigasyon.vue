<template>
  <div>
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Navigasyon Yonetimi</h1>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6">
      <button
        @click="activeTab = 'header'"
        class="px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
        :class="activeTab === 'header' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'"
      >
        Header Navigasyon
      </button>
      <button
        @click="activeTab = 'footer'"
        class="px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
        :class="activeTab === 'footer' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'"
      >
        Footer Hizli Erisim
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
      <!-- Header Nav -->
      <div v-if="activeTab === 'header'">
        <div class="flex items-center justify-between mb-4">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Menu Ogeleri</label>
          <button @click="addHeaderItem" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
        </div>
        <div class="space-y-3">
          <div v-for="(item, i) in form.header" :key="item.id" class="flex gap-2 items-center bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3">
            <input v-model.number="item.order" type="number" class="w-16 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm text-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="item.icon" placeholder="Icon" class="w-28 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="item.label" placeholder="Label" class="w-32 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="item.href" placeholder="/sayfa" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <label class="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
              <input type="checkbox" v-model="item.external" /> Dis
            </label>
            <button @click="form.header.splice(i, 1)" class="text-red-500 hover:text-red-700">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Quick Links -->
      <div v-if="activeTab === 'footer'">
        <div class="flex items-center justify-between mb-4">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Hizli Erisim Linkleri</label>
          <button @click="addFooterItem" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
        </div>
        <div class="space-y-3">
          <div v-for="(item, i) in form.footerQuickLinks" :key="item.id" class="flex gap-2 items-center bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3">
            <input v-model.number="item.order" type="number" class="w-16 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm text-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="item.label" placeholder="Label" class="w-40 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="item.href" placeholder="/sayfa veya https://..." class="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <label class="flex items-center gap-1 text-xs text-slate-500 whitespace-nowrap">
              <input type="checkbox" v-model="item.external" /> Dis
            </label>
            <button @click="form.footerQuickLinks.splice(i, 1)" class="text-red-500 hover:text-red-700">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
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
import type { NavigationConfig } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: navData, refresh } = await useAsyncData('admin-navigation', () => $fetch<NavigationConfig>('/api/admin/navigation'))

const activeTab = ref('header')
const saving = ref(false)
const formError = ref<string | null>(null)

const form = ref<NavigationConfig>(JSON.parse(JSON.stringify(navData.value ?? { header: [], footerQuickLinks: [] })))

watch(navData, (val) => {
  if (val) form.value = JSON.parse(JSON.stringify(val))
}, { immediate: true })

function addHeaderItem() {
  form.value.header.push({
    id: `nav-${Date.now()}`,
    label: '',
    href: '/',
    icon: 'link',
    external: false,
    order: form.value.header.length,
  })
}

function addFooterItem() {
  form.value.footerQuickLinks.push({
    id: `footer-${Date.now()}`,
    label: '',
    href: '/',
    external: false,
    order: form.value.footerQuickLinks.length,
  })
}

async function handleSave() {
  saving.value = true
  formError.value = null
  try {
    await $fetch('/api/admin/navigation', { method: 'PUT', body: form.value })
    await refresh()
    refreshNuxtData('navigation')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata olustu'
  } finally {
    saving.value = false
  }
}
</script>
