<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Paketler</h1>
      <button
        @click="openForm()"
        class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
      >
        <span class="material-symbols-outlined">add</span>
        Yeni Paket
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <table class="w-full text-left">
        <thead class="bg-slate-50 dark:bg-slate-900/50">
          <tr>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Paket Adı</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Tür</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Hız</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Fiyat</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300">Badge</th>
            <th class="p-4 font-bold text-sm text-slate-700 dark:text-slate-300 text-right">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pkg in packages"
            :key="pkg.id"
            class="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <td class="p-4 font-semibold text-slate-900 dark:text-white">{{ pkg.name }}</td>
            <td class="p-4">
              <span
                class="text-xs font-bold px-3 py-1 rounded-full"
                :class="pkg.type === 'WIRELESS' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'"
              >
                {{ pkg.type === 'WIRELESS' ? 'Kablosuz' : 'Fiber' }}
              </span>
            </td>
            <td class="p-4 text-slate-600 dark:text-slate-400">{{ pkg.downMbps }}/{{ pkg.upMbps }} Mbps</td>
            <td class="p-4">
              <span v-if="pkg.oldPriceTry" class="text-slate-400 line-through text-sm mr-2">{{ pkg.oldPriceTry }}TL</span>
              <span class="font-bold text-primary">{{ pkg.priceTry }}TL</span>
            </td>
            <td class="p-4">
              <span v-if="pkg.badge" class="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">{{ pkg.badge }}</span>
              <span v-else class="text-slate-400">-</span>
            </td>
            <td class="p-4 text-right">
              <button @click="openForm(pkg)" class="text-slate-500 hover:text-primary mr-2 transition-colors">
                <span class="material-symbols-outlined text-lg">edit</span>
              </button>
              <button @click="handleDelete(pkg.id)" class="text-slate-500 hover:text-red-600 transition-colors">
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
          {{ editingId ? 'Paketi Düzenle' : 'Yeni Paket' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Paket Adı</label>
            <input v-model="form.name" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Tür</label>
            <select v-model="form.type" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              <option value="WIRELESS">Kablosuz (WIRELESS)</option>
              <option value="WIRED">Fiber (WIRED)</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">İndirme (Mbps)</label>
              <input v-model.number="form.downMbps" type="number" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Yükleme (Mbps)</label>
              <input v-model.number="form.upMbps" type="number" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Fiyat (TL)</label>
              <input v-model.number="form.priceTry" type="number" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Eski Fiyat (TL)</label>
              <input v-model.number="form.oldPriceTry" type="number" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Badge</label>
            <select v-model="form.badge" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              <option :value="null">Yok</option>
              <option value="POPULAR">POPULAR</option>
            </select>
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
import type { Package } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: packages, refresh } = await useAsyncData('admin-packages', () => $fetch<Package[]>('/api/admin/packages'))

const showModal = ref(false)
const editingId = ref<string | null>(null)
const saving = ref(false)
const formError = ref<string | null>(null)

const form = ref({
  name: '',
  type: 'WIRELESS' as 'WIRELESS' | 'WIRED',
  downMbps: 0,
  upMbps: 0,
  priceTry: 0,
  oldPriceTry: 0 as number | undefined,
  badge: null as 'POPULAR' | null,
})

function openForm(pkg?: Package) {
  formError.value = null
  if (pkg) {
    editingId.value = pkg.id
    form.value = {
      name: pkg.name,
      type: pkg.type,
      downMbps: pkg.downMbps,
      upMbps: pkg.upMbps,
      priceTry: pkg.priceTry,
      oldPriceTry: pkg.oldPriceTry,
      badge: pkg.badge ?? null,
    }
  } else {
    editingId.value = null
    form.value = { name: '', type: 'WIRELESS', downMbps: 0, upMbps: 0, priceTry: 0, oldPriceTry: undefined, badge: null }
  }
  showModal.value = true
}

async function handleSubmit() {
  saving.value = true
  formError.value = null
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/packages/${editingId.value}`, { method: 'PUT', body: form.value })
    } else {
      await $fetch('/api/admin/packages', { method: 'POST', body: form.value })
    }
    showModal.value = false
    await refresh()
    refreshNuxtData('packages')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata oluştu'
  } finally {
    saving.value = false
  }
}

async function handleDelete(id: string) {
  if (!confirm('Bu paketi silmek istediğinize emin misiniz?')) return
  try {
    await $fetch(`/api/admin/packages/${id}`, { method: 'DELETE' })
    await refresh()
    refreshNuxtData('packages')
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Silme işlemi başarısız')
  }
}
</script>
