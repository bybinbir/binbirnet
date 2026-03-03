<template>
  <div v-if="ok" class="mt-6 rounded-2xl border border-green-200 dark:border-green-800 p-6 bg-green-50 dark:bg-green-900/20">
    <div class="text-xl font-extrabold text-green-700 dark:text-green-400">Mesajınız alındı ✅</div>
    <div class="text-slate-600 dark:text-slate-300 mt-2">En kısa sürede size dönüş yapacağız.</div>
  </div>

  <form v-else @submit.prevent="onSubmit" class="mt-6 space-y-4">
    <input class="hidden" tabindex="-1" autocomplete="off" v-model="hp" />

    <div class="rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-800 space-y-4">
      <label class="block">
        <span class="sr-only">Ad Soyad</span>
        <input class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="Ad Soyad" v-model="adsoyad" required aria-required="true" />
      </label>
      <label class="block">
        <span class="sr-only">Telefon</span>
        <input type="tel" class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="Telefon" v-model="telefon" required aria-required="true" />
      </label>
      <label class="block">
        <span class="sr-only">E-posta</span>
        <input type="email" class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="E-posta (opsiyonel)" v-model="email" />
      </label>
      <label class="block">
        <span class="sr-only">Konu</span>
        <input class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="Konu" v-model="konu" required aria-required="true" />
      </label>
      <label class="block">
        <span class="sr-only">Mesajınız</span>
        <textarea class="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 min-h-[120px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400" placeholder="Mesajınız" v-model="mesaj" required aria-required="true" />
      </label>

      <div v-if="err" class="text-sm text-red-600 dark:text-red-400" role="alert" aria-live="polite">{{ err }}</div>

      <button :disabled="loading" class="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-extrabold transition-colors">
        {{ loading ? "Gönderiliyor…" : "Mesajı Gönder" }}
      </button>
    </div>
    <p class="text-xs text-slate-400 dark:text-slate-500 text-center mt-4">
      Bu site reCAPTCHA ile korunmaktadır ve Google
      <a href="https://policies.google.com/privacy" class="underline hover:text-slate-600 dark:hover:text-slate-300">Gizlilik Politikası</a> ile
      <a href="https://policies.google.com/terms" class="underline hover:text-slate-600 dark:hover:text-slate-300">Hizmet Şartları</a> geçerlidir.
    </p>
  </form>
</template>

<script setup lang="ts">
import { useReCaptcha } from 'vue-recaptcha-v3';

const config = useRuntimeConfig();
const siteKey = config.public.RECAPTCHA_SITE_KEY as string | undefined;

const recaptchaInstance = useReCaptcha();
const executeRecaptcha = recaptchaInstance?.executeRecaptcha;
const recaptchaLoaded = recaptchaInstance?.recaptchaLoaded;

const adsoyad = ref("");
const telefon = ref("");
const email = ref("");
const konu = ref("");
const mesaj = ref("");
const hp = ref("");

const loading = ref(false);
const err = ref<string | null>(null);
const ok = ref(false);

async function onSubmit() {
  err.value = null;

  if (siteKey) {
    // Check if loaded (handling simplified type check)
    if (!recaptchaLoaded || !unref(recaptchaLoaded)) {
      err.value = "ReCAPTCHA yuklenemedi, lutfen sayfayi yenileyin.";
      return;
    }
  }

  if (!adsoyad.value.trim()) { err.value = "Ad Soyad gerekli."; return; }
  if (!telefon.value.trim()) { err.value = "Telefon gerekli."; return; }
  if (!konu.value.trim()) { err.value = "Konu gerekli."; return; }
  if (!mesaj.value.trim()) { err.value = "Mesaj gerekli."; return; }

  loading.value = true;
  try {
    const payload: Record<string, unknown> = {
      adsoyad: adsoyad.value,
      telefon: telefon.value,
      email: email.value,
      konu: konu.value,
      mesaj: mesaj.value,
      hp: hp.value
    };

    if (siteKey) {
      if (!executeRecaptcha) {
        throw new Error("ReCAPTCHA baslatilamadi.");
      }
      const token = await executeRecaptcha("contact_submit");
      payload.token = token;
    }

    const res = await $fetch<{ success?: boolean, error?: string }>(`${config.public.API_BASE}contact.php`, {
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

