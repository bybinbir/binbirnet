<template>
  <div class="max-w-3xl mx-auto px-4 py-10">
    <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white">Başvuru</h1>
    <p class="text-slate-600 dark:text-slate-400 mt-2">
      Bilgilerinizi bırakın, ekibimiz en kısa sürede sizinle iletişime geçsin.
    </p>

    <div v-if="infra && infra.full_address" class="mt-5 rounded-2xl border dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
      <div class="text-sm text-slate-600 dark:text-slate-400">Seçtiğiniz adres</div>
      <div class="font-semibold text-slate-900 dark:text-white">{{ infra.full_address }}</div>
    </div>
    <div v-else class="mt-5 rounded-2xl border dark:border-slate-700 p-4 bg-white dark:bg-slate-800">
      <div class="font-semibold text-slate-900 dark:text-white">Adres seçilmedi</div>
      <div class="text-sm text-slate-600 dark:text-slate-400 mt-1">
        Daha doğru paket önerisi için önce
        <NuxtLink class="text-primary font-semibold underline" to="/altyapi-sorgula">
          altyapı sorgulama
        </NuxtLink>
        yapmanızı öneririz.
      </div>
    </div>

    <ApplyForm :initialPkgId="initialPkgId" :infra="infra" :packages="packages ?? []" />
  </div>
</template>

<script setup lang="ts">
import { recommendPackage } from '~/utils/infraRecommend';

useSeoMeta({
  title: "Başvuru Yap | BinbirNet",
  description: "BinbirNet fiber internet başvurusu. Hızlı, kolay ve taahhütsüz internet aboneliği için bilgilerinizi bırakın.",
});

const { data: packages } = await usePackages()
const route = useRoute();

type StoredInfra = {
  full_address?: string;
  result?: any;
  bbk?: string | null;
  available?: boolean;
  max_mbps?: number | null;
  tech?: string | null;
  distance_m?: number | null;
};

const infraCookie = useCookie<StoredInfra | string | null>('bn_infra');
const infra = computed(() => {
  if (!infraCookie.value) return null;
  if (typeof infraCookie.value === 'string') {
    try {
      return JSON.parse(infraCookie.value) as StoredInfra;
    } catch {
      return null;
    }
  }
  return infraCookie.value;
});

const result = computed(() => {
  const i = infra.value;
  if (!i) return null;
  return i.result ?? {
    bbk: i.bbk,
    available: i.available,
    max_mbps: i.max_mbps,
    tech: i.tech,
    distance_m: i.distance_m
  };
});

// Determine initial package ID
const paramPkg = route.query.paket || route.query.pkg;
let initialPkgId = typeof paramPkg === 'string' ? paramPkg : null;

// Paket onerisi
const pkgs = packages.value ?? []
if (!initialPkgId && result.value && pkgs.length > 0) {
  const rec = recommendPackage(result.value, pkgs);
  initialPkgId = rec.primaryType === "wifi" ? rec.wifi.id : rec.wired.id;
}

if (initialPkgId && !pkgs.some(p => p.id === initialPkgId)) {
  initialPkgId = null;
}
</script>

