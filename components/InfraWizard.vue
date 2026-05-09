<template>
  <div class="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xl transition-colors">
    <div class="flex items-start justify-between gap-3">
      <div>
        <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
          Altyapı Sorgula
        </h1>
        <p class="text-slate-600 dark:text-slate-400 mt-2">
          Adım adım adresinizi seçin, size uygun paketi otomatik önerelim.
        </p>
      </div>
      <NuxtLink
        class="hidden md:inline-flex px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-extrabold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        to="/paketler"
      >
        Paketler
      </NuxtLink>
    </div>

    <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <label class="block">
        <div class="text-sm font-extrabold text-slate-900 dark:text-white">İlçe</div>
        <select
          class="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/50 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 dark:disabled:text-slate-500 transition-colors"
          :value="sel.ilce?.kod || ''"
          @change="onIlce($event.target.value)"
          :disabled="!!loading"
        >
          <option value="">Seçiniz...</option>
          <option v-for="o in ilceler" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </label>

      <label class="block">
        <div class="text-sm font-extrabold text-slate-900 dark:text-white">Mahalle</div>
        <select
          class="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/50 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 dark:disabled:text-slate-500 transition-colors"
          :value="sel.mahalle?.kod || ''"
          @change="onMahalle($event.target.value)"
          :disabled="!sel.ilce || !!loading || mahalleler.length === 0"
        >
          <option value="">Seçiniz...</option>
          <option v-for="o in mahalleler" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </label>

      <label class="block">
        <div class="text-sm font-extrabold text-slate-900 dark:text-white">Cadde / Sokak</div>
        <select
          class="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/50 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 dark:disabled:text-slate-500 transition-colors"
          :value="sel.cadde?.kod || ''"
          @change="onCadde($event.target.value)"
          :disabled="!sel.mahalle || !!loading || caddeler.length === 0"
        >
          <option value="">Seçiniz...</option>
          <option v-for="o in caddeler" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </label>

      <label class="block">
        <div class="text-sm font-extrabold text-slate-900 dark:text-white">Bina</div>
        <select
          class="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/50 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 dark:disabled:text-slate-500 transition-colors"
          :value="sel.bina?.kod || ''"
          @change="onBina($event.target.value)"
          :disabled="!sel.cadde || !!loading || binalar.length === 0"
        >
          <option value="">Seçiniz...</option>
          <option v-for="o in binalar" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </label>

      <label class="block">
        <div class="text-sm font-extrabold text-slate-900 dark:text-white">Daire</div>
        <select
          class="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-3 font-semibold text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/50 disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:text-slate-400 dark:disabled:text-slate-500 transition-colors"
          :value="sel.daire?.kod || ''"
          @change="onDaire($event.target.value)"
          :disabled="!sel.bina || !!loading || daireler.length === 0"
        >
          <option value="">Seçiniz...</option>
          <option v-for="o in daireler" :key="o.value" :value="o.value">{{ o.label }}</option>
        </select>
      </label>
    </div>

    <div v-if="loading" class="mt-4 text-sm font-extrabold text-primary animate-pulse">{{ loading }}</div>

    <div v-if="error" class="mt-4 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-400 font-semibold">
      {{ error }}
    </div>

    <div v-if="fullAddress" class="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 transition-colors">
      <div class="text-xs font-extrabold text-slate-700 dark:text-slate-400">Seçilen adres</div>
      <div class="mt-1 text-slate-800 dark:text-slate-200 font-semibold">{{ fullAddress }}</div>
    </div>

    <div v-if="result && recommended" class="mt-6 space-y-6">
      <!-- Altyapı Sonucu -->
      <div class="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 transition-colors">
        <div class="flex items-center justify-between mb-4">
          <div class="font-extrabold text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-primary">cell_tower</span>
            Altyapı Sonucu
          </div>
          <div
            :class="result.available
              ? 'text-xs font-extrabold px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'text-xs font-extrabold px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'"
          >
            {{ result.available ? "Uygun" : "Uygun Değil" }}
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 transition-colors">
            <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold">BBK Kodu</div>
            <div class="font-extrabold mt-1 text-slate-900 dark:text-white text-lg">
              {{ result.bbk ?? "-" }}
            </div>
          </div>
          <div class="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 transition-colors">
            <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Teknoloji</div>
            <div class="font-extrabold mt-1 text-slate-900 dark:text-white text-lg">
              {{ result.tech ?? "-" }}
            </div>
          </div>
          <div class="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 transition-colors">
            <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Max Hız</div>
            <div class="font-extrabold mt-1 text-primary text-lg">
              {{ result.max_mbps ? `${result.max_mbps} Mbps` : "-" }}
            </div>
          </div>
          <div class="rounded-2xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 transition-colors">
            <div class="text-xs text-slate-500 dark:text-slate-400 font-semibold">Santral Mesafesi</div>
            <div class="font-extrabold mt-1 text-slate-900 dark:text-white text-lg">
              {{ result.distance_m ? `${result.distance_m} m` : "-" }}
            </div>
          </div>
        </div>
      </div>

      <!-- Önerilen Paketler -->
      <div>
        <h2 class="text-xl font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">recommend</span>
          Önerilen Paketler
        </h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- WiFi Paketi -->
          <div
            class="rounded-3xl border-2 p-6 transition-colors"
            :class="recommended.primaryType === 'wifi'
              ? 'border-primary bg-gradient-to-br from-primary/10 to-white dark:to-slate-900 shadow-xl'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'"
          >
            <div v-if="recommended.primaryType === 'wifi'" class="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-primary text-white mb-4">
              <span class="material-symbols-outlined text-sm">star</span>
              Önerilen
            </div>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-2xl bg-pastel-orange dark:bg-orange-900/30 flex items-center justify-center">
                <span class="material-symbols-outlined text-2xl text-orange-500">wifi</span>
              </div>
              <div>
                <div class="text-xs font-bold text-orange-600 dark:text-orange-400">Kablosuz</div>
                <div class="text-xl font-extrabold text-slate-900 dark:text-white">
                  {{ recommended.wifi.name }}
                </div>
              </div>
            </div>

            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {{ recommended.wifiReason }}
            </p>

            <div class="flex items-center gap-4 mb-4">
              <div class="text-sm text-slate-600 dark:text-slate-400">
                <span class="font-bold text-slate-900 dark:text-white">
                  {{ recommended.wifi.downMbps }}/{{ recommended.wifi.upMbps }}
                </span>{" "}
                Mbps
              </div>
              <div class="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <span class="material-symbols-outlined text-sm">bolt</span>
                Hemen Kurulum
              </div>
            </div>

            <div class="flex items-baseline gap-2 mb-4">
              <span v-if="recommended.wifi.oldPriceTry" class="text-slate-400 line-through text-sm">
                {{ recommended.wifi.oldPriceTry }}₺
              </span>
              <span class="text-3xl font-extrabold text-primary">
                {{ recommended.wifi.priceTry }}₺
              </span>
              <span class="text-slate-500 text-sm">/ay</span>
            </div>

            <NuxtLink
              :to="`/basvuru?paket=${recommended.wifi.id}`"
              class="block w-full py-3 rounded-xl font-extrabold text-center transition-all"
              :class="recommended.primaryType === 'wifi'
                ? 'bg-primary hover:bg-orange-600 text-white shadow-lg shadow-primary/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'"
            >
              Başvur
            </NuxtLink>
          </div>

          <!-- VDSL/Fiber Paketi -->
          <div
            class="rounded-3xl border-2 p-6 transition-colors"
            :class="recommended.primaryType === 'wired'
              ? 'border-primary bg-gradient-to-br from-primary/10 to-white dark:to-slate-900 shadow-xl'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'"
          >
            <div v-if="recommended.primaryType === 'wired'" class="inline-flex items-center gap-1 text-xs font-extrabold px-3 py-1 rounded-full bg-primary text-white mb-4">
              <span class="material-symbols-outlined text-sm">star</span>
              Önerilen
            </div>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 rounded-2xl bg-pastel-blue dark:bg-blue-900/30 flex items-center justify-center">
                <span class="material-symbols-outlined text-2xl text-blue-500">router</span>
              </div>
              <div>
                <div class="text-xs font-bold text-blue-600 dark:text-blue-400">Fiber</div>
                <div class="text-xl font-extrabold text-slate-900 dark:text-white">
                  {{ recommended.wired.name }}
                </div>
              </div>
            </div>

            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
              {{ recommended.wiredReason }}
            </p>

            <div class="flex items-center gap-4 mb-4">
              <div class="text-sm text-slate-600 dark:text-slate-400">
                <span class="font-bold text-slate-900 dark:text-white">
                  {{ recommended.wired.downMbps }}/{{ recommended.wired.upMbps }}
                </span>{" "}
                Mbps
              </div>
              <div class="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                <span class="material-symbols-outlined text-sm">verified</span>
                Sabit Altyapı
              </div>
            </div>

            <div class="flex items-baseline gap-2 mb-4">
              <span v-if="recommended.wired.oldPriceTry" class="text-slate-400 line-through text-sm">
                {{ recommended.wired.oldPriceTry }}₺
              </span>
              <span class="text-3xl font-extrabold text-primary">
                {{ recommended.wired.priceTry }}₺
              </span>
              <span class="text-slate-500 text-sm">/ay</span>
            </div>

            <NuxtLink
              :to="`/basvuru?paket=${recommended.wired.id}`"
              class="block w-full py-3 rounded-xl font-extrabold text-center transition-all"
              :class="recommended.primaryType === 'wired'
                ? 'bg-primary hover:bg-orange-600 text-white shadow-lg shadow-primary/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'"
            >
              Başvur
            </NuxtLink>
          </div>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/paketler"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          Tüm Paketleri Gör
          <span class="material-symbols-outlined">arrow_forward</span>
        </NuxtLink>
      </div>

      <div class="mt-6 text-xs text-slate-500 dark:text-slate-400">
        Bu sorgu, altyapı verisini Türk Telekom kaynaklı sorgulayıp BinbirNet paketleriyle eşleyerek öneri üretir.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { recommendPackage, type InfraResult } from '~/utils/infraRecommend';
