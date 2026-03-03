<template>
  <div class="min-h-screen flex items-center justify-center bg-background-warm dark:bg-slate-900 px-4">
    <div class="text-center max-w-md">
      <div class="text-8xl font-extrabold text-primary mb-4">
        {{ error?.statusCode || '500' }}
      </div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        {{ error?.statusCode === 404 ? 'Sayfa Bulunamadı' : 'Bir Hata Oluştu' }}
      </h1>
      <p class="text-slate-600 dark:text-slate-400 mb-6">
        {{ error?.statusCode === 404
          ? 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.'
          : 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
        }}
      </p>
      <div class="flex gap-3 justify-center">
        <button
          @click="handleError"
          class="px-6 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors"
        >
          Ana Sayfaya Dön
        </button>
        <button
          @click="clearError({ redirect: $route.fullPath })"
          class="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>
