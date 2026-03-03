<template>
  <div class="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
    <div>
      <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white">Bize Ulaşın</h1>
      <p class="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
        Sorularınız mı var? Ekibimiz size yardımcı olmaktan mutluluk duyar.
      </p>

      <div class="mt-10 space-y-6">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-primary text-2xl">location_on</span>
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white text-lg">Merkez Ofis</div>
            <div class="text-slate-600 dark:text-slate-400 mt-1">
              BinbirNet İnternet Bilişim<br />
              Saray Mah. Kıbrıs Cd. No: 9/17, 33640<br />
              Anamur – Mersin
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-blue-600 dark:text-blue-400 text-2xl">call</span>
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white text-lg">Müşteri Hattı</div>
            <div class="text-slate-600 dark:text-slate-400 mt-1 flex flex-col gap-1">
              <a href="tel:05321561001" class="hover:text-primary transition-colors">0532 156 1001</a>
              <a href="tel:08006060217" class="hover:text-primary transition-colors">0800 606 02 17</a>
              <a href="tel:08508408371" class="hover:text-primary transition-colors">0850 840 83 71</a>
              <a href="tel:03248148833" class="hover:text-primary transition-colors">0324 814 88 33</a>
            </div>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-green-600 dark:text-green-400 text-2xl">mail</span>
          </div>
          <div>
            <div class="font-bold text-slate-900 dark:text-white text-lg">E-posta</div>
            <div class="text-slate-600 dark:text-slate-400 mt-1 flex flex-col">
              <a href="mailto:internet@binbirnet.com.tr" class="hover:text-primary transition-colors">internet@binbirnet.com.tr</a>
              <span class="text-sm mt-1">KEP: binbirnet@hs01.kep.tr</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-200 dark:border-slate-700">
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white">İletişim Formu</h2>
      <ContactForm />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "İletişim",
  description: "BinbirNet iletişim bilgileri. Adres, telefon, e-posta ve 7/24 destek hattı. Bize ulaşın, sorularınızı yanıtlayalım.",
});
</script>