import type { Package } from '~/types';

const props = defineProps<{
  packages: Package[];
}>();

type Option = { value: string; label: string };

type Selections = {
  il: { kod: string; ad: string };
  ilce?: { kod: string; ad: string };
  bucak?: { kod: string; ad: string };
  koy?: { kod: string; ad: string };
  mahalle?: { kod: string; ad: string };
  cadde?: { kod: string; ad: string };
  bina?: { kod: string; ad: string };
  daire?: { kod: string; ad: string };
};

const config = useRuntimeConfig();

type StoredInfra = {
  selections: Selections;
  full_address: string;
  result: InfraResult;
  recommended_package_id: string;
};

// İl bilgisi - config'den veya varsayılan
const IL_KODU = config.public.IL_KODU as string || "33";
const IL_ADI = config.public.IL_ADI as string || "Mersin";

const loading = ref<string | null>(null);
const ilceler = ref<Option[]>([]);
const mahalleler = ref<Option[]>([]);
const caddeler = ref<Option[]>([]);
const binalar = ref<Option[]>([]);
const daireler = ref<Option[]>([]);

const sel = ref<Selections>({ il: { kod: IL_KODU, ad: IL_ADI } });
const result = ref<InfraResult | null>(null);
const error = ref<string | null>(null);
const recommended = computed(() => result.value && props.packages.length > 0 ? recommendPackage(result.value, props.packages) : null);

