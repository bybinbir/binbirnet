<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
    <div class="w-full max-w-sm">
      <div class="text-center mb-8">
        <img src="/img/logo.webp" alt="BinbirNet" class="h-10 mx-auto mb-4" />
        <h1 class="text-2xl font-extrabold text-slate-900 dark:text-white">Yonetim Paneli</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Giris yapin</p>
      </div>

      <form @submit.prevent="onSubmit" class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xl space-y-4">
        <label class="block">
          <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Kullanici Adi</span>
          <input
            v-model="username"
            type="text"
            class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            placeholder="admin"
            required
            autocomplete="username"
          />
        </label>

        <label class="block">
          <span class="text-sm font-semibold text-slate-700 dark:text-slate-300">Sifre</span>
          <input
            v-model="password"
            type="password"
            class="mt-1 w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            placeholder="••••••••"
            required
            autocomplete="current-password"
          />
        </label>

        <div v-if="error" class="text-sm text-red-600 dark:text-red-400 font-semibold">{{ error }}</div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-extrabold transition-colors disabled:opacity-50"
        >
          {{ loading ? 'Giris yapiliyor...' : 'Giris Yap' }}
        </button>
      </form>

      <div class="text-center mt-4">
        <NuxtLink to="/" class="text-sm text-slate-500 hover:text-primary transition-colors">
          Siteye don
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login, checkAuth } = useAdminAuth()

const username = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

// Zaten giris yapilmissa dashboard'a yonlendir
onMounted(async () => {
  const isAuth = await checkAuth()
  if (isAuth) navigateTo('/admin')
})

async function onSubmit() {
  error.value = null
  loading.value = true
  try {
    await login(username.value, password.value)
    navigateTo('/admin')
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Giris basarisiz. Lutfen tekrar deneyin.'
  } finally {
    loading.value = false
  }
}
</script>
