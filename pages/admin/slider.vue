<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Slider Yönetimi</h1>
      <button
        @click="openForm()"
        class="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors"
      >
        <span class="material-symbols-outlined">add</span>
        Yeni Slide
      </button>
    </div>

    <!-- Cards -->
    <div class="space-y-4">
      <div
        v-for="slide in slides"
        :key="slide.id"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 flex items-center gap-6"
      >
        <!-- Preview -->
        <div class="w-32 h-20 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
          <img :src="slide.image" :alt="slide.imageAlt" class="w-full h-full object-cover" />
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <div class="font-bold text-slate-900 dark:text-white truncate" v-html="slide.title"></div>
          <div class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ slide.badge }} | {{ slide.buttonText }}</div>
          <div class="text-xs text-slate-400 mt-1">Sıralama: {{ slide.order }}</div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 shrink-0">
          <button @click="openForm(slide)" class="text-slate-500 hover:text-primary transition-colors">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button @click="handleDelete(slide.id)" class="text-slate-500 hover:text-red-600 transition-colors">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8" @click.self="showModal = false">
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 w-full max-w-lg shadow-2xl">
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
          {{ editingId ? 'Slide Düzenle' : 'Yeni Slide' }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Resim Yolu</label>
            <input v-model="form.image" required placeholder="/img/hero/resim.webp" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Resim Alt Metni</label>
            <input v-model="form.imageAlt" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Badge</label>
            <input v-model="form.badge" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Başlık (HTML destekli)</label>
            <textarea v-model="form.title" required rows="2" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
          </div>

          <div>
            <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Açıklama</label>
            <textarea v-model="form.description" required rows="2" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Buton Metni</label>
              <input v-model="form.buttonText" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Buton Link</label>
              <input v-model="form.buttonHref" required class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Buton İkon</label>
              <input v-model="form.buttonIcon" required placeholder="waving_hand" class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
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
import type { Slide } from '~/types'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { data: slides, refresh } = await useAsyncData('admin-slides', () => $fetch<Slide[]>('/api/admin/slides'))

const showModal = ref(false)
const editingId = ref<string | null>(null)
const saving = ref(false)
const formError = ref<string | null>(null)

const defaultForm = () => ({
  image: '',
  imageAlt: '',
  badge: '',
  title: '',
  description: '',
  buttonText: '',
  buttonHref: '',
  buttonIcon: 'waving_hand',
  order: 0,
})

const form = ref(defaultForm())

function openForm(slide?: Slide) {
  formError.value = null
  if (slide) {
    editingId.value = slide.id
    form.value = {
      image: slide.image,
      imageAlt: slide.imageAlt,
      badge: slide.badge,
      title: slide.title,
      description: slide.description,
      buttonText: slide.buttonText,
      buttonHref: slide.buttonHref,
      buttonIcon: slide.buttonIcon,
      order: slide.order,
    }
  } else {
    editingId.value = null
    form.value = defaultForm()
    form.value.order = (slides.value?.length ?? 0)
  }
  showModal.value = true
}

async function handleSubmit() {
  saving.value = true
  formError.value = null
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/slides/${editingId.value}`, { method: 'PUT', body: form.value })
    } else {
      await $fetch('/api/admin/slides', { method: 'POST', body: form.value })
    }
    showModal.value = false
    await refresh()
    refreshNuxtData('slides')
  } catch (e: any) {
    formError.value = e?.data?.statusMessage || 'Bir hata oluştu'
  } finally {
    saving.value = false
  }
}

async function handleDelete(id: string) {
  if (!confirm('Bu slide\'ı silmek istediğinize emin misiniz?')) return
  try {
    await $fetch(`/api/admin/slides/${id}`, { method: 'DELETE' })
    await refresh()
    refreshNuxtData('slides')
  } catch (e: any) {
    alert(e?.data?.statusMessage || 'Silme işlemi başarısız')
  }
}
</script>