const fullAddress = computed(() => {
  const parts = [
    `${sel.value.il.ad}`,
    sel.value.ilce?.ad,
    sel.value.mahalle?.ad,
    sel.value.cadde?.ad,
    sel.value.bina?.ad,
    sel.value.daire?.ad ? `Daire ${sel.value.daire.ad}` : undefined
  ].filter(Boolean);
  return parts.join(" / ");
});

async function fetchOptions(endpoint: string, params: Record<string, string>) {
  const qs = new URLSearchParams({ endpoint, ...params });
  const data = await $fetch<{ options: Option[] }>(`/api/infra?${qs.toString()}`);
  return data.options ?? [];
}

async function fetchDaireSorgu(kod: string, ilce_kodu: string) {
  const qs = new URLSearchParams({ endpoint: "dairesorgula", kod, ilce_kodu });
  return await $fetch<InfraResult>(`/api/infra?${qs.toString()}`);
}

async function initIlceler() {
  error.value = null;
  loading.value = "İlçeler yükleniyor...";
  try {
    const opts = await fetchOptions("ilceler", { kod: IL_KODU });
    ilceler.value = opts;
  } catch {
    error.value = "İlçeler alınamadı. Lütfen tekrar deneyin.";
  } finally {
    loading.value = null;
  }
}

