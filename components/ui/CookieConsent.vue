<template>
  <div
    v-if="visible"
    class="fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300"
    :class="isExiting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'"
  >
    <div class="max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-orange-100 dark:border-slate-700 p-4 md:p-5">
      <div class="flex flex-col md:flex-row items-start md:items-center gap-4">
        <!-- Icon -->
        <div class="hidden md:flex w-12 h-12 rounded-xl bg-orange-100 dark:bg-slate-800 items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-2xl text-primary">cookie</span>
        </div>

        <!-- Text -->
        <div class="flex-1">
          <p class="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span class="font-bold text-slate-900 dark:text-white">Çerez Politikası & KVKK Aydınlatma:</span>
            Web sitemizi kullanmaya devam ederek çerez politikamızı ve kişisel verilerinizin işlenmesine ilişkin bilgilendirmeleri kabul etmiş olursunuz.
            <NuxtLink
              to="/yasal/gizlilik-politikasi"
              class="text-primary hover:underline font-medium"
            >
              Gizlilik Politikamızı
            </NuxtLink>
            inceleyebilirsiniz.
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex items-center gap-2 w-full md:w-auto">
          <button
            @click="handleReject"
            class="flex-1 md:flex-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Reddet
          </button>
          <button
            @click="handleAccept"
            class="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:scale-105"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const COOKIE_CONSENT_KEY = "bn_cookie_consent";

const visible = ref(false);
const isExiting = ref(false);

onMounted(() => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) {
    // Delay showing for better UX
    setTimeout(() => {
      visible.value = true;
    }, 1000);
  }
});

const handleAccept = () => {
  isExiting.value = true;
  setTimeout(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    visible.value = false;
  }, 300);
};

const handleReject = () => {
  isExiting.value = true;
  setTimeout(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    visible.value = false;
  }, 300);
};
</script>
