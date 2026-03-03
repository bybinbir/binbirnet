<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Kampanyalar</h1>
      <button
        @click="openForm()"
        class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
      >
        <span class="material-symbols-outlined">add</span>
        Yeni Kampanya
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-slate-50 dark:bg-slate-900/50">
          <tr>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Başlık</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Açıklama</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Durum</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Sıra</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="c in campaigns"
            :key="c.id"
            class="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <td class="p-4 font-semibold text-slate-900 dark:text-white">{{ c.title }}</td>
            <td class="p-4 text-slate-600 dark:text-slate-400 text-sm max-w-xs truncate">{{ c.description }}</td>
            <td class="p-4">
              <button
                @click="toggleActive(c)"
                class="text-xs font-bold px-3 py-1 rounded-full transition-colors"
                :class="c.active ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'"
              >
                {{ c.active ? 'Aktif' : 'Pasif' }}
              </button>
            </td>
            <td class="p-4 text-slate-600 dark:text-slate-400">{{ c.order }}</td>
            <td class="p-4 text-right">
              <button @click="openForm(c)" class="text-slate-500 hover:text-primary mr-2 transition-colors">
                <span class="material-symbols-outlined text-lg">edit</span>
              </button>
              <button @click="handleDelete(c.id)" class="text-slate-500 hover:text-red-600 transition-colors">
                <span class="material-symbols-outlined text-lg">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="showModal = false">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 w-full max-w-lg shadow-2xl">
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
          {{ editingId ? 'Kampanya Düzenle' : 'Yeni Kampanya' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Başlık</label>
            <input v-model="form.title" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Açıklama</label>
            <textarea v-model="form.description" required rows="3" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Durum</label>
              <select v-model="form.active" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                <option :value="true">Aktif</option>
                <option :value="false">Pasif</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Sıralama</label>
              <input v-model.number="form.order" type="number" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div v-if="formError" class="text-sm text-red-600 dark:text-red-400">{{ formError }}</div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="showModal = false" class="px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              İptal
            </button>
            <button type="submit" :disabled="saving" class="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-colors disabled:opacity-50">
              {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Campaign } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: campaigns, refresh } = await useAsyncData('admin-campaigns', () => $fetch<Campaign[]>('/api/admin/campaigns'))

const showModal = ref(false)
const editingId = ref<string | null>(null)
const saving = ref(false)
const formError = ref<string | null>(null)

const form = ref({
  title: '',
  description: '',
  active: true,
  order: 0,
})

function openForm(c?: Campaign) {
  formError.value = null
  if (c) {
    editingId.value = c.id
    form.value = {
      title: c.title,
      description: c.description,
      active: c.active,
      order: c.order,
    }
  } else {
    editingId.value = null
    form.value = { title: '', description: '', active: true, order: campaigns.value?.length ?? 0 }
  }
  showModal.value = true
}

async function handleSubmit() {
  saving.value = true
  formError.value = null
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/campaigns/${editingId.value}`, { method: 'PUT', body: form.value })
    } else {
      await $fetch('/api/admin/campaigns', { method: 'POST', body: form.value })
    }
    showModal.value = false
    await refresh()
    refreshNuxtData('campaigns')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata oluştu'
  } finally {
    saving.value = false
  }
}

async function toggleActive(c: Campaign) {
  try {
    await $fetch(`/api/admin/campaigns/${c.id}`, { method: 'PUT', body: { active: !c.active } })
    await refresh()
    refreshNuxtData('campaigns')
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'İşlem başarısız')
  }
}

async function handleDelete(id: string) {
  if (!confirm('Bu kampanyayı silmek istediğinize emin misiniz?')) return
  try {
    await $fetch(`/api/admin/campaigns/${id}`, { method: 'DELETE' })
    await refresh()
    refreshNuxtData('campaigns')
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Silme işlemi başarısız')
  }
}
</script>
