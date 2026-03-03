<template>
  <main class="min-h-screen pt-24 pb-12 bg-white dark:bg-slate-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- LEFT COLUMN: Content -->
        <div class="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700">
          <div>
            <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
              İnternet Hızınızı <span class="text-primary">Test Edin</span>
            </h1>
            <p class="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Lokasyonunuzdaki bağlantı hızınızı ve performansınızı kontrol ederek internet kalitenizi ölçün.
              Doğru sonuç almak için aşağıdaki önerilere dikkat etmeniz önemlidir.
            </p>
          </div>

          <div class="bg-orange-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-orange-100 dark:border-slate-700">
            <ul class="space-y-4">
              <li v-for="(item, index) in advice" :key="index" class="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mt-0.5">
                  <span class="material-symbols-outlined text-sm font-bold">check</span>
                </span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="pt-4">
            <NuxtLink
              to="https://fast.com"
              target="_blank"
              external
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white bg-primary rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto min-w-[200px]"
            >
              <span class="material-symbols-outlined text-2xl">speed</span>
              Hız Testini Başlat
            </NuxtLink>
          </div>
        </div>

        <!-- RIGHT COLUMN: Video -->
        <div class="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 group animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
          <div class="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none z-10" />
          <video
            src="/img/hiztesti.mp4"
            autoplay
            loop
            muted
            playsinline
            class="w-full h-full object-cover"
          >
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">


useSeoMeta({
  title: "Hız Testi - BinbirNet",
  description: "İnternet hızınızı test etmeden önce dikkat etmeniz gerekenler ve hız testi aracı.",
});

const advice = [
  "Modem veya router’a mümkün olduğunca yakın olun.",
  "Diğer tüm indirme ve yükleme işlemlerini durdurun.",
  "Bilgisayarınızı Ethernet kablosu ile bağlayın.",
  "Arka planda çalışan tüm uygulamaları kapatın.",
  "Test sırasında cihazınızı sabit tutun."
];
</script>