onMounted(() => {
  initIlceler();
});

async function onIlce(ilceKod: string) {
  if (!ilceKod) return;
  setResult(null);
  error.value = null;

  const ilceAd = ilceler.value.find((x) => x.value === ilceKod)?.label ?? ilceKod;
  sel.value = { il: sel.value.il, ilce: { kod: ilceKod, ad: ilceAd } };

  loading.value = "Merkez bilgileri hazırlanıyor...";
  try {
    const bucakOpts = await fetchOptions("bucaklar", { kod: ilceKod });
    const bucak = bucakOpts[0];
    if (!bucak) throw new Error();

    const koyOpts = await fetchOptions("koyler", { kod: bucak.value });
    const koy = koyOpts[0];
    if (!koy) throw new Error();

    const mah = await fetchOptions("mahalleler", { kod: koy.value });

    sel.value = {
      ...sel.value,
      bucak: { kod: bucak.value, ad: bucak.label },
      koy: { kod: koy.value, ad: koy.label }
    };

    mahalleler.value = mah;
    caddeler.value = [];
    binalar.value = [];
    daireler.value = [];
  } catch {
    error.value = "Altyapı adımları yüklenemedi. Lütfen tekrar deneyin.";
  } finally {
    loading.value = null;
  }
}

async function onMahalle(kod: string) {
  if (!kod) return;
  setResult(null);
  error.value = null;
  const ad = mahalleler.value.find((x) => x.value === kod)?.label ?? kod;
  sel.value = { ...sel.value, mahalle: { kod, ad }, cadde: undefined, bina: undefined, daire: undefined };

  loading.value = "Caddeler yükleniyor...";
  try {
    const cad = await fetchOptions("caddeler", { kod, ilce_kodu: sel.value.ilce?.kod ?? "" });
    caddeler.value = cad;
    binalar.value = [];
    daireler.value = [];
  } catch {
    error.value = "Caddeler alınamadı.";
  } finally {
    loading.value = null;
  }
}

async function onCadde(kod: string) {
  if (!kod) return;
  setResult(null);
  error.value = null;
  const ad = caddeler.value.find((x) => x.value === kod)?.label ?? kod;
  sel.value = { ...sel.value, cadde: { kod, ad }, bina: undefined, daire: undefined };

  loading.value = "Binalar yükleniyor...";
  try {
    const bin = await fetchOptions("binalar", { kod, ilce_kodu: sel.value.ilce?.kod ?? "" });
    binalar.value = bin;
    daireler.value = [];
  } catch {
    error.value = "Binalar alınamadı.";
  } finally {
    loading.value = null;
  }
}

async function onBina(kod: string) {
  if (!kod) return;
  setResult(null);
  error.value = null;
  const ad = binalar.value.find((x) => x.value === kod)?.label ?? kod;
  sel.value = { ...sel.value, bina: { kod, ad }, daire: undefined };

  loading.value = "Daireler yükleniyor...";
  try {
    const dr = await fetchOptions("daireler", { kod });
    daireler.value = dr;
  } catch {
    error.value = "Daireler alınamadı.";
  } finally {
    loading.value = null;
  }
}

function setResult(val: InfraResult | null) {
  result.value = val;
}

async function onDaire(kod: string) {
  if (!kod) return;
  error.value = null;
  const ad = daireler.value.find((x) => x.value === kod)?.label ?? kod;
  sel.value = { ...sel.value, daire: { kod, ad } };

  if (!sel.value.ilce?.kod) {
    error.value = "İlçe bilgisi eksik.";
    return;
  }

  loading.value = "Altyapı sonucu sorgulanıyor...";
  try {
    const r = await fetchDaireSorgu(kod, sel.value.ilce.kod);
    setResult(r);

    // Save to sessionStorage (daha güvenli - cookie yerine)
    const rec = recommendPackage(r, props.packages);
    if (import.meta.client) {
      sessionStorage.setItem('bn_infra', JSON.stringify({
        full_address: fullAddress.value,
        result: { bbk: r.bbk, max_mbps: r.max_mbps, tech: r.tech },
        recommended_package_id: rec.wifi.id
      }));
    }
  } catch {
    error.value = "Sonuç alınamadı. Lütfen tekrar deneyin.";
  } finally {
    loading.value = null;
  }
}
</script>
