<template>
  <div class="min-h-screen flex flex-col bg-background-warm dark:bg-slate-900 transition-colors duration-300 font-sans text-slate-700 dark:text-slate-200">
    <Header />
    <main class="flex-grow pt-20">
      <slot />
    </main>
    <Footer />
    <UiCookieConsent />
  </div>
</template>

<script setup lang="ts">
// Components are auto-imported by Nuxt
</script>
