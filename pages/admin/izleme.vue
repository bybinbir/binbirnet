<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">İzleme Kodları</h1>
      <button
        @click="addScript"
        class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
      >
        <span class="material-symbols-outlined">add</span>
        Yeni Script
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="(script, i) in form.scripts"
        :key="script.id"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="script.type === 'ga4' ? 'bg-blue-100 dark:bg-blue-900/30' : script.type === 'gtm' ? 'bg-green-100 dark:bg-green-900/30' : script.type === 'facebook_pixel' ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-slate-100 dark:bg-slate-700'"
            >
              <span class="material-symbols-outlined text-xl"
                :class="script.type === 'ga4' ? 'text-blue-600' : script.type === 'gtm' ? 'text-green-600' : script.type === 'facebook_pixel' ? 'text-indigo-600' : 'text-slate-600'"
              >
                {{ script.type === 'custom' ? 'code' : 'analytics' }}
              </span>
            </div>
            <div>
              <input v-model="script.name" class="font-bold text-slate-900 dark:text-white bg-transparent border-none p-0 text-lg focus:outline-none" />
              <div class="text-xs text-slate-400">{{ scriptTypeLabel(script.type) }}</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button
              @click="script.enabled = !script.enabled"
              class="text-xs font-bold px-3 py-1 rounded-full transition-colors"
              :class="script.enabled ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'"
            >
              {{ script.enabled ? 'Aktif' : 'Pasif' }}
            </button>
            <button @click="form.scripts.splice(i, 1)" class="text-slate-500 hover:text-red-600 transition-colors">
              <span class="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <div v-if="script.type !== 'custom'">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {{ script.type === 'ga4' ? 'GA4 Measurement ID (G-XXXXXXXXXX)' : script.type === 'gtm' ? 'GTM Container ID (GTM-XXXXXXX)' : 'Pixel ID' }}
            </label>
            <input v-model="script.trackingId" :placeholder="script.type === 'ga4' ? 'G-XXXXXXXXXX' : script.type === 'gtm' ? 'GTM-XXXXXXX' : '123456789'" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>

          <div v-if="script.type === 'custom'">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Head Kodu</label>
            <textarea v-model="script.headCode" rows="4" placeholder="<script>...</script>" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm"></textarea>
          </div>

          <div v-if="script.type === 'custom'">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Body Kodu</label>
            <textarea v-model="script.bodyCode" rows="4" placeholder="<noscript>...</noscript>" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm"></textarea>
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tür</label>
            <select v-model="script.type" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              <option value="ga4">Google Analytics 4</option>
              <option value="gtm">Google Tag Manager</option>
              <option value="facebook_pixel">Facebook Pixel</option>
              <option value="custom">Özel Script</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="formError" class="mt-4 text-sm text-red-600 dark:text-red-400">{{ formError }}</div>
    <div class="flex justify-end mt-6">
      <button @click="handleSave" :disabled="saving" class="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-colors disabled:opacity-50">
        {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TrackingScript } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: trackingData, refresh } = await useAsyncData('admin-tracking', () => $fetch<{ scripts: TrackingScript[] }>('/api/admin/tracking'))

const saving = ref(false)
const formError = ref<string | null>(null)

const form = ref<{ scripts: TrackingScript[] }>(JSON.parse(JSON.stringify(trackingData.value ?? { scripts: [] })))

watch(trackingData, (val) => {
  if (val) form.value = JSON.parse(JSON.stringify(val))
}, { immediate: true })

function scriptTypeLabel(type: string) {
  const map: Record<string, string> = { ga4: 'Google Analytics 4', gtm: 'Google Tag Manager', facebook_pixel: 'Facebook Pixel', custom: 'Özel Script' }
  return map[type] ?? type
}

function addScript() {
  form.value.scripts.push({
    id: `custom-${Date.now()}`,
    name: 'Yeni Script',
    type: 'custom',
    trackingId: '',
    headCode: '',
    bodyCode: '',
    enabled: false,
  })
}

async function handleSave() {
  saving.value = true
  formError.value = null
  try {
    await $fetch('/api/admin/tracking', { method: 'PUT', body: form.value })
    await refresh()
    refreshNuxtData('tracking')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata oluştu'
  } finally {
    saving.value = false
  }
}
</script>
