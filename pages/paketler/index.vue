<template>
  <main class="pb-20">
    <!-- Hero -->
    <section class="pt-8 pb-16 px-4">
      <div class="max-w-5xl mx-auto text-center">
        <span class="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
          Sana Özel Paketini Bul
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
          Akıllı Paket Oluşturucu
        </h1>
        <p class="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          İhtiyaçlarını söyle, en uygun tarifeyi saniyeler içinde senin için
          seçelim. WiFi paketlerimiz altyapı gerektirmez!
        </p>
      </div>
    </section>

    <!-- Akıllı Paket Oluşturucu -->
    <section class="px-4 mb-20">
      <div class="max-w-5xl mx-auto">
        <div class="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <!-- Sol Panel - Adımlar -->
          <div class="lg:col-span-4 bg-slate-50 dark:bg-slate-900/50 p-8 border-r border-slate-200 dark:border-slate-700">
            <div class="space-y-8">
              <!-- Adım 1 -->
              <div class="flex items-start gap-4" :class="getStepClass(1)">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" :class="getStepCircleClass(1)">
                  1
                </div>
                <div>
                  <p class="font-bold">Kullanıcı Sayısı</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    Kaç kişi bağlanacak?
                  </p>
                </div>
              </div>

              <!-- Adım 2 -->
              <div class="flex items-start gap-4" :class="getStepClass(2)">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" :class="getStepCircleClass(2)">
                  2
                </div>
                <div>
                  <p class="font-bold">Ana Aktiviteler</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    En çok ne yaparsınız?
                  </p>
                </div>
              </div>

              <!-- Adım 3 -->
              <div class="flex items-start gap-4" :class="getStepClass(3)">
                <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm" :class="getStepCircleClass(3)">
                  3
                </div>
                <div>
                  <p class="font-bold">Öneri</p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    Size en uygun paket
                  </p>
                </div>
              </div>
            </div>

            <!-- Bilgi Kutusu -->
            <div class="mt-12 p-6 bg-orange-50 dark:bg-orange-900/20 rounded-2xl">
              <p class="text-sm font-medium text-orange-700 dark:text-orange-400 leading-relaxed">
                <span class="material-symbols-outlined align-middle mr-1 text-lg">
                  wifi
                </span>
                WiFi paketlerimiz altyapı gerektirmez, hemen kurulum yapılır!
              </p>
            </div>
          </div>

          <!-- Sağ Panel - İçerik -->
          <div class="lg:col-span-8 p-8 lg:p-12">
            <div class="space-y-12">
              <!-- Kullanıcı Sayısı -->
              <div>
                <h3 class="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                  İnterneti kaç kişi kullanacak?
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    v-for="count in ['1-2', '3-5', '5+']"
                    :key="count"
                    @click="selectUserCount(count)"
                    class="group p-6 border-2 rounded-2xl text-left transition-all hover:shadow-lg flex items-center gap-4"
                    :class="userCount === count
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30'"
                  >
                    <div
                      class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm"
                      :class="userCount === count ? 'text-primary' : 'text-slate-400 group-hover:text-primary'"
                    >
                      <span class="material-symbols-outlined">{{ count === '1-2' ? 'person' : count === '3-5' ? 'group' : 'groups' }}</span>
                    </div>
                    <div>
                      <p class="font-bold text-slate-900 dark:text-white">{{ count }} Kişi</p>
                      <p class="text-sm text-slate-500">{{ count === '1-2' ? 'Temel kullanım' : count === '3-5' ? 'Aile kullanımı' : 'Geniş aile/Ofis' }}</p>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Aktiviteler -->
              <div>
                <h3 class="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                  En çok hangi aktiviteleri yaparsınız?
                </h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <button
                    @click="toggleActivity('4k'); setStep(3)"
                    class="p-4 border-2 rounded-2xl text-center transition-all"
                    :class="activities.includes('4k') ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-700'"
                  >
                    <span class="material-symbols-outlined block text-3xl mb-2" :class="activities.includes('4k') ? 'text-primary' : 'text-slate-400'">video_library</span>
                    <p class="text-sm font-bold text-slate-900 dark:text-white">4K Film/Dizi</p>
                  </button>
                  <button
                    @click="toggleActivity('gaming'); setStep(3)"
                    class="p-4 border-2 rounded-2xl text-center transition-all"
                    :class="activities.includes('gaming') ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-700'"
                  >
                    <span class="material-symbols-outlined block text-3xl mb-2" :class="activities.includes('gaming') ? 'text-primary' : 'text-slate-400'">sports_esports</span>
                    <p class="text-sm font-bold text-slate-900 dark:text-white">Online Oyun</p>
                  </button>
                  <button
                    @click="toggleActivity('homeoffice'); setStep(3)"
                    class="p-4 border-2 rounded-2xl text-center transition-all"
                    :class="activities.includes('homeoffice') ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-700'"
                  >
                    <span class="material-symbols-outlined block text-3xl mb-2" :class="activities.includes('homeoffice') ? 'text-primary' : 'text-slate-400'">work</span>
                    <p class="text-sm font-bold text-slate-900 dark:text-white">Home Office</p>
                  </button>
                </div>
              </div>

              <!-- Öneri Sonucu -->
              <div class="pt-8 border-t border-slate-100 dark:border-slate-700">
                <div class="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div class="flex items-center gap-4">
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center" :class="recommendedPackage.type === 'WIRELESS' ? 'bg-pastel-orange dark:bg-orange-900/30 text-orange-500' : 'bg-pastel-blue dark:bg-blue-900/30 text-blue-500'">
                      <span class="material-symbols-outlined text-2xl">{{ recommendedPackage.type === 'WIRELESS' ? 'wifi' : 'router' }}</span>
                    </div>
                    <div class="text-left">
                      <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Önerilen Paket</p>
                      <p class="text-2xl font-black text-slate-900 dark:text-white">{{ recommendedPackage.name }}</p>
                      <p class="text-xs text-slate-500">
                        {{ recommendedPackage.downMbps }}/{{ recommendedPackage.upMbps }} Mbps • {{ recommendedPackage.type === 'WIRELESS' ? 'Kablosuz' : 'Fiber' }}
                      </p>
                    </div>
                  </div>

                  <div class="flex items-center gap-4">
                    <div class="text-right">
                      <p v-if="recommendedPackage.oldPriceTry" class="text-sm text-slate-400 line-through">{{ recommendedPackage.oldPriceTry }},00₺</p>
                      <p class="text-3xl font-black text-primary">{{ recommendedPackage.priceTry }},00₺ <span class="text-sm font-medium text-slate-500">/ ay</span></p>
                    </div>
                    <NuxtLink :to="`/basvuru?paket=${recommendedPackage.id}`" class="bg-primary hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black flex items-center gap-3 transition-all hover:scale-105 shadow-xl shadow-primary/20">
                      Hemen Başvur
                      <span class="material-symbols-outlined">arrow_forward</span>
                    </NuxtLink>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tüm Paketler - WiFi Öncelikli -->
    <section class="px-4 mb-20">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Tüm Paketlerimiz</h2>
          <p class="text-slate-600 dark:text-slate-400">WiFi paketlerimiz altyapı gerektirmez, anında kurulum yapılır!</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <UiPackageCard v-for="(pkg, index) in sortedPackages" :key="pkg.id" :pkg="pkg" :featured="index < 2" showTypeBadge />
        </div>
      </div>
    </section>

    <!-- Karşılaştırma Tablosu -->
    <section class="px-4 mb-20">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-center text-3xl font-extrabold text-slate-900 dark:text-white mb-8">Hız Karşılaştırması</h2>
        <div class="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden shadow-xl">
          <div class="overflow-x-auto">
            <table class="min-w-[720px] w-full text-left">
              <thead class="bg-slate-50 dark:bg-slate-900/50">
                <tr>
                  <th class="p-5 font-extrabold text-slate-900 dark:text-white">Paket</th>
                  <th class="p-5 font-extrabold text-slate-900 dark:text-white">Tür</th>
                  <th class="p-5 font-extrabold text-slate-900 dark:text-white">İndirme</th>
                  <th class="p-5 font-extrabold text-slate-900 dark:text-white">Yükleme</th>
                  <th class="p-5 font-extrabold text-slate-900 dark:text-white">Fiyat</th>
                  <th class="p-5 font-extrabold text-slate-900 dark:text-white"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pkg, index) in sortedPackages" :key="pkg.id" class="border-t border-slate-100 dark:border-slate-700" :class="index < 2 ? 'bg-orange-50/50 dark:bg-orange-900/10' : ''">
                  <td class="p-5">
                    <div class="flex items-center gap-3">
                      <span class="material-symbols-outlined" :class="pkg.type === 'WIRELESS' ? 'text-orange-500' : 'text-blue-500'">{{ pkg.type === 'WIRELESS' ? 'wifi' : 'router' }}</span>
                      <NuxtLink v-if="tarifeHref(pkg)" :to="tarifeHref(pkg)!" class="font-semibold text-slate-900 dark:text-white hover:text-primary transition-colors">{{ pkg.name }}</NuxtLink>
                      <span v-else class="font-semibold text-slate-900 dark:text-white">{{ pkg.name }}</span>
                      <span v-if="index < 2" class="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded-full">ÖNERİLEN</span>
                    </div>
                  </td>
                  <td class="p-5 text-slate-600 dark:text-slate-400">{{ pkg.type === "WIRELESS" ? "Kablosuz" : "Fiber" }}</td>
                  <td class="p-5 font-semibold text-slate-900 dark:text-white">{{ pkg.downMbps }} Mbps</td>
                  <td class="p-5 text-slate-600 dark:text-slate-400">{{ pkg.upMbps }} Mbps</td>
                  <td class="p-5 font-extrabold text-primary">{{ pkg.priceTry }},00₺/ay</td>
                  <td class="p-5">
                    <NuxtLink :to="`/basvuru?paket=${pkg.id}`" class="text-primary hover:text-orange-600 font-bold flex items-center gap-1">
                      Başvur
                      <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <UiCTASection
      title="Hangi Altyapı Size Uygun?"
      description="Adresinizi sorgulayın, size en uygun paketi ve altyapıyı anında öğrenin."
      buttonText="Altyapı Sorgula"
      buttonHref="/altyapi-sorgula"
    />
  </main>
