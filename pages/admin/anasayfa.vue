<template>
  <div>
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Anasayfa İçerik Yönetimi</h1>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6 flex-wrap">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
        :class="activeTab === tab.id ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
      <!-- Feature Kartları -->
      <div v-if="activeTab === 'features'">
        <div class="flex items-center justify-between mb-4">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Özellik Kartları</label>
          <button @click="addFeature" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
        </div>
        <div class="space-y-4">
          <div v-for="(f, i) in form.features" :key="f.id" class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Kart {{ i + 1 }}</span>
              <div class="flex items-center gap-2">
                <input v-model.number="f.order" type="number" class="w-16 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-sm text-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                <button @click="form.features.splice(i, 1)" class="text-red-500 hover:text-red-700">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <input v-model="f.icon" placeholder="İkon adı" class="border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              <input v-model="f.title" placeholder="Başlık" class="border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              <input v-model="f.description" placeholder="Açıklama" class="border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              <div class="flex gap-2">
                <select v-model="f.bgColor" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  <option value="blue">Mavi</option>
                  <option value="green">Yeşil</option>
                  <option value="orange">Turuncu</option>
                  <option value="purple">Mor</option>
                </select>
                <select v-model="f.iconColor" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Adım Kartları -->
      <div v-if="activeTab === 'steps'">
        <div class="flex items-center justify-between mb-4">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Adım Kartları</label>
          <button @click="addStep" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
        </div>
        <div class="space-y-4">
          <div v-for="(s, i) in form.steps" :key="s.id" class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Adım {{ i + 1 }}</span>
              <div class="flex items-center gap-2">
                <input v-model.number="s.order" type="number" class="w-16 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-sm text-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
                <button @click="form.steps.splice(i, 1)" class="text-red-500 hover:text-red-700">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <input v-model="s.icon" placeholder="İkon adı" class="border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
              <input v-model="s.title" placeholder="Başlık" class="border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
            <textarea v-model="s.description" placeholder="Açıklama" rows="2" class="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
            <div class="flex gap-3">
              <select v-model="s.bgColor" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                <option value="blue">Mavi</option>
                <option value="green">Yeşil</option>
                <option value="orange">Turuncu</option>
              </select>
              <select v-model="s.rotateDirection" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                <option value="right">Sağ</option>
                <option value="left">Sol</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Bölüm Başlıkları -->
      <div v-if="activeTab === 'sections'" class="space-y-6">
        <div>
          <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Paketler Bölümü</h3>
          <div class="space-y-3">
            <div>
              <label class="text-sm text-slate-500">Başlık</label>
              <input v-model="form.packagesSection.title" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label class="text-sm text-slate-500">Alt Başlık</label>
              <input v-model="form.packagesSection.subtitle" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
          </div>
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Adımlar Bölümü</h3>
          <div>
            <label class="text-sm text-slate-500">Başlık</label>
            <input v-model="form.stepsSection.title" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
        </div>
      </div>

      <!-- CTA Bölümü -->
      <div v-if="activeTab === 'cta'" class="space-y-4">
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Başlık</label>
          <input v-model="form.cta.title" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Açıklama</label>
          <textarea v-model="form.cta.description" rows="2" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Buton Metni</label>
            <input v-model="form.cta.buttonText" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Buton Link</label>
            <input v-model="form.cta.buttonHref" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Buton Alt Metin</label>
          <input v-model="form.cta.buttonSubtext" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div>
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Özellik Listesi</label>
            <button @click="form.cta.features.push({ icon: '', text: '' })" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
          </div>
          <div v-for="(f, i) in form.cta.features" :key="i" class="flex gap-2 mb-2 items-center">
            <input v-model="f.icon" placeholder="İkon" class="w-32 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="f.text" placeholder="Metin" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <button @click="form.cta.features.splice(i, 1)" class="text-red-500 hover:text-red-700">
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
import type { HomepageContent } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: homepageData, refresh } = await useAsyncData('admin-homepage', () => $fetch<HomepageContent>('/api/admin/homepage'))

const tabs = [
  { id: 'features', label: 'Özellik Kartları' },
  { id: 'steps', label: 'Adım Kartları' },
  { id: 'sections', label: 'Bölüm Başlıkları' },
  { id: 'cta', label: 'CTA Bölümü' },
]

const activeTab = ref('features')
const saving = ref(false)
const formError = ref<string | null>(null)

const defaultForm = (): HomepageContent => ({
  features: [],
  steps: [],
  packagesSection: { title: '', subtitle: '' },
  stepsSection: { title: '' },
  cta: { title: '', description: '', buttonText: '', buttonHref: '', buttonSubtext: '', features: [] },
})

const form = ref<HomepageContent>(JSON.parse(JSON.stringify(homepageData.value ?? defaultForm())))

watch(homepageData, (val) => {
  if (val) form.value = JSON.parse(JSON.stringify(val))
}, { immediate: true })

function addFeature() {
  form.value.features.push({
    id: `f-${Date.now()}`,
    icon: '',
    title: '',
    description: '',
    bgColor: 'blue',
    iconColor: 'primary',
    order: form.value.features.length,
  })
}

function addStep() {
  form.value.steps.push({
    id: `s-${Date.now()}`,
    icon: '',
    title: '',
    description: '',
    bgColor: 'blue',
    rotateDirection: 'right',
    order: form.value.steps.length,
  })
}

async function handleSave() {
  saving.value = true
  formError.value = null
  try {
    await $fetch('/api/admin/homepage', { method: 'PUT', body: form.value })
    await refresh()
    refreshNuxtData('homepage')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata oluştu'
  } finally {
    saving.value = false
  }
}
</script>
