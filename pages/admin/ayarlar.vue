<template>
  <div>
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Site Ayarları</h1>

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
      <!-- Şirket Bilgileri -->
      <div v-if="activeTab === 'company'" class="space-y-4">
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Şirket Adı</label>
          <input v-model="form.company.name" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tam Unvan</label>
          <input v-model="form.company.fullName" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Açıklama</label>
          <textarea v-model="form.company.description" rows="3" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">MERSIS</label>
            <input v-model="form.company.mersis" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Copyright Yılı</label>
            <input v-model="form.company.copyrightYear" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
        </div>
      </div>

      <!-- İletişim -->
      <div v-if="activeTab === 'contact'" class="space-y-6">
        <div>
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Telefon Numaraları</label>
            <button @click="addPhone" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
          </div>
          <div v-for="(phone, i) in form.contact.phones" :key="i" class="flex gap-2 mb-2 items-center">
            <input v-model="phone.label" placeholder="Etiket" class="w-32 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="phone.number" placeholder="Numara" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="phone.href" placeholder="tel:+90..." class="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <label class="flex items-center gap-1 text-xs text-slate-500">
              <input type="checkbox" v-model="phone.primary" @change="setPrimaryPhone(i)" />
              Ana
            </label>
            <button @click="form.contact.phones.splice(i, 1)" class="text-red-500 hover:text-red-700">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">E-Posta Adresleri</label>
            <button @click="addEmail" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
          </div>
          <div v-for="(email, i) in form.contact.emails" :key="i" class="flex gap-2 mb-2 items-center">
            <input v-model="email.label" placeholder="Etiket" class="w-32 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="email.address" placeholder="email@example.com" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <button @click="form.contact.emails.splice(i, 1)" class="text-red-500 hover:text-red-700">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>

        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">WhatsApp</label>
          <div class="grid grid-cols-2 gap-4 mt-1">
            <input v-model="form.contact.whatsapp.number" placeholder="905321561001" class="border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <input v-model="form.contact.whatsapp.message" placeholder="Merhaba!!" class="border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>
        </div>
      </div>

      <!-- Adres -->
      <div v-if="activeTab === 'address'" class="space-y-4">
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Başlık</label>
          <input v-model="form.address.title" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div>
          <div class="flex items-center justify-between mb-3">
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Adres Satırları</label>
            <button @click="form.address.lines.push('')" class="text-sm text-primary font-semibold hover:underline">+ Satır Ekle</button>
          </div>
          <div v-for="(_, i) in form.address.lines" :key="i" class="flex gap-2 mb-2">
            <input v-model="form.address.lines[i]" class="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <button @click="form.address.lines.splice(i, 1)" class="text-red-500 hover:text-red-700">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Google Maps URL</label>
          <input v-model="form.address.mapsUrl" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
      </div>

      <!-- Sosyal Medya -->
      <div v-if="activeTab === 'social'" class="space-y-4">
        <div class="flex items-center justify-between mb-3">
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Sosyal Medya Linkleri</label>
          <button @click="addSocial" class="text-sm text-primary font-semibold hover:underline">+ Ekle</button>
        </div>
        <div v-for="(s, i) in form.social" :key="i" class="flex gap-2 mb-2 items-center">
          <input v-model="s.label" placeholder="Kısaltma (F, X, IG...)" class="w-20 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          <input v-model="s.aria" placeholder="Platform Adı" class="w-32 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          <input v-model="s.href" placeholder="https://..." class="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl p-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          <button @click="form.social.splice(i, 1)" class="text-red-500 hover:text-red-700">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      <!-- Dış Linkler -->
      <div v-if="activeTab === 'links'" class="space-y-4">
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Ödeme Sayfası URL</label>
          <input v-model="form.externalLinks.payment" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
        </div>
        <div>
          <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Online İşlem Merkezi URL</label>
          <input v-model="form.externalLinks.accountCenter" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
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
import type { SiteSettings } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: settings, refresh } = await useAsyncData('admin-settings', () => $fetch<SiteSettings>('/api/admin/settings'))

const tabs = [
  { id: 'company', label: 'Şirket Bilgileri' },
  { id: 'contact', label: 'İletişim' },
  { id: 'address', label: 'Adres' },
  { id: 'social', label: 'Sosyal Medya' },
  { id: 'links', label: 'Dış Linkler' },
]

const activeTab = ref('company')
const saving = ref(false)
const formError = ref<string | null>(null)

const form = ref<SiteSettings>(JSON.parse(JSON.stringify(settings.value ?? {})))

watch(settings, (val) => {
  if (val) form.value = JSON.parse(JSON.stringify(val))
}, { immediate: true })

function addPhone() {
  form.value.contact.phones.push({ label: '', number: '', href: '' })
}

function addEmail() {
  form.value.contact.emails.push({ label: '', address: '' })
}

function addSocial() {
  form.value.social.push({ label: '', href: '', aria: '' })
}

function setPrimaryPhone(index: number) {
  form.value.contact.phones.forEach((p, i) => {
    if (i !== index) p.primary = false
  })
}

async function handleSave() {
  saving.value = true
  formError.value = null
  try {
    await $fetch('/api/admin/settings', { method: 'PUT', body: form.value })
    await refresh()
    refreshNuxtData('settings')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata oluştu'
  } finally {
    saving.value = false
  }
}
</script>
