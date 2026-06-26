<template>
  <div class="pb-20">
    <section class="pt-10 pb-16 px-4">
      <div class="max-w-3xl mx-auto">
        <!-- Geri linki -->
        <NuxtLink
          to="/paketler"
          class="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-6"
        >
          <span class="material-symbols-outlined text-base">arrow_back</span>
          Tüm Tarifeler
        </NuxtLink>

        <div
          v-if="pkg"
          class="bg-white dark:bg-slate-800 rounded-[2rem] border-2 border-orange-100 dark:border-slate-700 shadow-2xl overflow-hidden"
        >
          <!-- Başlık + Fiyat -->
          <div class="bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-10 border-b border-orange-100 dark:border-slate-700">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-16 rounded-2xl bg-pastel-orange dark:bg-orange-900/30 text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-3xl">wifi</span>
              </div>
              <div>
                <div class="text-xs font-bold uppercase tracking-widest text-orange-500">
                  Kablosuz Tarife
                </div>
                <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {{ pkg.name }}
                </h1>
              </div>
            </div>

            <p class="text-slate-600 dark:text-slate-400 max-w-xl">
              Altyapı gerektirmeyen, taahhütsüz ve kotasız kablosuz internet.
              Hemen kurulum, kesintisiz bağlantı.
            </p>

            <div class="mt-6 flex items-baseline gap-3 flex-wrap">
              <span
                v-if="pkg.oldPriceTry"
                class="text-slate-400 text-xl line-through decoration-red-500/50 decoration-2 font-semibold"
              >
                {{ pkg.oldPriceTry }},00₺
              </span>
              <span class="text-5xl font-black text-primary">
                {{ pkg.priceTry }}<span class="text-2xl align-top">,00₺</span>
              </span>
              <span class="text-slate-500 font-medium">/ ay</span>
            </div>
          </div>

          <!-- Özellikler -->
          <div class="p-8 md:p-10">
            <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-6">
              Paket Özellikleri
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="f in features"
                :key="f.text"
                class="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700"
              >
                <span class="material-symbols-outlined" :class="f.color">{{ f.icon }}</span>
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {{ f.text }}
                </span>
              </div>
            </div>

            <!-- Başvuru butonları -->
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- 1) E-Devlet ile Hızlı Başvuru -->
              <a
                href="https://binbirnet.com.tr/online_basvuru"
                target="_blank"
                rel="noopener noreferrer"
                class="py-4 px-4 rounded-2xl bg-primary hover:bg-orange-600 text-white font-black text-center flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-xl shadow-primary/20"
              >
                <span class="material-symbols-outlined">verified_user</span>
                E-Devlet İle Başvur
              </a>
              <!-- 2) Site içi başvuru formu -->
              <NuxtLink
                :to="`/basvuru?paket=${pkg.id}`"
                class="py-4 px-4 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-white font-black text-center flex items-center justify-center gap-2 transition-all"
              >
                <span class="material-symbols-outlined">edit_document</span>
                Başvuru Formu
              </NuxtLink>
            </div>
            <p class="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
              E-Devlet ile kimlik doğrulaması dakikalar içinde tamamlanır; dilerseniz başvuru formunu da doldurabilirsiniz.
            </p>
          </div>
        </div>

        <!-- Paket bulunamazsa -->
        <div v-else class="text-center py-20 text-slate-500 dark:text-slate-400">
          Paket bulunamadı.
          <NuxtLink to="/paketler" class="text-primary font-semibold underline">
            Tüm tarifelere dön
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Package } from "~/types";

const props = defineProps<{ packageId: string }>();

const { data: packages } = await usePackages();

const pkg = computed<Package | undefined>(() =>
  (packages.value ?? []).find((p) => p.id === props.packageId)
);

const features = computed(() => {
  const p = pkg.value;
  if (!p) return [];
  return [
    { icon: "download", text: `${p.downMbps} Mbps İndirme Hızı`, color: "text-primary" },
    { icon: "upload", text: `${p.upMbps} Mbps Yükleme Hızı`, color: "text-primary" },
    { icon: "bolt", text: "Hemen Kurulum", color: "text-green-500" },
    { icon: "wifi", text: "Altyapı Gerektirmez", color: "text-orange-500" },
    { icon: "all_inclusive", text: "Kotasız Kullanım", color: "text-blue-500" },
    { icon: "verified_user", text: "Taahhütsüz", color: "text-secondary" },
  ];
});

useSeoMeta({
  title: () => (pkg.value ? `${pkg.value.name} Tarifesi` : "Tarife"),
  description: () =>
    pkg.value
      ? `${pkg.value.name} kablosuz internet tarifesi: ${pkg.value.downMbps}/${pkg.value.upMbps} Mbps, taahhütsüz ve kotasız, aylık ${pkg.value.priceTry}₺. E-Devlet ile hızlı başvuru.`
      : "BinbirNet kablosuz internet tarifesi.",
});
</script>