</template>

<script setup lang="ts">

import type { Package } from '~/types';
import { tarifeHref } from '~/utils/tarifeSlug';

const { data: packages } = await usePackages()

type UserCount = "1-2" | "3-5" | "5+";
type Activity = "4k" | "gaming" | "homeoffice";

const step = ref(1);
const userCount = ref<UserCount | null>(null);
const activities = ref<Activity[]>([]);

function setStep(v: number) {
  step.value = v;
}

function selectUserCount(c: string) {
  userCount.value = c as UserCount;
  setStep(2);
}

function toggleActivity(activity: Activity) {
  if (activities.value.includes(activity)) {
    activities.value = activities.value.filter(a => a !== activity);
  } else {
    activities.value.push(activity);
  }
}

const sortedPackages = computed(() => {
  return [...(packages.value ?? [])].sort((a, b) => {
    if (a.type === "WIRELESS" && b.type !== "WIRELESS") return -1;
    if (a.type !== "WIRELESS" && b.type === "WIRELESS") return 1;
    return b.downMbps - a.downMbps;
  });
});

const recommendedPackage = computed<Package>(() => {
  const wifiPackages = (packages.value ?? []).filter((p) => p.type === "WIRELESS");
  
  const needsHighSpeed =
      activities.value.includes("4k") ||
      activities.value.includes("gaming") ||
      userCount.value === "5+";

    const needsMediumSpeed =
      activities.value.includes("homeoffice") || userCount.value === "3-5";

    if (needsHighSpeed) {
      return wifiPackages.reduce((max, p) => p.downMbps > max.downMbps ? p : max, wifiPackages[0]);
    } else if (needsMediumSpeed) {
      return wifiPackages.reduce((max, p) => p.downMbps > max.downMbps ? p : max, wifiPackages[0]);
    } else {
      return wifiPackages.reduce((min, p) => p.downMbps < min.downMbps ? p : min, wifiPackages[0]);
    }
});

function getStepClass(s: number) {
    if (s < step.value) return "text-primary";
    if (s === step.value) return "text-primary";
    return "text-slate-400";
}

function getStepCircleClass(s: number) {
    if (s <= step.value) return "bg-primary text-white";
    return "border-2 border-slate-200 dark:border-slate-700";
}

useSeoMeta({
  title: "Paketler ve Fiyatlar",
  description: "En uygun internet paketleri. Kablosuz ve fiber internet seçenekleri, taahhütsüz ve kotasız tarifeler.",
});
</script>
