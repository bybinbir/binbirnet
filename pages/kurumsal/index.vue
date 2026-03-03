<template>
  <div class="bg-slate-50 dark:bg-slate-950 min-h-screen py-10">
    <div class="max-w-4xl mx-auto px-4">

      <!-- HERO -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-orange-600 text-white mb-6 shadow-xl shadow-primary/30">
          <span class="material-symbols-outlined text-5xl">apartment</span>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Hakkımızda
        </h1>
        <p class="text-xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Hızlı, güvenilir ve sınırsız internet bağlantısıyla kesintisiz bir online deneyim.
        </p>
      </div>

      <!-- MAIN CONTENT -->
      <div class="grid gap-12">

        <!-- Section 1: Introduction -->
        <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col md:flex-row gap-8 items-center">
          <div class="flex-1 space-y-4">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-3xl">rocket_launch</span>
              Öncü İnternet Hizmetleri
            </h2>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Binbirnet, kurumsal ve bireysel kullanıcılar için yüksek kalitede internet hizmetleri sunan öncü bir şirkettir. Müşterilerimize hızlı, güvenilir ve sınırsız internet bağlantısıyla kesintisiz bir online deneyim sağlıyoruz.
            </p>
          </div>
        </div>

        <!-- Section 2: Features Grid -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Feature 1 -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-2xl">speed</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Yüksek Hız & Air Fiber</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Web sitemizi ziyaret ettiğinizde, kapsamlı hizmet yelpazemizle tanışacaksınız. Sınırsız ve kotasız internet paketlerimiz, yüksek hızlı veri aktarımı ve sürekli bağlantı imkanı sunar. Air Fiber teknolojisiyle güçlendirilmiş altyapımız, en son teknolojiye dayanarak hızlı ve güvenilir bir internet deneyimi sunmanın yanı sıra altyapı gerektirmeyen çözümlerimizle de öne çıkar.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors group">
            <div class="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-2xl">support_agent</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">Müşteri Memnuniyeti</h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Müşteri memnuniyeti, işimizin temel taşlarından biridir. Müşteri odaklı yaklaşımımızla, ihtiyaçlarınızı anlamak ve size en uygun çözümleri sunmak için uzman müşteri hizmetleri ekibimiz her zaman yanınızdadır. Teknik destek ekibimiz ise herhangi bir sorun yaşamanız durumunda hızlı ve etkin çözümler sunarak sizi destekler.
            </p>
          </div>
        </div>

        <!-- Section 3: Coverage & Vision -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <!-- Decorative background circle -->
          <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

          <div class="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            <div class="flex-1 space-y-6">
              <h3 class="text-2xl md:text-3xl font-bold leading-tight">
                Geniş Kapsama Alanı ve<br />Özelleştirilmiş Çözümler
              </h3>
              <p class="text-slate-300 leading-relaxed text-lg">
                Binbirnet olarak, hizmet verdiğimiz bölgelerde geniş bir kapsama alanına sahibiz. Hizmetlerimizi ihtiyaçlarınıza göre özelleştirerek farklı bölgelerdeki müşterilerimize en uygun çözümleri sunmayı hedefliyoruz.
              </p>
              <p class="text-slate-300 leading-relaxed text-lg">
                Müşteri referanslarımız, işimizi ne kadar ciddiyetle ve profesyonellikle yaptığımızı yansıtmaktadır.
              </p>
            </div>
            <div class="shrink-0 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 text-center max-w-xs">
              <span class="material-symbols-outlined text-5xl text-primary mb-4">public</span>
              <p class="font-semibold">Binbirnet'in güvenilir, profesyonel ve yüksek performanslı internet hizmetlerinden faydalanmak için hemen bize katılın!</p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-4">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Sorunsuz bir internet deneyimi için</h3>
          <div class="flex justify-center gap-4 flex-wrap">
            <NuxtLink
              to="/paketler"
              class="inline-flex items-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
            >
              Paketleri İncele
              <span class="material-symbols-outlined">arrow_forward</span>
            </NuxtLink>
            <NuxtLink
              to="/iletisim"
              class="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold py-4 px-8 rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Bize Ulaşın
            </NuxtLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Kurumsal | BinbirNet",
  description: "BinbirNet kurumsal vizyonu, misyonu ve hizmet anlayışı.",
});
</script>
