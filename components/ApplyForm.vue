<template>
  <div v-if="ok" class="mt-6 rounded-2xl border border-green-200 dark:border-green-800 p-6 bg-green-50 dark:bg-green-900/20">
    <div class="text-xl font-extrabold text-green-700 dark:text-green-400">Başvurunuz alındı ✅</div>
    <div class="text-slate-600 dark:text-slate-300 mt-2">
      Ekibimiz en kısa sürede sizinle iletişime geçecek.
    </div>
    <div class="mt-4 flex gap-3 flex-wrap">
      <NuxtLink class="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors" to="/paketler">
        Paketleri İncele
      </NuxtLink>
      <NuxtLink class="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-colors" to="/kampanyalar">
        Kampanyaları Gör
      </NuxtLink>
    </div>
  </div>

  <form v-else @submit.prevent="onSubmit" class="mt-6 space-y-4">
    <!-- honeypot -->
    <input
      class="hidden"
      tabindex="-1"
      autocomplete="off"
      v-model="hp"
      aria-hidden="true"
    />

    <div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 space-y-4">
      <div class="text-lg font-extrabold text-slate-900 dark:text-white">Bilgileriniz</div>

      <label class="block">
        <span class="sr-only">Ad Soyad</span>
        <input
          class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400"
          placeholder="Ad Soyad"
          v-model="adsoyad"
          required
          aria-required="true"
        />
      </label>

      <label class="block">
        <span class="sr-only">Telefon</span>
        <input
          type="tel"
          class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400"
          placeholder="Telefon"
          v-model="telefon"
          required
          aria-required="true"
        />
      </label>

      <label class="block">
        <span class="sr-only">E-posta</span>
        <input
          type="email"
          class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400"
          placeholder="E-posta (opsiyonel)"
          v-model="email"
        />
      </label>

      <div>
        <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Seçilen Paket</label>
        <select
          class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 mt-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          v-model="pkg"
        >
          <option value="" disabled class="text-slate-400">Paket seçin…</option>
          <option v-for="p in props.packages" :key="p.id" :value="p.id" class="text-slate-900 dark:text-white bg-white dark:bg-slate-900">
            {{ p.name }} • {{ p.downMbps }}/{{ p.upMbps }} Mbps • {{ p.priceTry }}₺/ay
            {{ p.badge ? " • POPÜLER" : "" }}
          </option>
        </select>

        <div v-if="pkgObj" class="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Seçim: <b class="text-slate-900 dark:text-white">{{ pkgObj.name }}</b> — {{ pkgObj.downMbps }}/{{ pkgObj.upMbps }} Mbps —{" "}
          <b class="text-slate-900 dark:text-white">{{ pkgObj.priceTry }}₺/ay</b>
        </div>
      </div>

      <label class="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
        <input
          type="checkbox"
          v-model="kvkk"
          class="mt-1"
        />
        <span>
          KVKK metnini okudum ve onaylıyorum.
          <NuxtLink class="underline font-semibold text-primary hover:text-primary/80" to="/yasal/kvkk" target="_blank" rel="noreferrer">
            KVKK
          </NuxtLink>
        </span>
      </label>

      <div v-if="err" class="text-sm text-red-600 dark:text-red-400" role="alert" aria-live="polite">{{ err }}</div>

      <button
        :disabled="loading"
        class="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-extrabold transition-colors disabled:opacity-50"
      >
        {{ loading ? "Gönderiliyor…" : "Başvuruyu Gönder" }}
      </button>
    </div>
    <NuxtTurnstile v-model="token" class="mt-2" />
  </form>
</template>

<script setup lang="ts">
import type { Package } from '~/types';

const props = defineProps<{
  initialPkgId: string | null;
  packages: Package[];
}>();

// sessionStorage'dan infra bilgisi al
const infra = ref<{ full_address?: string; result?: { bbk?: string; max_mbps?: number; tech?: string } } | null>(null);
onMounted(() => {
  const stored = sessionStorage.getItem('bn_infra');
  if (stored) {
    try { infra.value = JSON.parse(stored); } catch {}
  }
});

const token = ref('');
const adsoyad = ref("");
const telefon = ref("");
const email = ref("");
const pkg = ref(props.initialPkgId || "");
const kvkk = ref(false);
const hp = ref("");
const loading = ref(false);
const err = ref<string | null>(null);
const ok = ref(false);

const pkgObj = computed(() => props.packages.find(p => p.id === pkg.value));

async function onSubmit() {
  err.value = null;

  if (!kvkk.value) {
    err.value = "KVKK onayi gerekli.";
    return;
  }
  if (!adsoyad.value.trim()) {
    err.value = "Ad Soyad gerekli.";
    return;
  }
  if (!telefon.value.trim()) {
    err.value = "Telefon gerekli.";
    return;
  }
  if (!pkg.value) {
    err.value = "Lutfen paket secin.";
    return;
  }

  loading.value = true;
  try {
    const payload: Record<string, unknown> = {
      adsoyad: adsoyad.value,
      telefon: telefon.value,
      email: email.value,
      paket: pkg.value,
      infra: infra.value,
      kvkk: kvkk.value,
      hp: hp.value,
      token: token.value,
    };

    const res = await $fetch<{ success?: boolean, error?: string }>(`/api/apply`, {
      method: "POST",
      body: payload
    });

    if (res.error) {
      err.value = `Gonderilemedi: ${res.error}`;
    } else {
      ok.value = true;
    }
  } catch {
    err.value = "Gonderilemedi. Lutfen tekrar deneyin.";
  } finally {
    loading.value = false;
  }
}
</script>

