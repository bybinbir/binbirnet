<template>
  <div class="min-h-screen flex bg-slate-50 dark:bg-slate-900">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col shrink-0">
      <!-- Logo -->
      <div class="p-6 border-b border-slate-200 dark:border-slate-700">
        <NuxtLink to="/" class="flex items-center gap-2">
          <img src="/img/logo.webp" alt="BinbirNet" class="h-8 w-auto" />
        </NuxtLink>
        <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">Yönetim Paneli</div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors text-sm"
          :class="[
            isActive(item.to) ? 'bg-primary/10 text-primary' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
            item.separator ? 'mt-4 pt-4 border-t border-slate-200 dark:border-slate-700' : ''
          ]"
        >
          <span class="material-symbols-outlined text-xl">{{ item.icon }}</span>
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-slate-200 dark:border-slate-700">
        <div class="text-xs text-slate-500 dark:text-slate-400 mb-2">{{ user }}</div>
        <button
          @click="logout"
          class="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <span class="material-symbols-outlined text-lg">logout</span>
          Çıkış Yap
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, logout } = useAdminAuth()
const route = useRoute()

const isActive = (path: string) => {
  if (path === '/admin') return route.path === '/admin'
  return route.path.startsWith(path)
}

const navItems = [
  { to: '/admin', icon: 'dashboard', label: 'Dashboard' },
  // İçerik
  { to: '/admin/paketler', icon: 'local_offer', label: 'Paketler', separator: true },
  { to: '/admin/slider', icon: 'slideshow', label: 'Slider' },
  { to: '/admin/kampanyalar', icon: 'campaign', label: 'Kampanyalar' },
  { to: '/admin/anasayfa', icon: 'home', label: 'Anasayfa' },
  { to: '/admin/navigasyon', icon: 'menu', label: 'Navigasyon' },
  // Ayarlar
  { to: '/admin/seo', icon: 'search', label: 'SEO', separator: true },
  { to: '/admin/izleme', icon: 'analytics', label: 'İzleme Kodları' },
  { to: '/admin/ayarlar', icon: 'settings', label: 'Site Ayarları' },
]
</script>
